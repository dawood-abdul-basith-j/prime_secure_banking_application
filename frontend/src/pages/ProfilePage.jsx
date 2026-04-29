import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Shield, Bell, Key } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add toast or success state here if needed
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Your Profile</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and security settings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: Personal Info */}
        <div className="bento-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} className="text-primary" /> Personal Info
            </h2>
            <button 
              className="btn btn-outline" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  className="input-field with-icon" 
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? 'var(--bg-body)' : 'white' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  className="input-field with-icon" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? 'var(--bg-body)' : 'white' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input 
                  type="text" 
                  className="input-field with-icon" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? 'var(--bg-body)' : 'white' }}
                />
              </div>
            </div>

            {isEditing && (
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Security & Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="bento-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Shield size={20} className="text-primary" /> Security
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Change Password</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update your login password</p>
              </div>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Update</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Transaction PIN</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>6-digit PIN for transfers</p>
              </div>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Change</button>
            </div>
          </div>

          <div className="bento-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Bell size={20} className="text-primary" /> Preferences
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Email Notifications</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get alerts for transfers</p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Two-Factor Auth</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Extra layer of security</p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
