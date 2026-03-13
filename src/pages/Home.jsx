import { useState, useEffect } from 'react';
import SecondaryButton from "../components/buttons/SecondaryButton";
import { PiPaperPlaneTilt, PiRobot } from "react-icons/pi";
import Header from "../components/Header";

// Generate mock tokens with dynamic bonding curve progress
const generateTokens = (count) => {
  const names = ['Zynix', 'Flareon', 'Aurum', 'Nebula', 'Quark', 'Vortex', 'Cryon', 'Solara', 'Lunox', 'Pyrax', 'Velora', 'Xyron', 'Zynther', 'Aetheris', 'Novara', 'Cryzen', 'Luminox', 'Vypera', 'Honk', 'SuiMeme'];
  const images = [
    '/assets/coin-img/coin_img_1.jpeg',
    '/assets/coin-img/coin_img_2.jpeg',
    '/assets/coin-img/coin_img_3.jpeg',
    '/assets/coin-img/coin_img_4.jpeg',
    '/assets/coin-img/coin_img_5.jpeg',
    '/assets/coin-img/coin_img_6.jpeg',
    '/assets/coin-img/coin_img_7.jpg',
    '/assets/coin-img/coin_img_8.jpg',
    '/assets/coin-img/coin_img_9.jpg',
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const progress = Math.random() * 100;
    const isBonded = progress >= 100;
    const mc = (Math.random() * 100).toFixed(2);
    const change = (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 20).toFixed(1) + "%";
    
    return {
      id: Date.now() + i,
      image: images[Math.floor(Math.random() * images.length)],
      name: names[Math.floor(Math.random() * names.length)] + (i + 1),
      ca: "0x" + Math.random().toString(16).slice(2, 42),
      hasStream: Math.random() > 0.7,
      marketCap: mc,
      marketPercent: change,
      buyersPercent: (Math.random() * 10).toFixed(2) + "k",
      progress: progress,
      isBonded,
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
    };
  });
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const allTokens = generateTokens(30);
    setTokens(allTokens);
    
    const interval = setInterval(() => {
      setTokens(generateTokens(30));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredTokens = () => {
    switch (activeTab) {
      case 'new':
        return [...tokens].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'near':
        return tokens.filter(t => t.progress >= 50 && t.progress < 100).sort((a, b) => b.progress - a.progress);
      case 'bonded':
        return tokens.filter(t => t.isBonded);
      default:
        return tokens;
    }
  };

  const filteredTokens = getFilteredTokens();

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 50) return 'from-yellow-400 to-orange-500';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <div className="rounded-lg">
      {/* Hero Section - Redesigned */}
      <div className="relative w-full mb-8 rounded-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12]"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`
        }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 p-6 md:p-12">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-4 shadow-lg shadow-purple-500/30">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-3">
              The Odyssey
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
              AI Agent Launchpad on <span className="text-cyan-400 font-semibold">Sui Blockchain</span>
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex justify-center gap-8 md:gap-16 mb-8 flex-wrap">
            {[
              { label: 'Tokens Created', value: '2,381', color: 'text-purple-400' },
              { label: 'Total Volume', value: '$72.5M', color: 'text-cyan-400' },
              { label: 'Rewards Paid', value: '$7.2M', color: 'text-green-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Launch Options */}
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
            {/* Human Launch */}
            <div className="flex-1 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="text-lg font-bold text-white">For Humans</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Launch your own AI agent token in minutes. No coding required.
              </p>
              <div className="text-2xl font-bold text-purple-400 mb-4">1 SUI</div>
              <SecondaryButton
                name="Launch Token"
                icon={<PiPaperPlaneTilt />}
                href="/create-coin"
                className="w-full justify-center"
              />
            </div>

            {/* AI Agent Launch */}
            <div className="flex-1 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-white">For AI Agents</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Autonomous agents can launch tokens programmatically via API - <span className="text-green-400">FREE</span>
              </p>
              
              {/* API Code */}
              <div className="bg-[#0a0a12] rounded-lg p-3 mb-4 font-mono text-xs overflow-hidden">
                <p className="text-cyan-400 mb-1">POST /api/v1/tokens</p>
                <p className="text-gray-500 truncate">{"{ name, ticker, image, apiKey }"}</p>
              </div>
              
              <a
                href="/docs/ai-agent"
                className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-xl transition-all"
              >
                <PiRobot />
                API Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top Trending Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-orange-500">🔥</span> Trending Tokens
          </h2>
          <span className="text-xs text-gray-500">By 24h Volume</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tokens.slice(0, 5).map((token) => (
            <div
              key={token.id}
              onClick={() => window.location.href = `/coins/${token.ca}`}
              className="group bg-[#12121a] rounded-2xl p-4 border border-[#1f1f2e] hover:border-purple-500/50 hover:bg-[#1a1a24] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <img 
                  src={token.image} 
                  alt={token.name} 
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#1f1f2e] group-hover:ring-purple-500/50 transition-all"
                />
                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                  token.marketPercent.startsWith('+') 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {token.marketPercent}
                </span>
              </div>
              <p className="font-bold text-white truncate mb-1">{token.name}</p>
              <p className="text-xs text-gray-500 mb-3">${token.marketCap}K MC</p>
              
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Curve</span>
                  <span className={token.isBonded ? "text-green-400 font-semibold" : "text-purple-400 font-semibold"}>
                    {token.progress.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-[#1f1f2e] rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(token.progress)} rounded-full`}
                    style={{ width: `${Math.min(100, token.progress)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {[
            { id: 'new', label: '🆕 New', color: 'purple' },
            { id: 'near', label: '🔥 Near Graduation', color: 'yellow' },
            { id: 'bonded', label: '🎯 Graduated', color: 'green' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? `bg-${tab.color}-600 text-white shadow-lg shadow-${tab.color}-500/30` 
                  : 'bg-[#12121a] text-gray-400 hover:text-white border border-[#1f1f2e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredTokens.slice(0, 6).map((token) => (
            <div
              key={token.id}
              onClick={() => window.location.href = `/coins/${token.ca}`}
              className="group bg-[#12121a] rounded-xl p-3 border border-[#1f1f2e] hover:border-purple-500/40 hover:bg-[#1a1a24] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={token.image} 
                  alt={token.name} 
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white truncate">{token.name}</p>
                  <p className="text-xs text-gray-500">${token.marketCap}K</p>
                </div>
              </div>
              <div className="h-1.5 bg-[#1f1f2e] rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressColor(token.progress)} rounded-full`}
                  style={{ width: `${Math.min(100, token.progress)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;