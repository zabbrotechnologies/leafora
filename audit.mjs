import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runAudit() {
  console.log('🚀 Starting Fast Playwright Automated Audit for GLACIAL Website...');
  const startTime = Date.now();
  const browser = await chromium.launch({ headless: true });
  
  const screenshotsDir = path.resolve('audit_screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  page.setDefaultTimeout(6000);

  const consoleLogs = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
    }
  });

  page.on('requestfailed', (req) => {
    networkErrors.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('dialog', async (dialog) => {
    console.log('⚠️ Handled browser dialog:', dialog.message());
    await dialog.accept();
  });

  console.log('🌐 Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // 1. Wait for loading screen to complete
  console.log('⏳ Waiting for loading screen animation to finish...');
  await page.waitForTimeout(1600);

  // 2. Check for Horizontal Scroll Overflows
  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 2;
  });
  console.log(`📏 Horizontal overflow on initial load: ${hasHorizontalOverflow ? '❌ YES (BUG)' : '✅ NO (Clean)'}`);

  // 3. Capture Desktop Hero Screenshot
  await page.screenshot({ path: path.join(screenshotsDir, '01_hero_desktop.png'), fullPage: false });

  // 4. Scroll through each section and take snapshots
  console.log('📜 Scrolling through key sections and triggering animations...');
  
  const scrollSteps = [
    { name: '02_freshness_story', scrollY: 1200 },
    { name: '03_freezing_moment', scrollY: 2600 },
    { name: '04_product_transformation', scrollY: 4200 },
    { name: '05_product_gallery', scrollY: 6000 },
    { name: '06_why_frozen', scrollY: 8200 },
    { name: '07_process_timeline', scrollY: 10200 },
    { name: '08_kitchens', scrollY: 12200 },
    { name: '09_b2b_wholesale', scrollY: 14000 },
    { name: '10_brand_story', scrollY: 15500 },
    { name: '11_final_cta_footer', scrollY: 17500 },
  ];

  for (const step of scrollSteps) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), step.scrollY);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(screenshotsDir, `${step.name}.png`), fullPage: false });
  }

  // 5. Check All Images on Page after scrolling
  const imageReport = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.map((img) => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
  });

  const brokenImages = imageReport.filter((img) => img.naturalWidth === 0);
  console.log(`🖼️ Total Images: ${imageReport.length}, Broken Images: ${brokenImages.length}`);
  if (brokenImages.length > 0) {
    console.log('❌ Broken Image Details:', brokenImages);
  }

  // 6. Test Interactive Modals
  console.log('🧪 Testing Product Detail Modal...');
  await page.evaluate(() => window.scrollTo({ top: 6000, behavior: 'instant' }));
  await page.waitForTimeout(300);

  const productCard = await page.$('[data-cursor-type="product"]');
  if (productCard) {
    await productCard.click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(screenshotsDir, '12_modal_product_detail.png') });
    const closeBtn = await page.$('button[aria-label="Close dialog"]');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(250);
  }

  console.log('🧪 Testing Sample Request Modal...');
  const sampleBtn = await page.getByRole('button', { name: /Browse Wholesale|Retail Packs|Request Sample Box|Samples/i }).first();
  if (sampleBtn) {
    await sampleBtn.click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(screenshotsDir, '13_modal_sample_request.png') });

    // Fill sample form inside modal
    await page.fill('input[placeholder*="Marcus Vance"]', 'Chef Pierre Dubois');
    await page.fill('input[placeholder*="L’Oasis"]', 'Le Bistro Cryo');
    await page.fill('input[placeholder*="chef@establishment.com"]', 'pierre@lebistrocryo.com');
    await page.fill('input[type="tel"]', '+1 800 555 1234');
    await page.fill('textarea', '123 Gourmet Way, San Francisco, CA');
    
    // Submit form
    await page.click('button:has-text("Dispatch Cold Sample Shipper")');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, '14_modal_sample_confirmation.png') });

    // Close confirmation modal
    const returnBtn = await page.$('button:has-text("Return to Website")');
    if (returnBtn) {
      await returnBtn.click();
    } else {
      const closeBtn = await page.$('button[aria-label="Close dialog"]');
      if (closeBtn) await closeBtn.click();
    }
    await page.waitForTimeout(300);
  }

  console.log('🧪 Testing ROI Calculator Modal...');
  const calcBtn = await page.getByRole('button', { name: /ROI Model|ROI Calculator/i }).first();
  if (calcBtn) {
    await calcBtn.click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(screenshotsDir, '15_modal_roi_calculator.png') });
    const closeBtn = await page.$('button[aria-label="Close dialog"]');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(250);
  }

  // 7. Mobile Viewport Test (390x844 - iPhone)
  console.log('📱 Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.setDefaultTimeout(6000);
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1600);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 2;
  });
  console.log(`📏 Mobile horizontal overflow: ${mobileOverflow ? '❌ YES (BUG)' : '✅ NO (Clean)'}`);

  await mobilePage.screenshot({ path: path.join(screenshotsDir, '16_mobile_hero.png'), fullPage: false });

  // Test mobile menu open
  const menuBtn = await mobilePage.$('button[aria-label="Toggle menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(350);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, '17_mobile_drawer.png') });
  }

  await browser.close();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n================ AUDIT SUMMARY ================');
  console.log(`⏱️ Audit Completed in: ${elapsed} seconds`);
  console.log(`Console Errors: ${consoleLogs.length}`);
  consoleLogs.forEach((l) => console.log(`  [${l.type}] ${l.text}`));
  console.log(`Network Failures: ${networkErrors.length}`);
  networkErrors.forEach((e) => console.log(`  [NET_FAIL] ${e.url} -> ${e.failure}`));
  console.log(`Horizontal Overflows: Desktop: ${hasHorizontalOverflow ? 'FAIL' : 'PASS'}, Mobile: ${mobileOverflow ? 'FAIL' : 'PASS'}`);
  console.log(`Broken Images: ${brokenImages.length}`);
  console.log('Screenshots saved to: ./audit_screenshots/');
  console.log('================================================\n');
}

runAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
