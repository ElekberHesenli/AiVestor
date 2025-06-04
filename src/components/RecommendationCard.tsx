import React from 'react';
import { AssetType } from '../types';
import { TrendingUp, TrendingDown, ArrowRight, Info } from 'lucide-react';

interface RecommendationCardProps {
  asset: AssetType;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ asset }) => {
  const isPositive = asset.priceChangePct24h > 0;
  
  return (
    <div className="bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden hover:border-teal-500/50 transition-all group">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img 
              src={asset.imageUrl} 
              alt={asset.name} 
              className="w-8 h-8 rounded-full object-contain bg-slate-800 p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =  asset.imageUrl
              }}
            />
            <div>
              <h4 className="font-medium text-white">{asset.name}</h4>
              <p className="text-xs text-slate-400">{asset.symbol} • {asset.category}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span className="text-xs font-medium">{isPositive ? '+' : ''}{asset.priceChangePct24h.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-2xl font-bold text-white">${asset.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        
        <div className="bg-slate-800 p-3 rounded-lg mb-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              {asset.newsSentiment > 0.5 
                ? `Strong positive sentiment with ${asset.socialSignal}% of users investing.` 
                : asset.newsSentiment > 0 
                ? `Positive market indicators with moderate social interest.`
                : `Current market conditions suggest potential for recovery.`}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-900/30 to-blue-900/30 border border-teal-800/30 rounded-lg p-3">
          <p className="text-sm text-teal-300 font-medium mb-1">Projected Return</p>
          <div className="flex items-baseline gap-1">
            <p className="text-xl font-bold text-white">+{asset.projectedReturn.toFixed(1)}%</p>
            <p className="text-xs text-slate-400">in {asset.projectedReturnDays} days</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-600 p-3">
        <button className="w-full flex items-center justify-center gap-1 text-sm font-medium text-teal-400 group-hover:text-teal-300 transition-colors">
          <span>Invest Now</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;