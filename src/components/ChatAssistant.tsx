import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Send, Bot } from 'lucide-react';

interface ChatAssistantProps {
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onClose }) => {
  const { userProfile, recommendations } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Generate initial welcome message
  useEffect(() => {
    const initialMessage = {
      id: crypto.randomUUID(),
      sender: 'assistant' as const,
      text: userProfile 
        ? `Hello ${userProfile.name}! How can I help with your investments today? You can ask about your personalized recommendations, market trends, or simulation options.`
        : 'Hello! I can help you make smarter investment decisions. How can I assist you today?',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
  }, [userProfile]);
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    // Process and generate response
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase(), userProfile?.name || 'there');
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 600);
  };
  
  const generateResponse = (query: string, userName: string): string => {
    // Basic pattern matching for common investment questions
    if (query.includes('recommend') || query.includes('suggestion') || query.includes('invest in')) {
      if (recommendations.length > 0) {
        const topRec = recommendations[0];
        return `Based on your profile, I recommend considering ${topRec.name} (${topRec.symbol}). It's showing a ${topRec.trend.toLowerCase()} trend with a projected return of ${topRec.projectedReturn.toFixed(1)}% in ${topRec.projectedReturnDays} days. Would you like more details about this opportunity?`;
      } else {
        return `I'd be happy to recommend investments once you've completed your investment profile. This will help me suggest options that match your risk tolerance and interests.`;
      }
    } else if (query.includes('risk') || query.includes('safe')) {
      return `Different investments carry different risk levels. Cryptocurrencies and individual stocks typically have higher risk but potentially higher returns. ETFs and bonds are generally lower risk with more modest returns. Your current risk profile is set to ${userProfile?.riskLevel || 'not yet defined'}.`;
    } else if (query.includes('market') || query.includes('trend')) {
      return `Current market trends show crypto assets with increased volatility, while traditional stocks remain more stable. For your interests, we're seeing positive sentiment around tech stocks and moderate interest in ETFs. Would you like me to analyze any specific market sector?`;
    } else if (query.includes('return') || query.includes('profit') || query.includes('gain')) {
      return `Based on current projections, your personalized recommendations could yield returns between 3-15% depending on the timeframe and risk level. Remember that all investments carry risk, and projected returns are estimates based on current trends.`;
    } else if (query.includes('hello') || query.includes('hi ')) {
      return `Hello ${userName}! How can I help with your investment decisions today?`;
    } else if (query.includes('thank')) {
      return `You're welcome! I'm here to help you make informed investment decisions. Is there anything else you'd like to know?`;
    } else {
      return `That's an interesting question about ${query.split(' ').slice(0, 3).join(' ')}... I'm still learning about complex financial topics. Would you like me to provide information about current market trends or your personalized investment recommendations instead?`;
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col h-[500px] max-h-[80vh] animate-slideUp">
      <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-teal-500/20 w-8 h-8 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-teal-400" />
          </div>
          <h3 className="font-medium text-white">Investment Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-700 text-white'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-slate-700 bg-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about investments..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg transition-colors"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;