import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    medicineReminders: user?.notifications?.medicineReminders ?? true,
    expiryAlerts: user?.notifications?.expiryAlerts ?? true,
    weeklyReport: user?.notifications?.weeklyReport ?? false,
    emailNotifications: user?.notifications?.emailNotifications ?? true,
  });

  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true); setProfileMsg({ type: '', text: '' });
    try {
      const res = await api.put('/auth/profile', profile);
      updateUser(res.data.user);
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally { setProfileLoading(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPw.length < 6) return setPwMsg({ type: 'error', text: 'New password must be at least 6 characters' });
    if (passwords.newPw !== passwords.confirm) return setPwMsg({ type: 'error', text: 'Passwords do not match' });
    setPwLoading(true); setPwMsg({ type: '', text: '' });
    try {
      await api.put('/auth/password', { currentPassword: passwords.current, newPassword: passwords.newPw });
      setPwMsg({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      setPwMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update password' });
    } finally { setPwLoading(false); }
  };

  const handleNotifToggle = async (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    setNotifLoading(true);
    try {
      await api.put('/auth/notifications', updated);
    } catch (e) {
      setNotifications(notifications); // revert
    } finally { setNotifLoading(false); }
  };

  const sectionStyle = { background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem', marginBottom: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' };
  const iconHeader = (icon, text) => (
    <h2 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{icon}</div>
      {text}
    </h2>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar authenticated />
      <main className="page-container" style={{ flex: 1, maxWidth: 640 }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 className="page-title">Profile & Settings</h1>
          <p className="page-subtitle">Manage your account and preferences</p>
        </div>

        {/* Personal Info */}
        <div style={sectionStyle}>
          {iconHeader('👤', 'Personal Information')}
          {profileMsg.text && <div className={`alert alert-${profileMsg.type}`}>{profileMsg.text}</div>}
          <form onSubmit={handleProfileSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input no-icon" name="name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <input className="form-input" name="email" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input className="form-input no-icon" name="phone" placeholder="+xxxxxxxxxxx" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={profileLoading}>
              💾 {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div style={sectionStyle}>
          {iconHeader('🔑', 'Change Password')}
          {pwMsg.text && <div className={`alert alert-${pwMsg.type}`}>{pwMsg.text}</div>}
          <form onSubmit={handlePasswordChange}>
            {[
              { label: 'Current Password', key: 'current', placeholder: 'Enter current password' },
              { label: 'New Password', key: 'newPw', placeholder: 'Enter new password' },
              { label: 'Confirm New Password', key: 'confirm', placeholder: 'Confirm new password' },
            ].map(f => (
              <div key={f.key} className="form-group">
                <label>{f.label}</label>
                <input className="form-input no-icon" type="password" placeholder={f.placeholder} value={passwords[f.key]} onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })} />
              </div>
            ))}
            <button type="submit" className="btn" style={{ background: '#f59e0b', color: 'white' }} disabled={pwLoading}>
              🔒 {pwLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div style={sectionStyle}>
          {iconHeader('🔔', 'Notification Preferences')}
          {[
            { key: 'medicineReminders', label: 'Medicine Reminders', sub: "Get notified when it's time to take your medicine" },
            { key: 'expiryAlerts', label: 'Expiry Alerts', sub: 'Receive alerts before medicines expire' },
            { key: 'weeklyReport', label: 'Weekly Report', sub: 'Get a summary of your medicine schedule every week' },
            { key: 'emailNotifications', label: 'Email Notifications', sub: 'Receive important updates via email' },
          ].map(n => (
            <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>{n.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>{n.sub}</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={notifications[n.key]} onChange={() => handleNotifToggle(n.key)} disabled={notifLoading} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>

        {/* Security Tips */}
        <div style={sectionStyle}>
          {iconHeader('🛡️', 'Account Security Tips')}
          <ul style={{ listStyle: 'disc', paddingLeft: '1.4rem' }}>
            {[
              'Use a strong, unique password for your account',
              'Change your password regularly (every 3-6 months)',
              'Never share your password with anyone',
              'Enable all important notifications to stay informed',
            ].map((tip, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem' }}>{tip}</li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
