'use client';

import { useState, useEffect } from 'react';

interface Token {
  id: number;
  name: string;
  symbol: string;
  ca: string;
  change: number;
  mc: number;
  vol: number;
  curve: number;
  holders: number;
  pfp: string;
  stream?: string;
  graduated?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://theodyssey-backend1-production.up.railway.app';

export default function Home() {
  const [page, setPage] = useState('home');
  const [wallet, setWallet] = useState('');
  
  const tokens: Token[] = [
    {id:1,name:'SUI AI Agent',symbol:'$SAI',ca:'0x1234...5678',change:12.5,mc:125000,vol:89000,curve:45,holders:234,pfp:'🤖'},
    {id:2,name:'Crypto Wizard',symbol:'$WIZ',ca:'0x2345...6789',change:8.2,mc:234000,vol:156000,curve:78,holders:567,pfp:'🧙',graduated:true},
    {id:3,name:'Nebula AI',symbol:'$NEB',ca:'0x3456...7890',change:-3.2,mc:89000,vol:56000,curve:32,holders:156,pfp:'🌌'},
    {id:4,name:'DeFi Sentinel',symbol:'$SENT',ca:'0x4567...8901',change:15.7,mc:456000,vol:289000,curve:92,holders:1234,pfp:'🛡️',graduated:true},
    {id:5,name:'Meta Hunter',symbol:'$HUNT',ca:'0x5678...9012',change:5.4,mc:67000,vol:34000,curve:28,holders:89,pfp:'🎯'},
    {id:6,name:'Yield Master',symbol:'$YLD',ca:'0x6789...0123',change:-1.8,mc:34000,vol:18000,curve:18,holders:67,pfp:'💎'},
  ];

  const fmt = (n: number) => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `$${Math.round(n/1e3)}K` : `$${n}`;

  // Wallet connection
  useEffect(() => {
    const saved = localStorage.getItem('wallet');
    if (saved) setWallet(saved);
  }, []);

  const connectWallet = async () => {
    // Try Slush Wallet
    if ((window as any).slushWallet) {
      try {
        await (window as any).slushWallet.connect();
        const accounts = await (window as any).slushWallet.getAccounts();
        if (accounts?.length > 0) {
          setWallet(accounts[0]);
          localStorage.setItem('wallet', accounts[0]);
          return;
        }
      } catch(e) { console.log('Slush error:', e); }
    }
    
    // Try Sui Wallet
    if ((window as any).suiWallet) {
      try {
        await (window as any).suiWallet.connect();
        const accounts = await (window as any).suiWallet.getAccounts();
        if (accounts?.length > 0) {
          setWallet(accounts[0]);
          localStorage.setItem('wallet', accounts[0]);
          return;
        }
      } catch(e) { console.log('Sui error:', e); }
    }
    
    alert('No wallet found. Please install Slush Wallet or Sui Wallet.');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">The Odyssey</h1>
              <p className="text-xs text-gray-500">AI Agent Launchpad</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {['home','stats','stake','portfolio'].map(p => (
              <button key={p} onClick={() => setPage(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page === p ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' : 'text-gray-400 hover:text-white'}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>
          
          <button onClick={connectWallet} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-4 py-2 rounded-lg text-sm">
            {wallet ? `${wallet.slice(0,6)}...${wallet.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 pb-20">
        {page === 'home' && (
          <div>
            {/* Hero */}
            <div className="text-center py-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Launch Your</span>
                <br />AI Agent Token
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                The first decentralized platform where AI agents create, trade, and build autonomous capital on Sui.
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-3 rounded-xl">Launch Token</button>
                <button className="border border-gray-700 px-8 py-3 rounded-xl">API Docs</button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Tokens Created', value: '2,381', icon: '🪙' },
                { label: 'Total Volume', value: '$72.5M', icon: '📊' },
                { label: '24h Volume', value: '$46.3M', icon: '📈' },
                { label: 'Rewards Paid', value: '$7.2M', icon: '🎁' },
              ].map((s, i) => (
                <div key={i} className="bg-[#161616] border border-[#27272a] rounded-xl p-5 hover:border-cyan-400/50 transition">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            
            {/* Tokens */}
            <h2 className="text-2xl font-bold mb-6">🔥 Trending Tokens</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokens.map(t => (
                <div key={t.id} className="bg-[#161616] border border-[#27272a] rounded-2xl p-5 hover:border-cyan-400/50 transition cursor-pointer hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl">{t.pfp}</div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-cyan-400 font-mono text-sm">{t.symbol}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div><span className="text-gray-500">MC</span><div className="font-semibold">{fmt(t.mc)}</div></div>
                    <div><span className="text-gray-500">24h</span><div className={`font-semibold ${t.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{t.change >= 0 ? '+' : ''}{t.change}%</div></div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Bonding Curve</span><span>{t.curve}%</span></div>
                    <div className="h-2 bg-[#27272a] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300" style={{width: `${t.curve}%`}} /></div>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium">Buy</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'stats' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">📊 Platform Statistics</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Tokens Created', value: '2,381' },
                { label: 'Total Volume', value: '$72.5M' },
                { label: '24h Volume', value: '$46.3M' },
                { label: 'Rewards Paid', value: '$7.2M' },
              ].map((s, i) => (
                <div key={i} className="bg-[#161616] border border-[#27272a] rounded-xl p-5">
                  <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'stake' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">💰 Stake $AIDA</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Staked', value: '2.4M' },
                { label: 'APY', value: '24.5%' },
                { label: 'Your Share', value: '0.0%' },
                { label: 'Pool Rewards', value: '$45.2K' },
              ].map((s, i) => (
                <div key={i} className="bg-[#161616] border border-[#27272a] rounded-xl p-5">
                  <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#161616] border border-[#27272a] rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">Stake $AIDA</h3>
              <input type="number" placeholder="Amount" className="w-full bg-[#27272a] border border-[#3a3a42] rounded-lg px-4 py-3 mb-4" />
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-3 rounded-lg">Stake</button>
            </div>
          </div>
        )}

        {page === 'portfolio' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">💼 Your Portfolio</h1>
            {wallet ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👛</div>
                <p className="text-gray-400">No tokens found</p>
              </div>
            ) : (
              <div className="text-center py-12 bg-[#161616] border border-[#27272a] rounded-2xl">
                <div className="text-6xl mb-4">🔗</div>
                <p className="text-gray-400 mb-4">Connect your wallet to view portfolio</p>
                <button onClick={connectWallet} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-6 py-3 rounded-lg">Connect Wallet</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 border-t border-[#27272a] px-4 py-3 flex justify-around">
        {['home','stats','stake','portfolio'].map(p => (
          <button key={p} onClick={() => setPage(p)} className={`text-xs ${page === p ? 'text-cyan-400' : 'text-gray-500'}`}>
            {p === 'home' ? '🏠' : p === 'stats' ? '📊' : p === 'stake' ? '💰' : '💼'}
          </button>
        ))}
      </nav>
    </div>
  );
}
