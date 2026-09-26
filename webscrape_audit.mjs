import { chromium } from 'playwright';
import fs from 'fs';

async function runWebScrapeAudit() {
  console.log('🔍 Starting Comprehensive Web-Scraping DOM & Animation Audit...\n');
  const browser = await chromium.launch({ headless: true });
  
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const auditReport = {
    timestamp: new Date().toISOString(),
    viewports: {},
    summary: {
      totalSectionsScraped: 0,
      overlapsDetected: [],
      underfitsDetected: [],
      animationStates: [],
    }
  };

  console.log('🌐 Loading http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1600); // Wait for loading screen

  const viewportsToTest = [
    { name: 'Desktop (1440x900)', width: 1440, height: 900 },
    { name: 'Tablet (768x1024)', width: 768, height: 1024 },
    { name: 'Mobile (390x844)', width: 390, height: 844 },
  ];

  for (const vp of viewportsToTest) {
    console.log(`\n================ Testing Viewport: ${vp.name} ================`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(500);

    const vpResults = {
      viewport: vp,
      sections: [],
      horizontalOverflow: false,
      overlaps: [],
      underfitElements: [],
    };

    // 1. Web-scrape Horizontal Overflow Check
    const overflowMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const overflowingElements = [];
      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > windowWidth + 2 && rect.width > 0) {
          overflowingElements.push({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className ? String(el.className).slice(0, 60) : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          });
        }
      });

      return {
        scrollWidth,
        windowWidth,
        hasOverflow: scrollWidth > windowWidth + 2,
        overflowingElements: overflowingElements.slice(0, 5),
      };
    });

    vpResults.horizontalOverflow = overflowMetrics.hasOverflow;
    console.log(`📏 Horizontal Overflow Check: ${overflowMetrics.hasOverflow ? '❌ FAILED' : '✅ CLEAN (0px overflow)'}`);
    if (overflowMetrics.hasOverflow) {
      console.log('   Offending elements:', overflowMetrics.overflowingElements);
    }

    // 2. Web-scrape Section-by-Section Metrics, Alignment, and Underfits
    const sectionsData = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, header, footer'));
      return sections.map((sec, idx) => {
        const rect = sec.getBoundingClientRect();
        const computed = window.getComputedStyle(sec);

        return {
          index: idx,
          tag: sec.tagName.toLowerCase(),
          id: sec.id || `section-${idx}`,
          height: Math.round(rect.height),
          width: Math.round(rect.width),
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
          display: computed.display,
        };
      });
    });

    console.log(`📑 Total Layout Sections Scraped: ${sectionsData.length}`);
    for (const sec of sectionsData) {
      if (sec.height < 50 && sec.tag === 'section') {
        const issue = { viewport: vp.name, section: sec.id, height: sec.height, reason: 'Underfit: height < 50px' };
        vpResults.underfitElements.push(issue);
        auditReport.summary.underfitsDetected.push(issue);
      }
    }
    vpResults.sections = sectionsData;

    // 3. Web-scrape Collision & Overlap Detection between Key Interactive/Text Elements
    const overlapData = await page.evaluate(() => {
      const issues = [];
      const sections = Array.from(document.querySelectorAll('section'));

      sections.forEach((sec) => {
        const secId = sec.id || sec.className.slice(0, 20);
        const elements = Array.from(sec.querySelectorAll('h1, h2, h3, button, [data-cursor-type="product"], .glass-panel'));

        for (let i = 0; i < elements.length; i++) {
          for (let j = i + 1; j < elements.length; j++) {
            const el1 = elements[i];
            const el2 = elements[j];

            if (el1.contains(el2) || el2.contains(el1)) continue;

            const r1 = el1.getBoundingClientRect();
            const r2 = el2.getBoundingClientRect();

            if (r1.width === 0 || r1.height === 0 || r2.width === 0 || r2.height === 0) continue;

            const overlapX = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
            const overlapY = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));

            if (overlapX > 20 && overlapY > 20) {
              const style1 = window.getComputedStyle(el1);
              const style2 = window.getComputedStyle(el2);
              const isDeliberate = (style1.position === 'absolute' || style2.position === 'absolute') &&
                                   (style1.zIndex !== style2.zIndex);

              if (!isDeliberate) {
                issues.push({
                  section: secId,
                  text1: (el1.innerText || '').slice(0, 30),
                  text2: (el2.innerText || '').slice(0, 30),
                  overlapArea: `${Math.round(overlapX)}x${Math.round(overlapY)}px`,
                });
              }
            }
          }
        }
      });
      return issues;
    });

    vpResults.overlaps = overlapData;
    console.log(`💥 Unintended Overlaps Detected: ${overlapData.length}`);
    if (overlapData.length > 0) {
      overlapData.forEach((o) => console.log(`   ⚠️ [OVERLAP] in ${o.section}: "${o.text1}" collides with "${o.text2}" (${o.overlapArea})`));
      auditReport.summary.overlapsDetected.push(...overlapData.map(o => ({ ...o, viewport: vp.name })));
    } else {
      console.log('   ✅ Clean: No collisions or unintentional overlaps found.');
    }

    auditReport.viewports[vp.name] = vpResults;
  }

  // 4. Test Scroll Animations & Transformations along the Page
  console.log('\n🎬 Testing Scroll Animation Fit & Kinetic States...');
  await page.setViewportSize({ width: 1440, height: 900 });
  const scrollPoints = [
    { name: 'Hero Idle State', y: 0 },
    { name: 'Freshness Story Phase 1 (Selected)', y: 800 },
    { name: 'Freshness Story Phase 2 (Prepared)', y: 1400 },
    { name: 'Freshness Story Phase 3 (Frozen)', y: 2000 },
    { name: 'Freshness Story Phase 4 (Preserved)', y: 2600 },
    { name: 'Freezing Moment Cryo Lock', y: 3400 },
    { name: 'Product Transformation Tabs', y: 4600 },
    { name: 'Product Showcase & Grid', y: 6200 },
    { name: 'Process Horizontal Rail', y: 10400 },
    { name: 'Kitchens Segment Switcher', y: 12400 },
  ];

  for (const sp of scrollPoints) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), sp.y);
    await page.waitForTimeout(250);

    const animState = await page.evaluate((pointName) => {
      const activeHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
        .filter((h) => {
          const r = h.getBoundingClientRect();
          return r.top >= 0 && r.bottom <= window.innerHeight;
        })
        .map((h) => ({
          tag: h.tagName,
          text: h.innerText.slice(0, 40).replace(/\n/g, ' '),
          opacity: window.getComputedStyle(h).opacity,
          transform: window.getComputedStyle(h).transform,
        }));

      return {
        point: pointName,
        activeHeadings,
      };
    }, sp.name);

    auditReport.summary.animationStates.push(animState);
    console.log(`   ✨ Scroll @ ${sp.y}px (${sp.name}): ${animState.activeHeadings.length} animated elements visible and active in viewport`);
  }

  await browser.close();

  fs.writeFileSync('webscrape_audit_report.json', JSON.stringify(auditReport, null, 2));

  console.log('\n================ WEBSCRAPE AUDIT FINAL SUMMARY ================');
  console.log(`Total Viewports Tested: ${viewportsToTest.length}`);
  console.log(`Total Horizontal Overflows: ${Object.values(auditReport.viewports).filter(v => v.horizontalOverflow).length}`);
  console.log(`Total Unintended Overlaps: ${auditReport.summary.overlapsDetected.length}`);
  console.log(`Total Underfits: ${auditReport.summary.underfitsDetected.length}`);
  console.log(`Audit report saved to: webscrape_audit_report.json`);
  console.log('===============================================================\n');
}

runWebScrapeAudit().catch((err) => {
  console.error('Webscrape audit failed:', err);
  process.exit(1);
});
