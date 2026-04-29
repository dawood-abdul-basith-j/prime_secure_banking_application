import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Hexagon, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="split-layout reverse">
      {/* Left Form Side */}
      <div className="split-left animate-slide-right">
        <div className="form-wrapper">
          <div className="login-brand">
            <div className="brand-icon">
              <Hexagon fill="currentColor" size={28} />
            </div>
            <span className="brand-text">PrimeSecure</span>
          </div>

          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Please enter your details to sign in to your workspace.</p>
          </div>

          {error && <div className="badge badge-danger" style={{marginBottom:'1.5rem', padding:'0.75rem 1rem', width:'100%', borderRadius:'12px'}}>{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#">Forgot password?</Link>
            </div>

            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="register-link">
            Don't have an account? <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>

      {/* Right Hero Side */}
      <div className="split-right">
        <div className="mesh-bg"></div>
        <div className="right-content animate-fade-in delay-2">
          
          {/* Floating UI Elements */}
          <div className="floating-card" style={{ animationDelay: '0s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background:'rgba(255,255,255,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Shield size={20} />
              </div>
              <span className="badge" style={{ background:'rgba(255,255,255,0.2)', color:'white' }}>SECURE</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Military-Grade Encryption</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.6 }}>Your assets are protected by state-of-the-art security protocols.</p>
          </div>

          <div className="floating-card" style={{ animationDelay: '2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background:'rgba(255,255,255,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Zap size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Lightning Fast Transfers</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.6 }}>Experience zero-latency cross-border transactions globally.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
