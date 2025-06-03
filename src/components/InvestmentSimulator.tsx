import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, DollarSign } from 'lucide-react';

const InvestmentSimulator: React.FC = () => {
  const { userProfile, simulateInvestment } = useAppContext();
  const [amount, setAmount] = useState(userProfile?.investmentAmount || 1000);
  const [showResults, setShowResults] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  const handleSimulate = () => {
    setShowResults(true);
  };

  const results = simulateInvestment(amount);

  return (
    <div className="space-y-4">
      <p className="text-slate-300">
        See how different investment amounts could perform based on current projections.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="investmentAmount" className="block text-sm font-medium text-slate-300 mb-1">
            Investment Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="number"
              id="investmentAmount"
              value={amount}
              onChange={handleAmountChange}
              className="block w-full pl-10 pr-12 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter amount"
              min="100"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleSimulate}
            className="w-full md:w-auto px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>Simulate</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {showResults && (
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-medium text-white">Projected Returns</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(({ asset, projectedReturn }) => (
              <div key={asset.id} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-8 h-8 rounded-full object-contain bg-slate-800 p-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/32?text=' + asset.symbol.charAt(0);
                    }}
                  />
                  <div>
                    <h5 className="font-medium text-white">{asset.name}</h5>
                    <p className="text-xs text-slate-400">{asset.symbol}</p>
                  </div>
                </div>
                
                <div className="bg-slate-800/80 p-3 rounded-lg mt-2">
                  <p className="text-sm text-slate-300 mb-1">In {asset.projectedReturnDays} days</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-xl font-bold text-teal-400">
                      ${(amount * asset.projectedReturn / 100).toFixed(2)}
                    </p>
                    <p className="text-xs text-teal-300">
                      (+{asset.projectedReturn}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4 mt-4">
            <p className="text-sm text-slate-300">
              <span className="text-yellow-400">Disclaimer:</span> These projections are based on current trends and historical data. Actual returns may vary. All investments carry risk.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentSimulator;