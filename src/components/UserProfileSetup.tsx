import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Category, RiskLevel, UserProfile } from '../types';
import { Command, Coins, TrendingUp } from 'lucide-react';

const UserProfileSetup: React.FC = () => {
  const { setUserProfile } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    investmentAmount: 1000,
    riskLevel: 'Medium' as RiskLevel,
    interests: [] as Category[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmountChange = (amount: number) => {
    setFormData({
      ...formData,
      investmentAmount: amount,
    });
  };

  const handleRiskLevelChange = (level: RiskLevel) => {
    setFormData({
      ...formData,
      riskLevel: level,
    });
  };

  const handleInterestToggle = (category: Category) => {
    setFormData(prev => {
      const interests = prev.interests || [];
      if (interests.includes(category)) {
        return {
          ...prev,
          interests: interests.filter(i => i !== category),
        };
      } else {
        return {
          ...prev,
          interests: [...interests, category],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }

    // Validate and create user profile
    if (
      formData.name &&
      formData.investmentAmount &&
      formData.riskLevel &&
      formData.interests &&
      formData.interests.length > 0
    ) {
      setUserProfile({
        id: crypto.randomUUID(),
        name: formData.name,
        investmentAmount: formData.investmentAmount,
        riskLevel: formData.riskLevel,
        interests: formData.interests,
      });
    }
  };

  const categories: Category[] = ['Crypto', 'Stocks', 'ETFs', 'Gold', 'Real Estate', 'Bonds'];

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <Command className="h-10 w-10 text-teal-400" />
          <h1 className="text-3xl font-bold text-white">
            Ai<span className="text-teal-400">Vestor</span>
          </h1>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-white">Setup Your Investment Profile</h2>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === step ? 'bg-teal-400' : i < step ? 'bg-slate-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-slate-300">
          Tell us about your investment preferences to get personalized recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name\" className="block text-sm font-medium text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Investment Amount
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {[1000, 5000, 10000, 25000, 50000].map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountChange(amount)}
                    className={`flex-1 min-w-[100px] py-2 px-3 rounded-lg font-medium transition-colors ${
                      formData.investmentAmount === amount
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <label htmlFor="customAmount" className="block text-sm font-medium text-slate-400 mb-1">
                  Or enter custom amount:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
                  <input
                    type="number"
                    id="customAmount"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter amount"
                    min="100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Risk Tolerance Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['Low', 'Medium', 'High'] as RiskLevel[]).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleRiskLevelChange(level)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                      formData.riskLevel === level
                        ? 'border-teal-500 bg-slate-700/80 ring-2 ring-teal-500'
                        : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
                        level === 'Low'
                          ? 'bg-blue-500/20 text-blue-400'
                          : level === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-white">{level}</span>
                    <span className="text-xs text-slate-400 mt-1">
                      {level === 'Low'
                        ? 'Safe, stable returns'
                        : level === 'Medium'
                        ? 'Balanced approach'
                        : 'Higher volatility'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Investment Interests (Select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleInterestToggle(category)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                      formData.interests?.includes(category)
                        ? 'border-teal-500 bg-slate-700/80'
                        : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700'
                    }`}
                  >
                    <Coins className={`h-5 w-5 ${formData.interests?.includes(category) ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span className="font-medium text-white">{category}</span>
                  </button>
                ))}
              </div>
              {formData.interests && formData.interests.length === 0 && step === 3 && (
                <p className="text-red-400 text-sm mt-2">Please select at least one interest</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className={`px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors ml-auto ${
              step === 3 && (!formData.interests || formData.interests.length === 0)
                ? 'opacity-70 cursor-not-allowed'
                : ''
            }`}
            disabled={step === 3 && (!formData.interests || formData.interests.length === 0)}
          >
            {step < 3 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileSetup;