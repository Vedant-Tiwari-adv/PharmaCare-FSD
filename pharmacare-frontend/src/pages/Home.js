import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  { icon: '⏰', title: 'Timely Reminders', desc: 'Get notified when it\'s time to take your medicine. Never miss a dose with our reliable reminder system.', color: '#dbeafe', iconColor: '#2563eb' },
  { icon: '🔔', title: 'Expiry Alerts', desc: 'Receive alerts before your medicines expire. Stay safe and avoid using expired medications.', color: '#fef3c7', iconColor: '#d97706' },
  { icon: '📋', title: 'Prescription Storage', desc: 'Store your prescriptions digitally and access them anytime, anywhere. No more lost papers.', color: '#dcfce7', iconColor: '#16a34a' },
  { icon: '💊', title: 'Medicine Tracking', desc: 'Keep track of all your medicines in one organized place. View dosage, timing, and more.', color: '#dbeafe', iconColor: '#2563eb' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is encrypted and secure. We prioritize your privacy and data protection.', color: '#f0f9ff', iconColor: '#0369a1' },
  { icon: '❤️', title: 'Easy to Use', desc: 'Designed for everyone, especially elderly users. Simple, clear, and accessible interface.', color: '#ffe4e6', iconColor: '#e11d48' },
];

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'white' }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #3b82f6 100%)',
        padding: '3.5rem 4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 280,
      }}>
        <div style={{ flex: 1, zIndex: 2 }}>
          <h1 style={{ fontSize: '2.4rem', color: 'white', lineHeight: 1.25, marginBottom: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Never Miss a Dose.<br />Never Use Expired<br />Medicine.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: 380 }}>
            PharmaCare helps you manage medicines, reminders, and prescriptions safely and easily. Take control of your health with confidence.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Link to="/register" className="btn" style={{ background: 'white', color: '#2563eb', fontWeight: 700, padding: '0.65rem 1.5rem' }}>Get Started</Link>
            <Link to="/login" className="btn" style={{ background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.5)', padding: '0.65rem 1.5rem' }}>Login</Link>
          </div>
        </div>

        {/* Demo card */}
        <div style={{ flex: 0.9, zIndex: 2 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '1.2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxWidth: 320 }}>
            {[
              { icon: '💊', bg: '#dbeafe', title: 'Medicine Reminder', sub: 'Aspirin · 9:00 AM' },
              { icon: '⚠️', bg: '#fef3c7', title: 'Expiry Alert', sub: 'Expires in 5 days' },
              { icon: '📋', bg: '#dcfce7', title: 'Prescription Saved', sub: 'Dr. Smith · Feb 2026' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.65rem 0.5rem', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: 36, height: 36, background: item.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '3.5rem 4rem', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#1e293b' }}>Complete Medicine Management</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Everything you need to manage your medicines safely and effectively, all in one place.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{ padding: '1.8rem 1.5rem', border: '1px solid #e2e8f0', borderRadius: 14, textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
              <div style={{ width: 52, height: 52, background: f.color, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#1e293b' }}>{f.title}</h3>
              <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#2563eb', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '1.7rem', marginBottom: '0.6rem' }}>Ready to Take Control of Your Health?</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Join PharmaCare today and never worry about missing a dose or using expired medicine again.</p>
        <Link to="/register" className="btn" style={{ background: 'white', color: '#2563eb', fontWeight: 700, padding: '0.75rem 2rem' }}>Create Free Account</Link>
      </section>

      <Footer />
    </div>
  );
}
