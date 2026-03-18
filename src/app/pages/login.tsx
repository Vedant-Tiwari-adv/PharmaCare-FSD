import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/page-transition';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials here
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-[#F5F7FA] px-4 py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-[#1E88E5]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-[#10B981]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-[#1E88E5] p-3 rounded-lg">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#2C3E50]">PharmaCare</span>
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold text-[#2C3E50] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className="text-[#64748B]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Login to manage your medicines
            </motion.p>
          </motion.div>

          {/* Login Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
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
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your password"
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
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm text-[#1E88E5] hover:text-[#1565C0] font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold shadow-lg"
              >
                Login
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

              {/* Register Link */}
              <div className="text-center">
                <p className="text-[#64748B]">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-[#1E88E5] hover:text-[#1565C0] font-semibold">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-[#64748B] hover:text-[#1E88E5]">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}