import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef();

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get('/prescriptions');
      setPrescriptions(res.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPrescriptions(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) return setError('Only PDF, JPG, PNG files are allowed');
    if (file.size > 5 * 1024 * 1024) return setError('File size must be less than 5MB');

    setUploading(true); setError(''); setSuccess('');
    const formData = new FormData();
    formData.append('prescription', file);

    try {
      await api.post('/prescriptions', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess('Prescription uploaded successfully!');
      fetchPrescriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;
    try {
      await api.delete(`/prescriptions/${id}`);
      setPrescriptions(prev => prev.filter(p => p._id !== id));
    } catch (e) { alert('Failed to delete prescription.'); }
  };

  const handleView = async (id) => {
    try {
      const res = await api.get(`/prescriptions/${id}/view`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data]));
      window.open(url, '_blank');
    } catch (e) { alert('Failed to open file.'); }
  };

  const handleDownload = async (id, filename) => {
    try {
      const res = await api.get(`/prescriptions/${id}/download`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
    } catch (e) { alert('Failed to download file.'); }
  };

  const totalSize = prescriptions.reduce((sum, p) => sum + (p.size || 0), 0);
  const fmtSize = (bytes) => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB').replace(/\//g, '/') : '-';
  const thisMonth = prescriptions.filter(p => new Date(p.uploadDate).getMonth() === new Date().getMonth()).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar authenticated />
      <main className="page-container" style={{ flex: 1 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">My Prescriptions</h1>
            <p className="page-subtitle">Securely store and access your medical prescriptions</p>
          </div>
          <button className="btn btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            📤 {uploading ? 'Uploading...' : 'Upload Prescription'}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleUpload} />
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Prescriptions', value: prescriptions.length, icon: '📋', bg: '#dbeafe' },
            { label: 'This Month', value: thisMonth, icon: '📅', bg: '#dcfce7' },
            { label: 'Storage Used', value: fmtSize(totalSize), icon: '💾', bg: '#fef3c7' },
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

        {/* Upload Info Card */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.3rem' }}>Keep Your Prescriptions Safe</h3>
            <p style={{ fontSize: '0.83rem', color: '#64748b' }}>Upload your doctor's prescriptions here to access them anytime. Your files are encrypted and stored securely.</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
              <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Accepts: PDF, JPG, PNG</span>
              <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Max size: 5 MB</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ marginBottom: '1.2rem' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading prescriptions...</div>
          ) : prescriptions.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>No prescriptions yet</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Upload your first prescription to get started</p>
              <button className="btn btn-primary" onClick={() => fileRef.current?.click()}>📤 Upload Prescription</button>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Doctor</th>
                    <th>Prescription Date</th>
                    <th>Upload Date</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map(p => (
                    <tr key={p._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontSize: '1.1rem' }}>📄</span>
                          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{p.filename}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{p.doctor || 'N/A'}</td>
                      <td style={{ fontSize: '0.85rem' }}>📅 {fmtDate(p.prescriptionDate)}</td>
                      <td style={{ fontSize: '0.85rem' }}>{fmtDate(p.uploadDate)}</td>
                      <td style={{ fontSize: '0.85rem' }}>{fmtSize(p.size || 0)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button className="action-btn view" onClick={() => handleView(p._id)} title="View">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <button className="action-btn download" onClick={() => handleDownload(p._id, p.filename)} title="Download">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(p._id)} title="Delete">
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

        {/* Security */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🔒 Security & Privacy</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'All prescriptions are encrypted and stored securely',
              'Only you can access your uploaded files',
              'Files are backed up regularly to prevent data loss',
              'We never share your medical information with third parties',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', padding: '0.3rem 0' }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
