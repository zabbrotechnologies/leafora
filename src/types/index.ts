export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'What We Offer' | 'Staples' | 'Vegetables' | 'Fruits' | 'Purees & Grated' | 'Chef Mixes' | string;
  badge: string;
  image: string;
  floatingAsset?: string;
  heroColor: string;
  tagline: string;
  description: string;
  harvestWindow: string;
  freezeTemp: string;
  freezeMethod: string;
  shelfLife: string;
  packSizes: string[];
  nutritionalHighlights: {
    label: string;
    value: string;
  }[];
  culinaryPairings: string[];
  sweetnessOrBrix?: string;
  organicCert?: boolean;
}

export interface TransformationStage {
  id: string;
  label: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  temperature: string;
  duration: string;
  stateBadge: string;
  cellularState: string;
  vitalMetric: string;
  vitalValue: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  specDetails: {
    label: string;
    value: string;
  }[];
  image: string;
  coldStat: string;
}

export interface KitchenSegment {
  id: string;
  name: string;
  role: string;
  headline: string;
  description: string;
  chefQuote: string;
  chefAuthor: string;
  chefTitle: string;
  heroImage: string;
  keyBenefits: string[];
  recommendedPacks: string;
  prepTimeSaved: string;
}

export interface B2BSolution {
  title: string;
  code: string;
  description: string;
  specs: string[];
  iconName: string;
}

export interface SampleRequestData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: string;
  products: string[];
  expectedVolume: string;
  address: string;
  notes?: string;
}
