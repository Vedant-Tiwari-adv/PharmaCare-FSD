import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, create account here
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-[#F5F7FA] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-[#1E88E5] p-3 rounded-lg">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#2C3E50]">PharmaCare</span>
          </div>
          <h1 className="text-2xl font-bold text-[#2C3E50] mb-2">Create Your Account</h1>
          <p className="text-[#64748B]">Start managing your medicines safely</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#64748B]" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-[#EF4444]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-[#EF4444]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#64748B]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-[#EF4444]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all`}
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#64748B] hover:text-[#1E88E5]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#64748B] hover:text-[#1E88E5]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#64748B]" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-[#EF4444]' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#64748B] hover:text-[#1E88E5]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#64748B] hover:text-[#1E88E5]" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#E3F2FD] p-4 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#64748B]">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold shadow-lg"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#64748B]">or</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-[#64748B]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#1E88E5] hover:text-[#1565C0] font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-[#64748B] hover:text-[#1E88E5]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
