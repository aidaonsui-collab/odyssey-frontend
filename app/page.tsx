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

  useEffect(() => {
    const saved = localStorage.getItem('wallet');
    if (saved) setWallet(saved);
  }, []);

  const connectWallet = async () => {
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
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1f1f23' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #00d4ff, #0099cc)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
              <svg width={24} height={24} fill="#000" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, background: 'linear-gradient(90deg, #00d4ff, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Odyssey</div>
              <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: 1 }}>AI Agent Launchpad</div>
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'create', label: 'Create' },
              { id: 'stats', label: 'Stats' },
              { id: 'stake', label: 'Stake' },
            ].map(p => (
              <button key={p.id} onClick={() => setPage(p.id)} style={{
                padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                background: page === p.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                color: page === p.id ? '#00d4ff' : '#9ca3af',
                border: page === p.id ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent'
              }}>
                {p.label}
              </button>
            ))}
          </nav>
          
          <button onClick={connectWallet} style={{
            background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 600, padding: '10px 20px', 
            borderRadius: 10, cursor: 'pointer', fontSize: 14
          }}>
            {wallet ? `${wallet.slice(0,6)}...${wallet.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 100px' }}>
        {page === 'home' && (
          <div>
            {/* Hero */}
            <div style={{ padding: '100px 0 60px', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 20, lineHeight: 1.1 }}>
                  <span style={{ background: 'linear-gradient(90deg, #00d4ff, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Launch Your</span>
                  <br />
                  <span style={{ color: 'white' }}>AI Agent Token</span>
                </div>
                <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
                  The first decentralized platform where AI agents create, trade, and build autonomous capital on Sui blockchain.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 48 }}>
                  <button style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 600, padding: '14px 32px', borderRadius: 12, cursor: 'pointer', fontSize: 16 }}>
                    🚀 Launch Token
                  </button>
                  <button style={{ background: 'transparent', color: '#fff', fontWeight: 500, padding: '14px 32px', borderRadius: 12, border: '1px solid #3f3f46', cursor: 'pointer', fontSize: 16 }}>
                    📖 Read Docs
                  </button>
                </div>
                
                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 48, maxWidth: 600, margin: '0 auto' }}>
                  {[
                    { label: 'Tokens Created', value: '2,381' },
                    { label: 'Total Volume', value: '$72.5M' },
                    { label: 'Rewards Paid', value: '$7.2M' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#00d4ff' }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* AI Banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(0,212,255,0.05))', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 20, padding: 32, marginBottom: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#a855f7' }}>🤖 AI Agents Launch Free!</div>
              <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16 }}>Autonomous AI agents can create tokens at no cost using our API. Build your trading capital today!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                {['✓ Free token creation', '✓ Programmatic trading', '✓ Autonomous treasury', '✓ 24/7 trading'].map((f, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#22c55e' }}>{f}</div>
                ))}
              </div>
            </div>
            
            {/* Tokens */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>🔥 Trending Tokens</h2>
              <button style={{ color: '#00d4ff', background: 'none', cursor: 'pointer', fontSize: 14 }}>View All →</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 20 }}>
              {tokens.map(t => (
                <div key={t.id} style={{ background: '#141418', border: '1px solid #1f1f23', borderRadius: 20, padding: 24, transition: 'all 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.08), transparent 70%)', opacity: 0, transition: 'opacity 0.3s' }} className="card-hover" />
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #1f1f23, #27272d)', border: '2px solid #27272d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{t.pfp}</div>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>{t.name}
                          {t.graduated && <span style={{ background: 'linear-gradient(90deg, #00d4ff, #00ffaa)', color: '#000', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>GRADUATED</span>}
                        </div>
                        <div style={{ fontSize: 14, color: '#00d4ff', fontFamily: 'monospace' }}>{t.symbol}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Market Cap</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{fmt(t.mc)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>24h Change</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: t.change >= 0 ? '#22c55e' : '#ef4444' }}>{t.change >= 0 ? '+' : ''}{t.change}%</div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                        <span>Bonding Curve</span>
                        <span>{t.curve}%</span>
                      </div>
                      <div style={{ height: 6, background: '#1f1f23', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${t.curve}%`, background: 'linear-gradient(90deg, #00d4ff, #00ffaa)', borderRadius: 3 }} />
                      </div>
                    </div>
                    
                    <button style={{ width: '100%', background: '#22c55e', color: 'white', fontWeight: 600, padding: '12px', borderRadius: 10, cursor: 'pointer', fontSize: 14 }}>
                      Buy {t.symbol}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'create' && (
          <div style={{ maxWidth: 500, margin: '0 auto', paddingTop: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>🚀 Launch Token</h1>
            <p style={{ color: '#9ca3af', marginBottom: 32, textAlign: 'center' }}>Create your AI agent token in seconds</p>
            
            <div style={{ background: '#141418', border: '1px solid #1f1f23', borderRadius: 20, padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Token Name *</div>
                  <input type="text" placeholder="My AI Agent" style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Ticker *</div>
                  <input type="text" placeholder="$AGENT" style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }} />
                </div>
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Description</div>
                <textarea rows={3} placeholder="Describe your AI agent..." style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15, resize: 'none' }} />
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Image URL</div>
                <input type="url" placeholder="https://..." style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>X (Twitter)</div>
                  <input type="text" placeholder="@username" style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Telegram</div>
                  <input type="text" placeholder="@username" style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }} />
                </div>
              </div>
              
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>DEX</div>
                <select style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15 }}>
                  <option>Cetus</option>
                  <option>Turbos</option>
                </select>
              </div>
              
              <button style={{ width: '100%', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 600, padding: '16px', borderRadius: 12, cursor: 'pointer', fontSize: 16 }}>
                🚀 Launch Token (1 SUI)
              </button>
              <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: '#6b7280' }}>🤖 AI Agents: Free via API</div>
            </div>
          </div>
        )}

        {page === 'stats' && (
          <div style={{ paddingTop: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>📊 Platform Stats</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Tokens Created', value: '2,381', icon: '🪙' },
                { label: 'Total Volume', value: '$72.5M', icon: '📈' },
                { label: '24h Volume', value: '$46.3M', icon: '📊' },
                { label: 'Rewards Paid', value: '$7.2M', icon: '🎁' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#141418', border: '1px solid #1f1f23', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#00d4ff', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'stake' && (
          <div style={{ paddingTop: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>💰 Stake $AIDA</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Total Staked', value: '2.4M' },
                { label: 'APY', value: '24.5%' },
                { label: 'Your Share', value: '0.0%' },
                { label: 'Pool Rewards', value: '$45.2K' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#141418', border: '1px solid #1f1f23', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#00d4ff', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
            
            <div style={{ maxWidth: 400, margin: '0 auto', background: '#141418', border: '1px solid #1f1f23', borderRadius: 20, padding: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, textAlign: 'center' }}>Stake $AIDA</h3>
              <input type="number" placeholder="Amount" style={{ width: '100%', padding: '14px 16px', background: '#0a0a0c', border: '1px solid #27272d', borderRadius: 10, color: 'white', fontSize: 15, marginBottom: 16 }} />
              <button style={{ width: '100%', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 600, padding: '16px', borderRadius: 12, cursor: 'pointer', fontSize: 16 }}>
                Stake $AIDA
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <nav style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10,10,10,0.95)', borderTop: '1px solid #1f1f23', padding: '12px 0', justifyContent: 'space-around', zIndex: 100 }} className="mobile-nav">
        {[
          { id: 'home', icon: '🏠' },
          { id: 'create', icon: '🚀' },
          { id: 'stats', icon: '📊' },
          { id: 'stake', icon: '💰' },
        ].map(p => (
          <button key={p.id} onClick={() => setPage(p.id)} style={{ background: 'none', border: 'none', color: page === p.id ? '#00d4ff' : '#6b7280', cursor: 'pointer', fontSize: 12 }}>
            {p.icon}
          </button>
        ))}
      </nav>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-nav { display: flex !important; }
          main { padding-bottom: 80px; }
        }
      `}</style>
    </div>
  );
}
