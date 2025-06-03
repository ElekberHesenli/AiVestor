import React, { useState } from 'react';
import { AppContextProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Markets from './pages/Markets';
import Form from './pages/Form';
import { Command } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'portfolio' | 'markets' | 'form'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'portfolio':
        return <Portfolio />;
      case 'markets':
        return <Markets />;
      case 'form':
        return <Form />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-lg sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Command className="h-8 w-8 text-teal-400" />
              <h1 className="text-2xl font-bold text-white">
                Ai<span className="text-teal-400">Vestor</span>
              </h1>
            </div>
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li
                  className={`font-medium cursor-pointer transition-colors ${
                    currentPage === 'dashboard'
                      ? 'text-teal-400 border-b-2 border-teal-400 pb-1'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  Dashboard
                </li>
                <li
                  className={`font-medium cursor-pointer transition-colors ${
                    currentPage === 'portfolio'
                      ? 'text-teal-400 border-b-2 border-teal-400 pb-1'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage('portfolio')}
                >
                  Portfolio
                </li>
                <li
                  className={`font-medium cursor-pointer transition-colors ${
                    currentPage === 'markets'
                      ? 'text-teal-400 border-b-2 border-teal-400 pb-1'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage('markets')}
                >
                  Markets
                </li>
                <li
                  className={`font-medium cursor-pointer transition-colors ${
                    currentPage === 'form'
                      ? 'text-teal-400 border-b-2 border-teal-400 pb-1'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage('form')}
                >
                  Community
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Get Started
              </button>
              <button className="md:hidden text-slate-300 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">
          {renderPage()}
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 py-6">
          <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
            <p>Disclaimer: AiVestor is for educational and simulation purposes only. Not financial advice.</p>
            <p className="mt-2">© 2025 AiVestor. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppContextProvider>
  );
}

export default App;