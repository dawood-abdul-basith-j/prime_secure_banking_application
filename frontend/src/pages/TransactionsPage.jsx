import React, { useState } from 'react';
import { Search, Filter, Download, ArrowDownRight, ArrowUpRight, ArrowRightLeft } from 'lucide-react';

const mockTransactions = [
  { id: 'TRX-9982', type: 'CREDIT', amount: 3500.00, from: 'Stripe Payout', date: '2026-04-29T10:30:00', category: 'Income', status: 'COMPLETED' },
  { id: 'TRX-9981', type: 'DEBIT', amount: 129.99, from: 'Apple Store', date: '2026-04-29T08:15:00', category: 'Electronics', status: 'COMPLETED' },
  { id: 'TRX-9980', type: 'TRANSFER', amount: 850.00, from: 'To Sarah Jenkins', date: '2026-04-28T16:45:00', category: 'Personal', status: 'PENDING' },
  { id: 'TRX-9979', type: 'DEBIT', amount: 45.00, from: 'Uber Rides', date: '2026-04-28T09:20:00', category: 'Transport', status: 'COMPLETED' },
  { id: 'TRX-9978', type: 'CREDIT', amount: 150.00, from: 'Venmo Cashout', date: '2026-04-26T14:10:00', category: 'Income', status: 'COMPLETED' },
  { id: 'TRX-9977', type: 'DEBIT', amount: 420.00, from: 'Whole Foods Market', date: '2026-04-25T11:30:00', category: 'Groceries', status: 'COMPLETED' },
  { id: 'TRX-9976', type: 'DEBIT', amount: 85.50, from: 'Netflix Subscription', date: '2026-04-24T00:01:00', category: 'Entertainment', status: 'COMPLETED' },
  { id: 'TRX-9975', type: 'CREDIT', amount: 4200.00, from: 'Tech Corp Salary', date: '2026-04-20T09:00:00', category: 'Salary', status: 'COMPLETED' },
  { id: 'TRX-9974', type: 'TRANSFER', amount: 1200.00, from: 'To Savings Acc', date: '2026-04-20T09:30:00', category: 'Transfer', status: 'COMPLETED' },
  { id: 'TRX-9973', type: 'DEBIT', amount: 65.20, from: 'Starbucks Coffee', date: '2026-04-19T08:10:00', category: 'Dining', status: 'COMPLETED' },
];

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = mockTransactions.filter(tx => 
    tx.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Transactions</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>View and manage all your account activity.</p>
        </div>
        <button className="btn btn-outline" style={{ background: 'var(--bg-surface)' }}>
          <Download size={18} />
          Export Statement
        </button>
      </div>

      {/* Main Card */}
      <div className="bento-card" style={{ padding: '2rem' }}>
        
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by description or ID..." 
              style={{ paddingLeft: '2.75rem', marginBottom: 0 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Transaction</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }} className="hover-row">
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={iconBox(
                        tx.type === 'CREDIT' ? 'var(--success-bg)' : tx.type === 'DEBIT' ? 'var(--danger-bg)' : 'rgba(79, 70, 229, 0.1)',
                        tx.type === 'CREDIT' ? 'var(--success)' : tx.type === 'DEBIT' ? 'var(--danger)' : 'var(--primary)'
                      )}>
                        {tx.type === 'CREDIT' ? <ArrowDownRight size={18} /> : tx.type === 'DEBIT' ? <ArrowUpRight size={18} /> : <ArrowRightLeft size={18} />}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tx.from}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{tx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ background: '#F1F5F9', color: '#475569', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500 }}>
                      {tx.category}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span className={`badge badge-${tx.status === 'COMPLETED' ? 'success' : 'warning'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right', fontWeight: 600, fontSize: '1rem', color: tx.type === 'DEBIT' ? 'var(--text-main)' : 'var(--success)' }}>
                    {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No transactions found matching your search.
            </div>
          )}
        </div>
        
        {/* Pagination mock */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span>Showing 1 to {filteredData.length} of 42 entries</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={pageBtn}>Previous</button>
            <button style={{...pageBtn, background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)'}}>1</button>
            <button style={pageBtn}>2</button>
            <button style={pageBtn}>3</button>
            <button style={pageBtn}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

const iconBox = (bg, color) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: bg,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
});

const pageBtn = {
  padding: '0.5rem 0.85rem',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-light)',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontWeight: 500,
  transition: 'all 0.2s'
};

export default TransactionsPage;
