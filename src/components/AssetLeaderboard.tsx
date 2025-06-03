import React from 'react';
import { AssetType } from '../types';
import { Medal, TrendingUp } from 'lucide-react';

interface AssetLeaderboardProps {
  assets: AssetType[];
}

const AssetLeaderboard: React.FC<AssetLeaderboardProps> = ({ assets }) => {
  // Sort assets by 24h price change percentage
  const topPerformers = [...assets]
    .sort((a, b) => b.priceChangePct24h - a.priceChangePct24h)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {assets.length === 0 ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-slate-700 h-14 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {topPerformers.map((asset, index) => (
              <div
                key={asset.id}
                className={`relative flex items-center gap-3 p-3 border ${
                  index === 0
                    ? 'border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-slate-800/50 rounded-lg'
                    : 'border-slate-700 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors'
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 bg-yellow-500 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                    <Medal className="h-3.5 w-3.5" />
                  </div>
                )}
                
                <img
                  src={asset.imageUrl}
                  alt={asset.name}
                  className="w-8 h-8 rounded-full object-contain bg-slate-800 p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/32?text=' + asset.symbol.charAt(0);
                  }}
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-white">{asset.name}</h5>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-sm font-bold">+{asset.priceChangePct24h.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-400">{asset.symbol} • {asset.category}</p>
                    <p className="text-xs text-slate-300">${asset.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">
              View All Assets
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetLeaderboard;