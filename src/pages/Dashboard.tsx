import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import UserProfileSetup from '../components/UserProfileSetup';
import MarketTrends from '../components/MarketTrends';
import RecommendationCard from '../components/RecommendationCard';
import InvestmentSimulator from '../components/InvestmentSimulator';
import AssetLeaderboard from '../components/AssetLeaderboard';
import ChatAssistant from '../components/ChatAssistant';
import { ArrowUpRight, TrendingUp, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile, marketData, recommendations, loading } = useAppContext();
  const [showChat, setShowChat] = useState(false);

  if (!userProfile) {
    return <UserProfileSetup />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Welcome, {userProfile.name}</h2>
            <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-slate-700 text-teal-400">
              <Activity className="h-4 w-4" />
              <span>Risk Level: {userProfile.riskLevel}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm">Investment Amount</p>
              <p className="text-2xl font-bold text-white">${userProfile.investmentAmount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm">Interests</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {userProfile.interests.map(interest => (
                  <span key={interest} className="text-xs px-2 py-1 rounded-full bg-slate-600 text-teal-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-3">
              <TrendingUp className="h-5 w-5 text-teal-400" />
              <span>Today's Smart Picks</span>
            </h3>
            
            {loading ? (
              <div className="animate-pulse grid gap-4 md:grid-cols-2">
                {[1, 2].map(i => (
                  <div key={i} className="bg-slate-700 rounded-lg h-48"></div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.slice(0, 2).map(asset => (
                  <RecommendationCard key={asset.id} asset={asset} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <section className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-white mb-4">Investment Simulator</h3>
          <InvestmentSimulator />
        </section>
      </div>
      
      <div className="space-y-6">
        <section className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
          <h3 className="flex items-center justify-between text-lg font-medium text-white mb-4">
            <span>Market Trends</span>
            <ArrowUpRight className="h-5 w-5 text-teal-400" />
          </h3>
          <MarketTrends assets={marketData} />
        </section>
        
        <section className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-white mb-4">Top Performers</h3>
          <AssetLeaderboard assets={marketData} />
        </section>
      </div>
      
      <button
        onClick={() => setShowChat(prev => !prev)}
        className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      
      {showChat && <ChatAssistant onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Dashboard;