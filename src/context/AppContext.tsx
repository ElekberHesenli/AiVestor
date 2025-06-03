import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssetType, MarketTrend, RiskLevel, UserProfile } from '../types';
import { fetchMarketData } from '../services/marketService';
import { generateRecommendations } from '../services/recommendationService';

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  marketData: AssetType[];
  recommendations: AssetType[];
  loading: boolean;
  simulateInvestment: (amount: number) => { asset: AssetType; projectedReturn: number }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [marketData, setMarketData] = useState<AssetType[]>([]);
  const [recommendations, setRecommendations] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchMarketData();
        setMarketData(data);
        
        // If we have a user profile, generate recommendations
        if (userProfile) {
          const recs = generateRecommendations(data, userProfile);
          setRecommendations(recs);
        }
      } catch (error) {
        console.error('Error loading market data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userProfile]);

  const simulateInvestment = (amount: number) => {
    if (!recommendations.length) return [];

    return recommendations.map(asset => {
      const projectedReturn = asset.projectedReturn * (amount / 1000);
      return { asset, projectedReturn };
    });
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        marketData,
        recommendations,
        loading,
        simulateInvestment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};