import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Wallet, Activity, ArrowRightLeft, Send, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: '1', balance: 12000 },
  { name: '5', balance: 11000 },
  { name: '10', balance: 14500 },
  { name: '15', balance: 13000 },
  { name: '20', balance: 16000 },
  { name: '25', balance: 15500 },
  { name: '30', balance: 18250 },
];

const transactions = [
  { id: 1, type: 'CREDIT', amount: 3500.00, from: 'Stripe Payout', date: 'Today, 10:30 AM', status: 'COMPLETED' },
  { id: 2, type: 'DEBIT', amount: 129.99, from: 'Apple Store', date: 'Today, 08:15 AM', status: 'COMPLETED' },
  { id: 3, type: 'TRANSFER', amount: 850.00, from: 'To Sarah Jenkins', date: 'Yesterday', status: 'PENDING' },
  { id: 4, type: 'DEBIT', amount: 45.00, from: 'Uber Rides', date: 'Yesterday', status: 'COMPLETED' },
  { id: 5, type: 'CREDIT', amount: 150.00, from: 'Venmo Cashout', date: 'Oct 26', status: 'COMPLETED' },
];

const categoryData = [
  { name: 'Food & Dining', value: 850 },
  { name: 'Tech & Gadgets', value: 1200 },
  { name: 'Travel', value: 450 },
  { name: 'Shopping', value: 740 }
];

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

const DashboardPage = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Track your finances and recent activity.</p>
        </div>
        <button className="btn btn-primary">
          <Send size={18} />
          Send Money
        </button>
      </div>

      {/* Bento Grid layout */}
      <div style={bentoGrid}>
        
        {/* Main Chart */}
        <div className="bento-card" style={{ gridColumn: 'span 8', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Balance</h3>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '0.25rem' }}>₹18,250.00</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge" style={{ background: 'var(--bg-body)', color: 'var(--text-main)' }}>1W</span>
              <span className="badge" style={{ background: 'var(--primary)', color: 'white' }}>1M</span>
              <span className="badge" style={{ background: 'var(--bg-body)', color: 'var(--text-main)' }}>1Y</span>
            </div>
          </div>
          <div style={{ height: '280px', width: '100%', marginLeft: '-10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-bento)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Premium Card Widget */}
        <div className="bento-card" style={{ gridColumn: 'span 4', padding: '2rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '32px', background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em' }}>PRIME</span>
          </div>
          
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card Number</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.1em', marginBottom: '1.5rem', fontFamily: 'monospace' }}>**** **** **** 4920</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Card Holder</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>John Doe</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Expires</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>12/28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bento-card" style={{ gridColumn: 'span 3', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={iconBox('var(--success-bg)', 'var(--success)')}><ArrowDownRight size={24} /></div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Income</p>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>+₹8,450.00</h3>
          </div>
        </div>

        <div className="bento-card" style={{ gridColumn: 'span 3', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={iconBox('var(--danger-bg)', 'var(--danger)')}><ArrowUpRight size={24} /></div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Expenses</p>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>-₹3,240.00</h3>
          </div>
        </div>

        <div className="bento-card" style={{ gridColumn: 'span 6', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Transactions</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreHorizontal size={20} /></button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={iconBox(
                    tx.type === 'CREDIT' ? 'var(--success-bg)' : tx.type === 'DEBIT' ? 'var(--danger-bg)' : 'rgba(79, 70, 229, 0.1)',
                    tx.type === 'CREDIT' ? 'var(--success)' : tx.type === 'DEBIT' ? 'var(--danger)' : 'var(--primary)'
                  )}>
                    {tx.type === 'CREDIT' ? <ArrowDownRight size={18} /> : tx.type === 'DEBIT' ? <ArrowUpRight size={18} /> : <ArrowRightLeft size={18} />}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tx.from}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tx.date}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 600, color: tx.type === 'DEBIT' ? 'var(--text-main)' : 'var(--success)' }}>
                    {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                  </p>
                  {tx.status === 'PENDING' && <span style={{ fontSize: '0.7rem', color: 'var(--warning)', fontWeight: 600 }}>PENDING</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Widget */}
        <div className="bento-card" style={{ gridColumn: 'span 6', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Spending Analytics</h3>
          </div>
          
          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-bento)' }} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹3,240</h3>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            {categoryData.map((item, index) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS[index] }}></div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.name}</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>₹{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const bentoGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '1.5rem',
  gridAutoRows: 'minmax(120px, auto)'
};

const iconBox = (bg, color) => ({
  width: '48px',
  height: '48px',
  borderRadius: '14px',
  background: bg,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export default DashboardPage;
