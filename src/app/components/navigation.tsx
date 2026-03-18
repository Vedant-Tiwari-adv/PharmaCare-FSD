import { Link, useNavigate } from 'react-router-dom';
import { Pill, LogOut, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export function Navigation({ isLoggedIn = false, userName }: NavigationProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/');
  };

  return (
    <motion.nav 
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="bg-[#1E88E5] p-2 rounded-lg group-hover:bg-[#1565C0] transition-colors">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#2C3E50]">PharmaCare</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/dashboard" 
                    className="text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/medicines" 
                    className="text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  >
                    Medicines
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/prescriptions" 
                    className="text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  >
                    Prescriptions
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{userName || 'Profile'}</span>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] text-[#64748B] rounded-lg hover:bg-[#E3F2FD] hover:text-[#1E88E5] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.a 
                  href="#features" 
                  className="text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Features
                </motion.a>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/login" 
                    className="text-[#64748B] hover:text-[#1E88E5] transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/register" 
                    className="px-5 py-2.5 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}