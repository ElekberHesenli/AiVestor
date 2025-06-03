import React from 'react';
import { AssetType } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketTrendsProps {
  assets: AssetType[];
}

const MarketTrends: React.FC<MarketTrendsProps> = ({ assets }) => {
  const formatPercentage = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'Rising' || value > 0) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    } else if (trend === 'Falling' || value < 0) {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    } else {
      return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const getColorClass = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-4">
      {assets.length === 0 ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-slate-700 h-12 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-xs text-slate-400 grid grid-cols-4 gap-2 pb-1 border-b border-slate-700">
            <div>Asset</div>
            <div className="text-right">Price</div>
            <div className="text-right">24h</div>
            <div className="text-right">7d</div>
          </div>
          <div className="space-y-2">
            {assets.slice(0, 6).map(asset => (
              <div key={asset.id} className="grid grid-cols-4 gap-2 items-center py-2 border-b border-slate-700/50 hover:bg-slate-700/30 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-6 h-6 rounded-full object-contain bg-slate-800 p-0.5"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/24?text=' + asset.symbol.charAt(0);
                    }}
                  />
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium text-white truncate">{asset.symbol}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-white">
                  ${asset.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center justify-end gap-1">
                  {getTrendIcon(asset.trend, asset.priceChangePct24h)}
                  <span className={`text-sm ${getColorClass(asset.priceChangePct24h)}`}>
                    {formatPercentage(asset.priceChangePct24h)}
                  </span>
                </div>
                <div className="text-right text-sm font-medium">
                  <span className={getColorClass(asset.weeklyChangePct)}>
                    {formatPercentage(asset.weeklyChangePct)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MarketTrends;