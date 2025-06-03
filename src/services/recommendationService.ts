import { AssetType, RiskLevel, UserProfile } from '../types';

export const generateRecommendations = (
  assets: AssetType[],
  userProfile: UserProfile,
  limit: number = 3
): AssetType[] => {
  if (!assets.length) return [];

  // Filter assets by user interests
  let filteredAssets = assets.filter(asset => 
    userProfile.interests.includes(asset.category)
  );

  // If no assets match interests, use all assets
  if (filteredAssets.length === 0) {
    filteredAssets = assets;
  }

  // Apply risk level filtering
  filteredAssets = filterByRiskLevel(filteredAssets, userProfile.riskLevel);

  // Score the assets based on multiple factors
  const scoredAssets = filteredAssets.map(asset => {
    let score = 0;

    // Market trend score
    if (asset.trend === 'Rising') score += 3;
    else if (asset.trend === 'Stable') score += 1;

    // Price change score (higher change gets more points)
    score += normalizeValue(Math.abs(asset.priceChangePct24h), 0, 20) * 2;

    // Social signal score
    score += normalizeValue(asset.socialSignal, 0, 100) * 3;

    // News sentiment score (convert from -1,1 to 0,1 range)
    score += ((asset.newsSentiment + 1) / 2) * 2;

    // Projected return score
    score += normalizeValue(asset.projectedReturn, 0, 30) * 4;

    // Previous selections bonus
    if (userProfile.previousSelections?.some(prev => prev.id === asset.id)) {
      score += 1; // Small bonus for previously selected assets
    }

    return { asset, score };
  });

  // Sort by score and return top recommendations
  return scoredAssets
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.asset);
};

// Helper to filter assets by risk level
const filterByRiskLevel = (assets: AssetType[], userRiskLevel: RiskLevel): AssetType[] => {
  switch (userRiskLevel) {
    case 'Low':
      // Low risk users only get low risk assets
      return assets.filter(asset => asset.riskLevel === 'Low');
    
    case 'Medium':
      // Medium risk users get low and medium risk assets
      return assets.filter(asset => 
        asset.riskLevel === 'Low' || asset.riskLevel === 'Medium'
      );
    
    case 'High':
      // High risk users get all assets, but we'll prioritize them differently
      return assets;
    
    default:
      return assets;
  }
};

// Helper to normalize values to 0-1 range
const normalizeValue = (value: number, min: number, max: number): number => {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
};

// Function to calculate projected returns based on investment amount
export const calculateProjectedReturn = (
  asset: AssetType,
  investmentAmount: number
): number => {
  return (investmentAmount * asset.projectedReturn) / 100;
};