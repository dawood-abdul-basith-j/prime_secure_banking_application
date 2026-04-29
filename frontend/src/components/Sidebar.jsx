import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  History, 
  CreditCard,
  User, 
  Settings, 
  LogOut,
  Wallet,
  Users,
  Hexagon
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/transfer', name: 'Send Money', icon: <ArrowRightLeft size={20} /> },
    { path: '/split', name: 'Split Bill', icon: <Users size={20} /> },
    { path: '/wallet', name: 'Wallet', icon: <Wallet size={20} /> },
    { path: '/transactions', name: 'Transactions', icon: <History size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>
          <div style={brandIcon}>
            <Hexagon fill="currentColor" size={24} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>PrimeSecure</span>
        </div>
      </div>
      
      <nav style={navStyle}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {})
            })}
          >
            {item.icon}
            <span style={{ marginLeft: '14px', fontWeight: 500, fontSize: '0.95rem' }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={footerStyle}>
        <div 
          style={{...premiumBadge, cursor: 'pointer'}} 
          onClick={() => alert("Pro Plan features will be activated after backend integration is complete!")}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>PRO PLAN</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          &copy; 2026 Prime Bank
        </div>
      </div>
    </div>
  );
};

const sidebarStyle = {
  width: '280px',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(24px)',
  borderRight: '1px solid var(--border-light)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
  padding: '1.5rem',
};

const headerStyle = {
  padding: '0.5rem 0.5rem 2.5rem',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const brandIcon = {
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
  color: 'white',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px'
};

const navStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.875rem 1.25rem',
  color: 'var(--text-muted)',
  textDecoration: 'none',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
};

const activeLinkStyle = {
  color: 'var(--primary)',
  background: 'rgba(79, 70, 229, 0.08)',
  fontWeight: 600
};

const footerStyle = {
  padding: '1.5rem 0.5rem 0.5rem',
};

const premiumBadge = {
  background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
  color: '#F59E0B',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
};

export default Sidebar;
