export interface PricingPackage {
  name: string;
  keywords: number;
  articles: number;
  backlinks: number;
  duration: number;
  breakdown: Record<string, number>;
  total: number;
}

export function calculatePricing(
  numKeywords: number,
  difficulty: 'low' | 'medium' | 'high'
): Record<string, PricingPackage> {
  
  const prices = {
    keyword: { low: 1000000, medium: 2000000, high: 3500000 },
    content: 1500,
    backlink: { low: 250000, medium: 500000, high: 1000000 },
    monthly: 500000
  };

  const basic: PricingPackage = {
    name: 'BASIC',
    keywords: Math.min(numKeywords, 3),
    articles: 5,
    backlinks: 10,
    duration: 3,
    breakdown: {},
    total: 0
  };

  basic.breakdown = {
    'Keyword Research': basic.keywords * prices.keyword[difficulty],
    'Content (5 Articles)': basic.articles * 1500 * prices.content,
    'Backlinks (10)': basic.backlinks * prices.backlink.low,
    'Monthly Maintenance': basic.duration * prices.monthly
  };
  basic.total = Object.values(basic.breakdown).reduce((a, b) => a + b, 0);

  const professional: PricingPackage = {
    name: 'PROFESSIONAL',
    keywords: Math.min(numKeywords, 5),
    articles: 10,
    backlinks: 25,
    duration: 6,
    breakdown: {},
    total: 0
  };

  professional.breakdown = {
    'Keyword Research': professional.keywords * prices.keyword[difficulty],
    'Content (10 Articles)': professional.articles * 2000 * prices.content,
    'Authority Backlinks': professional.backlinks * prices.backlink.medium,
    'Technical SEO': 2500000,
    'Monthly Maintenance': professional.duration * prices.monthly
  };
  professional.total = Object.values(professional.breakdown).reduce((a, b) => a + b, 0) * 0.9;

  const enterprise: PricingPackage = {
    name: 'ENTERPRISE',
    keywords: numKeywords,
    articles: 24,
    backlinks: 60,
    duration: 12,
    breakdown: {},
    total: 0
  };

  enterprise.breakdown = {
    'Keyword Strategy': enterprise.keywords * prices.keyword[difficulty],
    'Premium Content': enterprise.articles * 2500 * prices.content,
    'High Authority Links': enterprise.backlinks * prices.backlink.high,
    'Advanced Technical': 5000000,
    'Monthly Maintenance': enterprise.duration * prices.monthly
  };
  enterprise.total = Object.values(enterprise.breakdown).reduce((a, b) => a + b, 0) * 0.85;

  return { basic, professional, enterprise };
}
