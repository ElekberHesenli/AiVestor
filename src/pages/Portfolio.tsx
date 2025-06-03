import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, History } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { userProfile, recommendations } = useAppContext();

  const portfolioStats = {
    totalValue: 12543.89,
    totalReturn: 1234.56,
    returnPercentage: 10.92,
    assets: [
      { name: 'Bitcoin', allocation: 35, value: 4390.36, return: 15.2 },
      { name: 'Ethereum', allocation: 25, value: 3135.97, return: 8.7 },
      { name: 'Apple', allocation: 20, value: 2508.78, return: -2.3 },
      { name: 'Gold', allocation: 20, value: 2508.78, return: 4.5 },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-teal-500/20 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="text-slate-400">Total Value</h3>
          </div>
          <p className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-slate-400">Total Return</h3>
          </div>
          <p className="text-2xl font-bold text-green-400">+${portfolioStats.totalReturn.toLocaleString()}</p>
          <p className="text-sm text-green-400">+{portfolioStats.returnPercentage}%</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <PieChart className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-slate-400">Asset Distribution</h3>
          </div>
          <p className="text-2xl font-bold text-white">{portfolioStats.assets.length}</p>
          <p className="text-sm text-slate-400">Active Assets</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <History className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-slate-400">Last Transaction</h3>
          </div>
          <p className="text-lg font-medium text-white">Buy BTC</p>
          <p className="text-sm text-slate-400">2 hours ago</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Portfolio Assets</h2>
          <div className="space-y-4">
            {portfolioStats.assets.map((asset, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-white">{asset.name}</h3>
                    <span className="text-sm text-slate-400">{asset.allocation}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {asset.return >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      asset.return >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {asset.return >= 0 ? '+' : ''}{asset.return}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-white">
                    ${asset.value.toLocaleString()}
                  </p>
                  <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                    View Details
                  </button>
                </div>
                <div className="mt-2 bg-slate-600 rounded-full h-1.5">
                  <div
                    className="bg-teal-400 h-1.5 rounded-full"
                    style={{ width: `${asset.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Buy', asset: 'Bitcoin', amount: 0.05, value: 2500, time: '2h ago' },
              { action: 'Sell', asset: 'Ethereum', amount: 1.2, value: 3000, time: '1d ago' },
              { action: 'Buy', asset: 'Apple', amount: 10, value: 1750, time: '3d ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.action === 'Buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {activity.action === 'Buy' ? (
                      <TrendingUp className={`h-4 w-4 ${
                        activity.action === 'Buy' ? 'text-green-400' : 'text-red-400'
                      }`} />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{activity.action} {activity.asset}</p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${activity.value.toLocaleString()}</p>
                  <p className="text-sm text-slate-400">{activity.amount} units</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Investment Opportunities</h2>
          <div className="space-y-4">
            {recommendations.slice(0, 3).map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-600 p-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/40?text=' + asset.symbol;
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-white">{asset.name}</h3>
                    <p className="text-sm text-slate-400">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">+{asset.projectedReturn}%</p>
                  <p className="text-sm text-slate-400">{asset.projectedReturnDays} days</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-center text-teal-400 hover:text-teal-300 transition-colors">
              View All Opportunities
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;