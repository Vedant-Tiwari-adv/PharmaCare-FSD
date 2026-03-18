import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { User, Mail, Lock, Bell, Shield, Save } from 'lucide-react';

export function ProfilePage() {
  const userName = "Sarah Johnson";

  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567'
  });

  const [notifications, setNotifications] = useState({
    medicineReminders: true,
    expiryAlerts: true,
    weeklyReport: false,
    emailNotifications: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, update profile here
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // In a real app, change password here
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
              Profile & Settings
            </h1>
            <p className="text-[#64748B]">Manage your account and preferences</p>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#E3F2FD] p-2 rounded-lg">
                <User className="w-5 h-5 text-[#1E88E5]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Personal Information</h2>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FEF3C7] p-2 rounded-lg">
                <Lock className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-5">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Change Password Button */}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-white rounded-lg hover:bg-[#D97706] transition-colors font-semibold"
              >
                <Lock className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D1FAE5] p-2 rounded-lg">
                <Bell className="w-5 h-5 text-[#10B981]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              {/* Medicine Reminders */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-[#2C3E50]">Medicine Reminders</p>
                  <p className="text-sm text-[#64748B]">Get notified when it's time to take your medicine</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.medicineReminders}
                    onChange={(e) => setNotifications({ ...notifications, medicineReminders: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E88E5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E88E5]"></div>
                </label>
              </div>

              {/* Expiry Alerts */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-[#2C3E50]">Expiry Alerts</p>
                  <p className="text-sm text-[#64748B]">Receive alerts before medicines expire</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.expiryAlerts}
                    onChange={(e) => setNotifications({ ...notifications, expiryAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E88E5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E88E5]"></div>
                </label>
              </div>

              {/* Weekly Report */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-[#2C3E50]">Weekly Report</p>
                  <p className="text-sm text-[#64748B]">Get a summary of your medicine schedule every week</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E88E5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E88E5]"></div>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-[#2C3E50]">Email Notifications</p>
                  <p className="text-sm text-[#64748B]">Receive important updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E88E5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E88E5]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-gradient-to-r from-[#E3F2FD] to-white border border-[#1E88E5]/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#1E88E5] p-3 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Account Security Tips</h3>
                <ul className="space-y-1.5 text-sm text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">•</span>
                    <span>Use a strong, unique password for your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">•</span>
                    <span>Change your password regularly (every 3-6 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">•</span>
                    <span>Never share your password with anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">•</span>
                    <span>Enable all important notifications to stay informed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
