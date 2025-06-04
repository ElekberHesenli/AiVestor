import { AssetType, Category, MarketTrend, RiskLevel } from '../types';

// Mock data for assets
const mockAssets: AssetType[] = [
  {
    id: 'btc-001',
    name: 'Bitcoin',
    symbol: 'BTC',
    category: 'Crypto',
    currentPrice: 51423.75,
    priceChange24h: -2035.45,
    priceChangePct24h: -3.8,
    trend: 'Falling',
    weeklyChange: -1205.89,
    weeklyChangePct: -2.3,
    socialSignal: 65, // 65% of users are investing in this
    newsSentiment: 0.3, // Slightly positive news sentiment
    riskLevel: 'High',
    projectedReturn: 8.5, // Projected 8.5% return
    projectedReturnDays: 14, // Over 14 days
    imageUrl: 'src/assets/img/bitcoin-btc-logo.png',
  },
  {
    id: 'eth-001',
    name: 'Ethereum',
    symbol: 'ETH',
    category: 'Crypto',
    currentPrice: 2765.34,
    priceChange24h: 165.45,
    priceChangePct24h: 6.3,
    trend: 'Rising',
    weeklyChange: 305.12,
    weeklyChangePct: 12.4,
    socialSignal: 42,
    newsSentiment: 0.8, // Very positive news sentiment
    riskLevel: 'High',
    projectedReturn: 15.2,
    projectedReturnDays: 14,
    imageUrl: 'src/assets/img/ethereum-eth-logo.png',
  },
  {
    id: 'aapl-001',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    category: 'Stocks',
    currentPrice: 175.89,
    priceChange24h: 2.54,
    priceChangePct24h: 1.45,
    trend: 'Rising',
    weeklyChange: 7.35,
    weeklyChangePct: 4.25,
    socialSignal: 58,
    newsSentiment: 0.5,
    riskLevel: 'Medium',
    projectedReturn: 5.8,
    projectedReturnDays: 30,
    imageUrl: 'src/assets/img/apple.png',
  },
  {
    id: 'msft-001',
    name: 'Microsoft',
    symbol: 'MSFT',
    category: 'Stocks',
    currentPrice: 338.42,
    priceChange24h: -1.23,
    priceChangePct24h: -0.36,
    trend: 'Stable',
    weeklyChange: 10.25,
    weeklyChangePct: 3.12,
    socialSignal: 45,
    newsSentiment: 0.6,
    riskLevel: 'Medium',
    projectedReturn: 6.5,
    projectedReturnDays: 30,
    imageUrl: 'src/assets/img/microsoft.png',
  },
  {
    id: 'spy-001',
    name: 'SPDR S&P 500 ETF',
    symbol: 'SPY',
    category: 'ETFs',
    currentPrice: 425.75,
    priceChange24h: 1.25,
    priceChangePct24h: 0.29,
    trend: 'Stable',
    weeklyChange: 4.25,
    weeklyChangePct: 1.01,
    socialSignal: 38,
    newsSentiment: 0.2,
    riskLevel: 'Low',
    projectedReturn: 3.2,
    projectedReturnDays: 60,
    imageUrl: 'src/assets/img/Spy.png',
  },
  {
    id: 'gold-001',
    name: 'Gold',
    symbol: 'XAU',
    category: 'Gold',
    currentPrice: 1932.45,
    priceChange24h: 23.54,
    priceChangePct24h: 1.23,
    trend: 'Rising',
    weeklyChange: 45.23,
    weeklyChangePct: 2.39,
    socialSignal: 32,
    newsSentiment: 0.4,
    riskLevel: 'Low',
    projectedReturn: 2.8,
    projectedReturnDays: 90,
    imageUrl: 'src/assets/img/Gold-4.png',
  },
  {
    id: 'sol-001',
    name: 'Solana',
    symbol: 'SOL',
    category: 'Crypto',
    currentPrice: 98.75,
    priceChange24h: 12.35,
    priceChangePct24h: 14.3,
    trend: 'Rising',
    weeklyChange: 28.45,
    weeklyChangePct: 40.5,
    socialSignal: 72,
    newsSentiment: 0.9,
    riskLevel: 'High',
    projectedReturn: 25.5,
    projectedReturnDays: 14,
    imageUrl: 'src/assets/img/solana-sol-logo.png',
  },
  {
    id: 'bonds-001',
    name: 'US Treasury Bonds',
    symbol: 'USTB',
    category: 'Bonds',
    currentPrice: 100.25,
    priceChange24h: -0.05,
    priceChangePct24h: -0.05,
    trend: 'Stable',
    weeklyChange: 0.15,
    weeklyChangePct: 0.15,
    socialSignal: 15,
    newsSentiment: 0.1,
    riskLevel: 'Low',
    projectedReturn: 1.8,
    projectedReturnDays: 365,
    imageUrl: 'src/assets/img/department.png',
  },
];

// Function to fetch market data with simulated network delay
export const fetchMarketData = async (): Promise<AssetType[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Add some randomness to the data each time it's fetched
  return mockAssets.map(asset => ({
    ...asset,
    currentPrice: asset.currentPrice * (1 + (Math.random() * 0.02 - 0.01)), // +/- 1%
    priceChange24h: asset.priceChange24h * (1 + (Math.random() * 0.1 - 0.05)), // +/- 5%
    priceChangePct24h: asset.priceChangePct24h * (1 + (Math.random() * 0.1 - 0.05)), // +/- 5%
    socialSignal: Math.min(100, Math.max(0, asset.socialSignal + (Math.random() * 10 - 5))), // +/- 5%
    newsSentiment: Math.min(1, Math.max(-1, asset.newsSentiment + (Math.random() * 0.2 - 0.1))), // +/- 0.1
  }));
};

// Function to get trending assets
export const getTrendingAssets = (data: AssetType[], limit: number = 5): AssetType[] => {
  return [...data]
    .sort((a, b) => b.socialSignal - a.socialSignal)
    .slice(0, limit);
};

// Function to get assets by category
export const getAssetsByCategory = (data: AssetType[], category: Category): AssetType[] => {
  return data.filter(asset => asset.category === category);
};

// Function to get assets by risk level
export const getAssetsByRiskLevel = (data: AssetType[], riskLevel: RiskLevel): AssetType[] => {
  return data.filter(asset => asset.riskLevel === riskLevel);
};