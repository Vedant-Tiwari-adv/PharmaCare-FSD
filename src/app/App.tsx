import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { DashboardPage } from './pages/dashboard';
import { MedicinesPage } from './pages/medicines';
import { AddMedicinePage } from './pages/add-medicine';
import { ReminderNotificationPage } from './pages/reminder-notification';
import { ExpiryAlertsPage } from './pages/expiry-alerts';
import { PrescriptionsPage } from './pages/prescriptions';
import { ProfilePage } from './pages/profile';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (In a real app, these would be protected by authentication) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/add-medicine" element={<AddMedicinePage />} />
        <Route path="/edit-medicine/:id" element={<AddMedicinePage />} />
        <Route path="/reminder" element={<ReminderNotificationPage />} />
        <Route path="/expiry-alerts" element={<ExpiryAlertsPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
