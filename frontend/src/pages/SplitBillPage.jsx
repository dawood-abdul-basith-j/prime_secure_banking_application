import React, { useState } from 'react';
import { Users, Plus, X, Receipt, ArrowRight } from 'lucide-react';

const SplitBillPage = () => {
  const [amount, setAmount] = useState('');
  const [friends, setFriends] = useState([{ name: '', email: '' }]);
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddFriend = () => {
    setFriends([...friends, { name: '', email: '' }]);
  };

  const handleRemoveFriend = (index) => {
    const newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  const handleChangeFriend = (index, field, value) => {
    const newFriends = [...friends];
    newFriends[index][field] = value;
    setFriends(newFriends);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && friends.length > 0) {
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
      }, 800);
    }
  };

  const splitAmount = amount ? (parseFloat(amount) / (friends.length + 1)).toFixed(2) : '0.00';

  if (isSuccess) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}>
          <Receipt size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Split Requests Sent!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We've notified your friends to pay their share of ₹{splitAmount} for {description || 'the bill'}.</p>
        <button className="btn btn-primary" onClick={() => { setIsSuccess(false); setAmount(''); setFriends([{ name: '', email: '' }]); }}>
          Split Another Bill
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Split the Bill</h1>
        <p style={{ color: 'var(--text-muted)' }}>Share expenses instantly with your friends.</p>
      </div>

      <div className="bento-card" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="input-label">Total Amount (₹)</label>
              <input 
                type="number" 
                step="0.01"
                className="input-field" 
                style={{ fontSize: '1.5rem', fontWeight: 600 }}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
              />
            </div>

            <div className="input-group" style={{ flex: 2, marginBottom: 0 }}>
              <label className="input-label">What is this for?</label>
              <input 
                type="text" 
                className="input-field" 
                style={{ fontSize: '1.25rem' }}
                placeholder="e.g., Dinner at Mario's"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required 
              />
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Who are you splitting with?</h3>
              <span className="badge" style={{ background: 'white', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}>
                You + {friends.length} {friends.length === 1 ? 'person' : 'people'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {friends.map((friend, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="input-wrapper" style={{ flex: 1 }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Name"
                      value={friend.name}
                      onChange={(e) => handleChangeFriend(index, 'name', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="input-wrapper" style={{ flex: 1 }}>
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="Email"
                      value={friend.email}
                      onChange={(e) => handleChangeFriend(index, 'email', e.target.value)}
                      required 
                    />
                  </div>
                  {friends.length > 1 && (
                    <button type="button" onClick={() => handleRemoveFriend(index)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" onClick={handleAddFriend} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 600, marginTop: '1.5rem', cursor: 'pointer' }}>
              <Plus size={18} /> Add another friend
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Each person pays</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>₹{splitAmount}</h2>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Send Requests <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SplitBillPage;
