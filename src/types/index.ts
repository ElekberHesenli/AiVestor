export type RiskLevel = 'Low' | 'Medium' | 'High';

export type Category = 'Crypto' | 'Stocks' | 'ETFs' | 'Gold' | 'Real Estate' | 'Bonds';

export type MarketTrend = 'Rising' | 'Falling' | 'Stable';

export interface UserProfile {
  id: string;
  name: string;
  investmentAmount: number;
  riskLevel: RiskLevel;
  interests: Category[];
  previousSelections?: AssetType[];
}

export interface AssetType {
  id: string;
  name: string;
  symbol: string;
  category: Category;
  currentPrice: number;
  priceChange24h: number;
  priceChangePct24h: number;
  trend: MarketTrend;
  weeklyChange: number;
  weeklyChangePct: number;
  socialSignal: number; // Percentage of users investing in this asset
  newsSentiment: number; // -1 to 1 scale
  riskLevel: RiskLevel;
  projectedReturn: number; // Projected percentage return
  projectedReturnDays: number; // Over how many days
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  sentiment: number; // -1 to 1 scale
  relatedAssets: string[]; // Asset IDs
}