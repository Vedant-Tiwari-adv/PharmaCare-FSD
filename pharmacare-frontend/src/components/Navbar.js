import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PharmIcon = () => (
  <div className="logo-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v4H3z"/><path d="M3 7v14h18V7"/><path d="M9 12h6m-3-3v6"/>
    </svg>
  </div>
);

export default function Navbar({ authenticated }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  if (authenticated) {
    return (
      <nav className="navbar">
        <Link to="/dashboard" className="navbar-brand">
          <PharmIcon />
          PharmaCare
        </Link>
        <div className="navbar-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/medicines" className={({ isActive }) => isActive ? 'active' : ''}>Medicines</NavLink>
          <NavLink to="/prescriptions" className={({ isActive }) => isActive ? 'active' : ''}>Prescriptions</NavLink>
          <NavLink to="/profile" className="user-name">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {user?.name}
          </NavLink>
          <button className="btn-logout" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <PharmIcon />
        PharmaCare
      </Link>
      <div className="navbar-links">
        <Link to="/#features">Features</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="btn btn-primary">Get Started</Link>
      </div>
    </nav>
  );
}
