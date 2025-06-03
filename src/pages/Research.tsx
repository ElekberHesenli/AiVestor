import React from 'react';
import { motion } from 'framer-motion';
import { Book, Lightbulb, Target, Compass, Brain, Award } from 'lucide-react';

const Research: React.FC = () => {
  const learningPaths = [
    {
      title: 'Investment Fundamentals',
      description: 'Learn the basics of investing, risk management, and portfolio diversification.',
      icon: Book,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      modules: ['Understanding Markets', 'Risk Assessment', 'Asset Classes'],
    },
    {
      title: 'Technical Analysis',
      description: 'Master chart patterns, indicators, and technical trading strategies.',
      icon: Compass,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      modules: ['Chart Patterns', 'Technical Indicators', 'Trading Strategies'],
    },
    {
      title: 'AI in Trading',
      description: 'Explore how artificial intelligence is revolutionizing investment decisions.',
      icon: Brain,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20',
      modules: ['Machine Learning Basics', 'AI Trading Systems', 'Data Analysis'],
    },
  ];

  const articles = [
    {
      title: 'Understanding Market Cycles',
      category: 'Market Analysis',
      readTime: '5 min read',
      difficulty: 'Intermediate',
    },
    {
      title: 'Risk Management Strategies',
      category: 'Investment',
      readTime: '8 min read',
      difficulty: 'Advanced',
    },
    {
      title: 'Getting Started with Technical Analysis',
      category: 'Technical',
      readTime: '6 min read',
      difficulty: 'Beginner',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-teal-500/20 p-2 rounded-lg">
            <Lightbulb className="h-6 w-6 text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Research & Learning Center</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-teal-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${path.bgColor} p-2 rounded-lg`}>
                  <path.icon className={`h-6 w-6 ${path.color}`} />
                </div>
                <h3 className="font-bold text-white">{path.title}</h3>
              </div>
              <p className="text-slate-300 mb-4">{path.description}</p>
              <div className="space-y-2">
                {path.modules.map((module, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-teal-400" />
                    <span className="text-sm text-slate-300">{module}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-slate-600/50 hover:bg-slate-600 rounded-lg text-white transition-colors">
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Latest Research Articles</h2>
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{article.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-600 text-slate-300">
                    {article.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Award className="h-6 w-6 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Certifications</h2>
          </div>
          
          <div className="space-y-4">
            {['Investment Basics', 'Technical Analysis', 'Risk Management'].map((cert, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">{cert} Certificate</h3>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-teal-400 h-2 rounded-full"
                      style={{ width: `${(index + 1) * 25}%` }}
                    />
                  </div>
                  <span className="ml-4 text-sm text-slate-400">{(index + 1) * 25}%</span>
                </div>
              </div>
            ))}
            <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-white transition-colors">
              View All Certifications
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Research;