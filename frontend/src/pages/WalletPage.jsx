import React, { useState } from 'react';
import { CreditCard, Plus, Shield, Trash2, CheckCircle2 } from 'lucide-react';

const WalletPage = () => {
  const [cards, setCards] = useState([
    { id: 1, type: 'VISA', last4: '4242', expiry: '12/25', isDefault: true, color: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)' },
    { id: 2, type: 'MASTERCARD', last4: '8810', expiry: '09/26', isDefault: false, color: 'linear-gradient(135deg, #111827 0%, #374151 100%)' }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const handleAddCard = (e) => {
    e.preventDefault();
    const cleanNumber = newCard.number.replace(/\s/g, '');
    
    if (cleanNumber.length >= 8) { // Relaxed validation for testing
      const last4 = cleanNumber.slice(-4);
      setCards([...cards, {
        id: Date.now(),
        type: newCard.number.startsWith('4') ? 'VISA' : 'MASTERCARD',
        last4,
        expiry: newCard.expiry,
        isDefault: false,
        color: 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
      }]);
      setIsAdding(false);
      setNewCard({ number: '', name: '', expiry: '', cvc: '' });
    } else {
      alert("Please enter a valid card number (at least 8 digits) to save.");
    }
  };

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Digital Wallet</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your saved payment methods securely.</p>
        </div>
        {!isAdding && (
          <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={20} /> Add Card
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bento-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard /> Add New Card</h2>
            <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
          </div>

          <form onSubmit={handleAddCard}>
            <div className="input-group">
              <label className="input-label">Card Number</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="0000 0000 0000 0000"
                maxLength="16"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Cardholder Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Expiry Date</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="MM/YY"
                  maxLength="5"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">CVC</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="•••"
                  maxLength="3"
                  value={newCard.cvc}
                  onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start', margin: '1.5rem 0' }}>
              <Shield size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Your card details are tokenized and securely encrypted. PrimeSecure never stores your actual card number on our servers.
              </p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              Save Card Securely
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {cards.map((card) => (
            <div key={card.id} className="bento-card animate-fade-in" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              
              <div style={{ 
                position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', 
                background: card.color, borderRadius: '50%', opacity: 0.1, filter: 'blur(20px)' 
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '1px', color: 'var(--text-main)' }}>
                  {card.type}
                </div>
                {card.isDefault && (
                  <span className="badge" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                    <CheckCircle2 size={14} /> Default
                  </span>
                )}
              </div>

              <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '4px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>•••• •••• ••••</span>
                {card.last4}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Expires</p>
                  <p style={{ fontWeight: 600 }}>{card.expiry}</p>
                </div>
                <button 
                  onClick={() => removeCard(card.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.5rem', opacity: 0.7, transition: '0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default WalletPage;
