import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={navStyle}>
      <div style={searchContainer}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search for transfers, accounts, or help..." 
          style={searchInput}
        />
      </div>

      <div style={rightSection}>
        <button style={iconBtn} onClick={() => alert('You have no new notifications.')}>
          <Bell size={20} color="var(--text-main)" />
          <span style={badge}></span>
        </button>
        
        <div 
          style={{...userSection, cursor: 'pointer', transition: 'transform 0.2s'}} 
          onClick={() => navigate('/profile')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={userInfo}>
            <span style={userName}>{user?.name || 'John Doe'}</span>
            <span style={userRole}>Standard Account</span>
          </div>
          <div style={avatar}>
            {user?.name?.charAt(0) || 'J'}
          </div>
        </div>

        <div style={divider}></div>

        <button style={logoutBtn} onClick={logout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

const navStyle = {
  height: '80px',
  padding: '0 2.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(248, 250, 252, 0.8)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--border-light)',
  zIndex: 5
};

const searchContainer = {
  display: 'flex',
  alignItems: 'center',
  background: 'var(--bg-surface)',
  padding: '0.75rem 1.25rem',
  borderRadius: '99px',
  width: '360px',
  border: '1px solid var(--border-light)',
  boxShadow: 'var(--shadow-sm)'
};

const searchInput = {
  border: 'none',
  background: 'transparent',
  marginLeft: '0.75rem',
  outline: 'none',
  width: '100%',
  color: 'var(--text-main)',
  fontFamily: 'inherit',
  fontSize: '0.9rem'
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem'
};

const iconBtn = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-light)',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.6rem',
  borderRadius: '50%',
  transition: 'all 0.2s',
  boxShadow: 'var(--shadow-sm)'
};

const badge = {
  position: 'absolute',
  top: '-2px',
  right: '-2px',
  background: 'var(--danger)',
  border: '2px solid var(--bg-surface)',
  height: '12px',
  width: '12px',
  borderRadius: '50%'
};

const userSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  background: 'var(--bg-surface)',
  padding: '0.35rem 0.35rem 0.35rem 1.25rem',
  borderRadius: '99px',
  border: '1px solid var(--border-light)',
  boxShadow: 'var(--shadow-sm)'
};

const avatar = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '1.1rem'
};

const userInfo = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
};

const userName = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'var(--text-main)'
};

const userRole = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)'
};

const divider = {
  height: '24px',
  width: '1px',
  background: 'var(--border-light)',
  margin: '0 0.25rem'
};

const logoutBtn = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '50%',
  transition: 'all 0.2s'
};

export default Navbar;
