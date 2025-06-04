import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Users, Star, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Comment {
  id: string;
  userName: string;
  asset: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  comment: string;
  likes: number;
  timestamp: Date;
}

const Form: React.FC = () => {
  const { userProfile } = useAppContext();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userName: 'Sarah K.',
      asset: 'Bitcoin',
      sentiment: 'positive',
      comment: "Bitcoin's recent performance has been impressive. The technical indicators suggest a strong upward trend.",
      likes: 24,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: '2',
      userName: 'Michael R.',
      asset: 'Ethereum',
      sentiment: 'positive',
      comment: "ETH's new updates are game-changing. The reduced gas fees make it much more accessible.",
      likes: 18,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: '3',
      userName: 'Alex T.',
      asset: 'Apple',
      sentiment: 'neutral',
      comment: "AAPL's performance has been steady, but I'm waiting for the next product announcement before making any moves.",
      likes: 12,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    },
  ]);

  const [newComment, setNewComment] = useState({
    asset: '',
    sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.asset || !newComment.comment) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      userName: userProfile?.name || 'Anonymous',
      asset: newComment.asset,
      sentiment: newComment.sentiment,
      comment: newComment.comment,
      likes: 0,
      timestamp: new Date(),
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ asset: '', sentiment: 'neutral', comment: '' });
  };

  const handleLike = (commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-teal-500/20 p-2 rounded-lg">
            <Users className="h-6 w-6 text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Investment Community</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="asset" className="block text-sm font-medium text-slate-300 mb-1">
              Asset
            </label>
            <input
              type="text"
              id="asset"
              value={newComment.asset}
              onChange={(e) => setNewComment(prev => ({ ...prev, asset: e.target.value }))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter asset name (e.g., Bitcoin, ETH, AAPL)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Sentiment
            </label>
            <div className="flex gap-4">
  {['positive', 'neutral', 'negative'].map((sentiment) => {
    const isActive = newComment.sentiment === sentiment;

    const activeClasses = {
      positive: 'bg-[#22C55E33] text-[#4ADE80]',
      neutral: 'bg-slate-700 text-slate-300',
      negative: 'bg-red-500/20 text-red-400',
    };

    return (
      <button
        key={sentiment}
        type="button"
        onClick={() =>
          setNewComment((prev) => ({ ...prev, sentiment: sentiment as any }))
        }
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
          isActive
            ? activeClasses[sentiment as 'positive' | 'neutral' | 'negative']
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </button>
    );
  })}
</div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-1">
              Your Analysis
            </label>
            <textarea
              id="comment"
              value={newComment.comment}
              onChange={(e) => setNewComment(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent h-24"
              placeholder="Share your investment analysis..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            disabled={!newComment.asset || !newComment.comment}
          >
            <Send className="h-4 w-4" />
            <span>Share Analysis</span>
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-600 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {comment.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{comment.userName}</p>
                    <p className="text-sm text-slate-400">
                      {comment.asset} • {new Date(comment.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  comment.sentiment === 'positive'
                    ? 'bg-green-500/20 text-green-400'
                    : comment.sentiment === 'negative'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}
                </span>
              </div>
              
              <p className="text-slate-300 mb-3">{comment.comment}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-teal-400 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-slate-400 hover:text-teal-400 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Form;