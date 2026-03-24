import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

const DOSAGE_TIMES = ['Morning', 'Afternoon', 'Evening', 'Night', 'As Needed'];

export default function AddMedicine() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', dosageTime: 'Morning', specificTime: '09:00',
    startDate: '', endDate: '', expiryDate: '', notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/medicines/${id}`)
        .then(res => {
          const m = res.data;
          setForm({
            name: m.name || '',
            dosageTime: m.dosageTime || 'Morning',
            specificTime: m.specificTime || '09:00',
            startDate: m.startDate ? m.startDate.split('T')[0] : '',
            endDate: m.endDate ? m.endDate.split('T')[0] : '',
            expiryDate: m.expiryDate ? m.expiryDate.split('T')[0] : '',
            notes: m.notes || '',
          });
        })
        .catch(() => setError('Failed to load medicine details'))
        .finally(() => setFetchLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.name.trim()) return setError('Medicine name is required');
    if (!form.startDate || !form.endDate || !form.expiryDate) return setError('All date fields are required');
    if (new Date(form.endDate) < new Date(form.startDate)) return setError('End date must be after start date');

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/medicines/${id}`, form);
        setSuccess('Medicine updated successfully!');
      } else {
        await api.post('/medicines', form);
        setSuccess('Medicine saved successfully!');
      }
      setTimeout(() => navigate('/medicines'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save medicine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading-screen"><div className="spinner"></div></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar authenticated />
      <main className="page-container" style={{ flex: 1, maxWidth: 700 }}>

        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/medicines" style={{ color: '#64748b', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.8rem' }}>
            ← Back to Medicines
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Medicine' : 'Add New Medicine'}</h1>
          <p className="page-subtitle">{isEdit ? 'Update your medicine details' : 'Add a medicine to your schedule with reminders'}</p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">✓ {success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Medicine Name */}
            <div className="form-group">
              <label>Medicine Name <span style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </span>
                <input className="form-input" name="name" type="text" placeholder="e.g., Aspirin, Vitamin D" value={form.name} onChange={handleChange} required />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>Enter the full name of the medicine</p>
            </div>

            {/* Dosage Time */}
            <div className="form-group">
              <label>Dosage Time <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {DOSAGE_TIMES.map(t => (
                  <button key={t} type="button"
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: 8,
                      border: `1.5px solid ${form.dosageTime === t ? '#2563eb' : '#e2e8f0'}`,
                      background: form.dosageTime === t ? '#2563eb' : 'white',
                      color: form.dosageTime === t ? 'white' : '#64748b',
                      fontWeight: 600,
                      fontSize: '0.87rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => setForm({ ...form, dosageTime: t })}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Time */}
            <div className="form-group">
              <label>Specific Time <span style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <input className="form-input" name="specificTime" type="time" value={form.specificTime} onChange={handleChange} required />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>Select the exact time for reminder</p>
            </div>

            {/* Start & End Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Start Date <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  <input className="form-input" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>End Date <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  <input className="form-input" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="form-group">
              <label>Expiry Date <span style={{ color: '#ef4444' }}>*</span></label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <input className="form-input" name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>We'll alert you before the medicine expires</p>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any special instructions or notes..."
                rows={3}
                style={{ width: '100%', padding: '0.65rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontFamily: 'Nunito, sans-serif', fontSize: '0.9rem', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Info Box */}
            <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
              <strong>Note:</strong> You will receive reminders at the specified time. Make sure to enable notifications for best experience.
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.95rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Saving...' : isEdit ? '💾 Update Medicine' : '💾 Save Medicine'}
              </button>
              <button type="button" className="btn btn-outline" style={{ flex: 0.5, padding: '0.75rem', justifyContent: 'center' }} onClick={() => navigate('/medicines')}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Helpful Tips */}
        <div className="card" style={{ padding: '1.5rem', marginTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.8rem' }}>💡 Helpful Tips</h3>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {[
              'Double-check the medicine name to avoid confusion',
              'Set reminders at least 5-10 minutes before your usual routine',
              'Always check the expiry date on the medicine package',
              'Keep your medicine schedule up to date',
            ].map((tip, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
                <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0 }}>•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
