import { Link } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Pill, Clock, Bell, FileText, Shield, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/page-transition';
import { BackgroundPattern } from '../components/background-pattern';

export function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
        <Navigation isLoggedIn={false} />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#E3F2FD] to-white py-20 px-4 overflow-hidden relative">
          {/* Background Images with Translucent Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Left side - Pills image */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGlsbHMlMjBwaGFybWFjeXxlbnwxfHx8fDE3NzA2MTI5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt=""
                className="w-full h-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E3F2FD]/80 to-[#E3F2FD]" />
            </motion.div>

            {/* Right side - Healthcare image */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1704895376514-3938531148f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGJvdHRsZXMlMjBjbGVhbnxlbnwxfHx8fDE3NzA2MTI5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt=""
                className="w-full h-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/80 to-white" />
            </motion.div>

            {/* Center overlay to blend */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E3F2FD]/30 via-transparent to-white/50" />
          </div>

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

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-[#2C3E50] leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Never Miss a Dose.<br />
                  Never Use Expired Medicine.
                </motion.h1>
                <motion.p 
                  className="text-lg text-[#64748B] leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  PharmaCare helps you manage medicines, reminders, and prescriptions safely and easily. 
                  Take control of your health with confidence.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link 
                    to="/register"
                    className="px-8 py-4 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-all shadow-lg text-lg font-semibold hover:scale-105 hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/login"
                    className="px-8 py-4 bg-white text-[#1E88E5] rounded-lg border-2 border-[#1E88E5] hover:bg-[#E3F2FD] transition-all text-lg font-semibold hover:scale-105"
                  >
                    Login
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right: Animated Illustration */}
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-[#E3F2FD] rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-[#1E88E5] p-3 rounded-full">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C3E50]">Medicine Reminder</p>
                      <p className="text-sm text-[#64748B]">Aspirin - 9:00 AM</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-[#FEF3C7] rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <motion.div 
                      className="bg-[#F59E0B] p-3 rounded-full"
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Bell className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-[#2C3E50]">Expiry Alert</p>
                      <p className="text-sm text-[#64748B]">Expires in 5 days</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-[#D1FAE5] rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <div className="bg-[#10B981] p-3 rounded-full">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C3E50]">Prescription Saved</p>
                      <p className="text-sm text-[#64748B]">Dr. Smith - Feb 2026</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                Complete Medicine Management
              </h2>
              <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                Everything you need to manage your medicines safely and effectively, all in one place.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#E3F2FD] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1E88E5] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="w-7 h-7 text-[#1E88E5] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Timely Reminders
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Get notified when it's time to take your medicine. Never miss a dose with our reliable reminder system.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#FEF3C7] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#F59E0B] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Bell className="w-7 h-7 text-[#F59E0B] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Expiry Alerts
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Receive alerts before your medicines expire. Stay safe and avoid using expired medications.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#D1FAE5] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10B981] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-7 h-7 text-[#10B981] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Prescription Storage
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Store your prescriptions digitally and access them anytime, anywhere. No more lost papers.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#E3F2FD] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1E88E5] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Pill className="w-7 h-7 text-[#1E88E5] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Medicine Tracking
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Keep track of all your medicines in one organized place. View dosage, timing, and more.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#DBEAFE] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1565C0] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Shield className="w-7 h-7 text-[#1565C0] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Secure & Private
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Your health data is encrypted and secure. We prioritize your privacy and data protection.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-[#FEE2E2] w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#EF4444] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-7 h-7 text-[#EF4444] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  Easy to Use
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Designed for everyone, especially elderly users. Simple, clear, and accessible interface.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-br from-[#1E88E5] to-[#1565C0] relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background shapes */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Take Control of Your Health?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join PharmaCare today and never worry about missing a dose or using expired medicine again.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/register"
                className="inline-block px-8 py-4 bg-white text-[#1E88E5] rounded-lg hover:bg-gray-100 transition-all shadow-lg text-lg font-semibold hover:scale-110 hover:shadow-2xl"
              >
                Create Free Account
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <Footer />
      </div>
    </PageTransition>
  );
}