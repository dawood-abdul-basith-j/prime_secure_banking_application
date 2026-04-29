import React, { useState } from 'react';
import { Send, User, AtSign, Phone, ShieldCheck } from 'lucide-react';

const TransferPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (identifier && amount) setStep(2);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Send Money</h1>
        <p style={{ color: 'var(--text-muted)' }}>Transfer funds instantly and securely.</p>
      </div>

      <div className="bento-card" style={{ padding: '2.5rem', position: 'relative' }}>
        
        {/* Step 1: Details */}
        {step === 1 && (
          <form onSubmit={handleNext} className="animate-fade-in">
            <div className="input-group">
              <label className="input-label">Recipient (Email or Phone)</label>
              <div className="input-wrapper">
                <AtSign size={20} className="input-icon" />
                <input 
                  type="text" 
                  className="input-field with-icon" 
                  placeholder="name@example.com or +1234567890"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Amount (₹)</label>
              <div className="input-wrapper">
                <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)' }}>₹</span>
                <input 
                  type="number" 
                  step="0.01"
                  className="input-field" 
                  style={{ paddingLeft: '2.5rem', fontSize: '1.5rem', fontWeight: 600 }}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Category / Note (Optional)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g., Dinner, Rent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
              Continue
            </button>
          </form>
        )}

        {/* Step 2: PIN Verification */}
        {step === 2 && (
          <form onSubmit={handleTransfer} className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px -10px var(--primary)' }}>
              <ShieldCheck size={32} />
            </div>
            
            <h2 style={{ marginBottom: '0.5rem' }}>Security Verification</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your 6-digit transaction PIN to confirm sending <strong>₹{amount}</strong> to <strong>{identifier}</strong>.</p>

            <div className="input-group">
              <input 
                type="password" 
                className="input-field" 
                style={{ textAlign: 'center', fontSize: '2rem', letterSpacing: '0.5em', fontWeight: 700 }}
                maxLength="6"
                placeholder="••••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm Transfer'}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Send size={40} />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Transfer Successful!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your transfer of ₹{amount} to {identifier} has been processed.</p>
            <button className="btn btn-primary" onClick={() => { setStep(1); setIdentifier(''); setAmount(''); setPin(''); }}>
              Send Another Payment
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TransferPage;
