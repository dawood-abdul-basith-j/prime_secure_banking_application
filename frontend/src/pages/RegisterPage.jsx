import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Hexagon, Shield, Globe, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        fullName: name,
        email,
        phoneNumber,
        password,
        transactionPin
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="split-layout">
      {/* Left Form Side */}
      <div className="split-left animate-slide-left">
        <div className="form-wrapper">
          <div className="login-brand">
            <div className="brand-icon">
              <Hexagon fill="currentColor" size={28} />
            </div>
            <span className="brand-text">PrimeSecure</span>
          </div>

          <div className="login-header">
            <h1>Create account</h1>
            <p>Join the next generation of digital banking.</p>
          </div>

          {error && <div className="badge badge-danger" style={{marginBottom:'1.5rem', padding:'0.75rem 1rem', width:'100%', borderRadius:'12px'}}>{error}</div>}

          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input 
                  type="text" 
                  className="input-field with-icon" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input 
                type="email" 
                className="input-field with-icon" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <div className="input-wrapper">
              <Phone size={20} className="input-icon" />
              <input 
                type="tel" 
                className="input-field with-icon" 
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                type="password" 
                className="input-field with-icon" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                type="password" 
                className="input-field with-icon" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Secure Transaction PIN (6 digits)</label>
            <div className="input-wrapper">
              <Shield size={20} className="input-icon" />
              <input 
                type="password" 
                className="input-field with-icon" 
                placeholder="••••••"
                maxLength="6"
                value={transactionPin}
                onChange={(e) => setTransactionPin(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="login-options" style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem' }}>
              <input type="checkbox" required /> I agree to the <Link to="#">Terms & Conditions</Link>
            </label>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
            {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="register-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      {/* Right Hero Side */}
      <div className="split-right">
        <div className="mesh-bg"></div>
        <div className="right-content animate-fade-in delay-2">
          
          <div className="floating-card" style={{ animationDelay: '0s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background:'rgba(255,255,255,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Globe size={20} />
              </div>
              <span className="badge" style={{ background:'rgba(255,255,255,0.2)', color:'white' }}>GLOBAL</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Borderless Banking</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.6 }}>Hold, exchange, and transfer multiple currencies with zero hidden fees.</p>
          </div>

          <div className="floating-card" style={{ animationDelay: '2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background:'rgba(255,255,255,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Shield size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Protected Deposits</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.6 }}>Your funds are secured and insured up to $250,000 by standard regulations.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
