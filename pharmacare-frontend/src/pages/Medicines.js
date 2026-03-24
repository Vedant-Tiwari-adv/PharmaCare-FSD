import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

function daysLeft(expiryDate) {
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function ExpiryBadge({ expiryDate }) {
  const days = daysLeft(expiryDate);
  if (days <= 7) return <span className="badge badge-red">⚠ {days} days left</span>;
  if (days <= 30) return <span className="badge badge-yellow">⚠ {days} days left</span>;
  return <span className="badge badge-green">⚠ {days} days left</span>;
}

function DosageBadge({ time }) {
  const colors = { Morning: 'badge-blue', Afternoon: 'badge-yellow', Evening: 'badge-purple', Night: 'badge-gray', 'As Needed': 'badge-gray' };
  return <span className={`badge ${colors[time] || 'badge-gray'}`}>{time}</span>;
}

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchMedicines = async () => {
    try {
      const res = await api.get('/medicines');
      setMedicines(res.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMedicines(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await api.delete(`/medicines/${id}`);
      setMedicines(prev => prev.filter(m => m._id !== id));
    } catch (e) { alert('Failed to delete medicine.'); }
  };

  const today = new Date();
  const activeToday = medicines.filter(m => new Date(m.startDate) <= today && new Date(m.endDate) >= today).length;
  const expiringSoon = medicines.filter(m => daysLeft(m.expiryDate) <= 30).length;

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB').replace(/\//g, '/') : '-';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar authenticated />
      <main className="page-container" style={{ flex: 1 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">My Medicines</h1>
            <p className="page-subtitle">Manage and track all your medications</p>
          </div>
          <Link to="/medicines/add" className="btn btn-primary" style={{ padding: '0.65rem 1.3rem' }}>+ Add Medicine</Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Medicines', value: medicines.length, icon: '💊', bg: '#dbeafe' },
            { label: 'Active Today', value: activeToday, icon: '⏰', bg: '#dcfce7' },
            { label: 'Expiring Soon', value: expiringSoon, icon: '⚠️', bg: '#fef3c7' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
              <div className="stat-icon" style={{ background: s.bg, fontSize: '1.2rem' }}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card">
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading medicines...</div>
          ) : medicines.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💊</div>
              <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>No medicines yet</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Start by adding your first medicine</p>
              <Link to="/medicines/add" className="btn btn-primary">+ Add Medicine</Link>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Dosage Time</th>
                    <th>Schedule</th>
                    <th>Expiry Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map(m => (
                    <tr key={m._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💊</div>
                          <span style={{ fontWeight: 600 }}>{m.name}</span>
                        </div>
                      </td>
                      <td>
                        <div><DosageBadge time={m.dosageTime} /></div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>⏰ {m.specificTime}</div>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>
                        <div>📅 Start: {fmt(m.startDate)}</div>
                        <div>End: {fmt(m.endDate)}</div>
                      </td>
                      <td><ExpiryBadge expiryDate={m.expiryDate} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button className="action-btn edit" onClick={() => navigate(`/medicines/edit/${m._id}`)} title="Edit">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(m._id)} title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
