import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

const weekData = [
  { day: 'Mon', taken: 2, missed: 0 }, { day: 'Tue', taken: 1.5, missed: 0.5 },
  { day: 'Wed', taken: 2, missed: 0 }, { day: 'Thu', taken: 1.5, missed: 0 },
  { day: 'Fri', taken: 2, missed: 0 }, { day: 'Sat', taken: 1, missed: 1 },
  { day: 'Sun', taken: 1.5, missed: 0.5 },
];
const pieData = [{ name: 'Taken', value: 85 }, { name: 'Missed', value: 15 }];
const PIE_COLORS = ['#2563eb', '#ef4444'];

function daysLeft(expiryDate) {
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function ExpiryBadge({ days }) {
  if (days <= 7) return <span className="badge badge-red">{days}d</span>;
  if (days <= 30) return <span className="badge badge-yellow">{days}d</span>;
  return <span className="badge badge-green">{days}d</span>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [stats, setStats] = useState({ total: 0, takenToday: 0, totalToday: 0, adherence: 85, nextRefill: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/medicines');
        setMedicines(res.data || []);
        const today = new Date();
        const active = (res.data || []).filter(m => new Date(m.startDate) <= today && new Date(m.endDate) >= today);
        setStats(s => ({ ...s, total: res.data?.length || 0, totalToday: active.length }));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const todayMeds = medicines.filter(m => {
    const now = new Date();
    return new Date(m.startDate) <= now && new Date(m.endDate) >= now;
  }).slice(0, 3);

  const expiringSoon = medicines
    .map(m => ({ ...m, days: daysLeft(m.expiryDate) }))
    .filter(m => m.days <= 30)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);

  const upcoming = medicines.slice(0, 3);

  const handleMarkDone = async (id) => {
    try {
      await api.post(`/medicines/${id}/taken`);
      setMedicines(prev => prev.map(m => m._id === id ? { ...m, takenToday: true } : m));
    } catch (e) { console.error(e); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar authenticated />
      <main className="page-container" style={{ maxWidth: 1100, flex: 1 }}>

        {/* Welcome Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 14, padding: '1.4rem 2rem', color: 'white', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'white' }}>Welcome back, {user?.name}!</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '0.3rem' }}>You have {stats.totalToday} medicine{stats.totalToday !== 1 ? 's' : ''} pending for today. Keep up the great work!</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Medicines', value: loading ? '...' : stats.total, icon: '💊', color: '#dbeafe', dot: '#2563eb' },
            { label: 'This Week', value: `${stats.takenToday}/21`, icon: '✓', color: '#dcfce7', dot: '#16a34a' },
            { label: 'Adherence Rate', value: '85%', icon: '📈', color: '#ede9fe', dot: '#7c3aed' },
            { label: 'Next Refill', value: '5 days', icon: '📅', color: '#fef3c7', dot: '#d97706' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
              <div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, marginBottom: 6 }}></div>
                <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ padding: '1.4rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#1e293b' }}>📈 Weekly Adherence</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weekData} barSize={14} barGap={2}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="taken" fill="#2563eb" radius={[4, 4, 0, 0]} name="Taken" />
                <Bar dataKey="missed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Missed" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', justifyContent: 'center' }}>
              {[['#2563eb', 'Taken'], ['#ef4444', 'Missed']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: '#64748b' }}>
                  <div style={{ width: 10, height: 10, background: c, borderRadius: 2 }}></div>{l}
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: '1.4rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', color: '#1e293b' }}>⏱ Overall Compliance</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={pieData} cx={60} cy={60} innerRadius={38} outerRadius={58} dataKey="value" startAngle={90} endAngle={-270}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div>
                {[['#2563eb', 'Taken', '85%'], ['#ef4444', 'Missed', '15%']].map(([c, l, v]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontSize: '0.85rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }}></div>
                    <span style={{ color: '#64748b' }}>{l}</span>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule + Upcoming */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', color: '#1e293b' }}>📅 Today's Schedule</h3>
              <Link to="/medicines" style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>View All →</Link>
            </div>
            {todayMeds.length === 0 && !loading && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No medicines scheduled today.</p>}
            {todayMeds.map((m, i) => (
              <div key={m._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 0.8rem', borderRadius: 8, background: m.takenToday ? '#f0fdf4' : i === 2 ? '#fff7ed' : '#f8fafc', marginBottom: '0.5rem', border: `1px solid ${m.takenToday ? '#bbf7d0' : '#e2e8f0'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.takenToday ? '#16a34a' : '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white' }}>
                    {m.takenToday ? '✓' : '⏰'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.dosageTime} · {m.specificTime}</div>
                  </div>
                </div>
                {m.takenToday
                  ? <span className="badge badge-green">Taken</span>
                  : <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.78rem' }} onClick={() => handleMarkDone(m._id)}>Mark Done</button>}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', color: '#1e293b' }}>⏰ Upcoming Reminders</h3>
              <Link to="/medicines" style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>View All →</Link>
            </div>
            {upcoming.map((m, i) => (
              <div key={m._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 0.8rem', borderRadius: 8, background: '#f8fafc', marginBottom: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>⏰</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tomorrow, {m.specificTime || '8:00 AM'}</div>
                  </div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring + Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', color: '#1e293b' }}>⚠️ Expiring Soon</h3>
              <Link to="/medicines" style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>View All →</Link>
            </div>
            {expiringSoon.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No medicines expiring soon! 🎉</p>}
            {expiringSoon.map(m => (
              <div key={m._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.8rem', borderRadius: 8, background: m.days <= 7 ? '#fff1f2' : '#fff7ed', marginBottom: '0.5rem', border: `1px solid ${m.days <= 7 ? '#fecdd3' : '#fed7aa'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <span style={{ fontSize: '1rem' }}>{m.days <= 7 ? '🔴' : '🟡'}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.dosageTime || 'Oral'} · {m.days} days left</div>
                  </div>
                </div>
                <ExpiryBadge days={m.days} />
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.4rem' }}>
            <h3 style={{ fontSize: '0.92rem', color: '#1e293b', marginBottom: '1rem' }}>+ Quick Actions</h3>
            {[
              { icon: '➕', bg: '#dbeafe', label: 'Add New Medicine', sub: 'Create a new medicine entry', to: '/medicines/add' },
              { icon: '📤', bg: '#dcfce7', label: 'Upload Prescription', sub: 'Store your prescription safely', to: '/prescriptions' },
              { icon: '💊', bg: '#ede9fe', label: 'View All Medicines', sub: 'Manage your medicine list', to: '/medicines' },
            ].map((a, i) => (
              <Link key={i} to={a.to} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '0.5rem', background: 'white', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{a.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{a.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{a.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
