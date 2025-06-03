import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Globe, Activity, Users, Newspaper } from 'lucide-react';

const Markets: React.FC = () => {
  const { marketData } = useAppContext();

  // Mock historical data for chart
  const historicalData = [
    { date: '2024-02-01', btc: 48000, eth: 2200, spy: 420 },
    { date: '2024-02-15', btc: 52000, eth: 2800, spy: 430 },
    { date: '2024-03-01', btc: 49000, eth: 2600, spy: 425 },
    { date: '2024-03-15', btc: 51000, eth: 2900, spy: 428 },
    { date: '2024-04-01', btc: 54000, eth: 3200, spy: 435 },
  ];

  const marketNews = [
    {
      id: 1,
      title: 'Federal Reserve Maintains Interest Rates',
      impact: 'Positive',
      timestamp: '2h ago',
      summary: 'The Federal Reserve announced its decision to maintain current interest rates, citing stable economic conditions.',
    },
    {
      id: 2,
      title: 'Tech Sector Shows Strong Growth',
      impact: 'Positive',
      timestamp: '4h ago',
      summary: 'Major tech companies reported better-than-expected earnings, driving market optimism.',
    },
    {
      id: 3,
      title: 'Global Supply Chain Updates',
      impact: 'Neutral',
      timestamp: '6h ago',
      summary: 'Supply chain disruptions showing signs of improvement as global shipping rates normalize.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-slate-400">Global Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-white">$2.1T</p>
          <p className="text-sm text-green-400">+2.3% (24h)</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-slate-400">Market Volatility</h3>
          </div>
          <p className="text-2xl font-bold text-white">Medium</p>
          <p className="text-sm text-slate-400">Trending Lower</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-slate-400">Active Traders</h3>
          </div>
          <p className="text-2xl font-bold text-white">1.2M</p>
          <p className="text-sm text-green-400">+5.8% (24h)</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Newspaper className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-slate-400">Market Sentiment</h3>
          </div>
          <p className="text-2xl font-bold text-white">Bullish</p>
          <p className="text-sm text-green-400">Strong Buy Signal</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Market Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line type="monotone" dataKey="btc" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="eth" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="spy" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Market News</h2>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div key={news.id} className="border-b border-slate-700 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{news.title}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    news.impact === 'Positive' ? 'bg-green-500/20 text-green-400' :
                    news.impact === 'Negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {news.impact}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{news.summary}</p>
                <p className="text-xs text-slate-500">{news.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Market Movers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400">
                  <th className="pb-4">Asset</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">24h Change</th>
                  <th className="pb-4">7d Change</th>
                  <th className="pb-4">Market Cap</th>
                  <th className="pb-4">Volume (24h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {marketData.slice(0, 5).map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={asset.imageUrl}
                          alt={asset.name}
                          className="w-8 h-8 rounded-full object-cover bg-slate-700"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/32?text=' + asset.symbol.charAt(0);
                          }}
                        />
                        <div>
                          <p className="font-medium text-white">{asset.name}</p>
                          <p className="text-sm text-slate-400">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-medium text-white">
                        ${asset.currentPrice.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        {asset.priceChangePct24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                        <span className={asset.priceChangePct24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {asset.priceChangePct24h >= 0 ? '+' : ''}{asset.priceChangePct24h.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={asset.weeklyChangePct >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {asset.weeklyChangePct >= 0 ? '+' : ''}{asset.weeklyChangePct.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4">
                      <p className="text-white">${(asset.currentPrice * 1000000).toLocaleString()}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-white">${(asset.currentPrice * 100000).toLocaleString()}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Markets;