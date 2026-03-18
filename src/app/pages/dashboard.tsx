import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Pill, Clock, AlertTriangle, FileText, Plus, TrendingUp, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/page-transition';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export function DashboardPage() {
  const userName = "Sarah Johnson";

  // Mock data
  const todaysMedicines = [
    { id: 1, name: 'Aspirin', time: '9:00 AM', taken: true, dosage: '100mg' },
    { id: 2, name: 'Vitamin D', time: '12:00 PM', taken: true, dosage: '1000IU' },
    { id: 3, name: 'Blood Pressure Med', time: '6:00 PM', taken: false, dosage: '50mg' },
  ];

  const upcomingReminders = [
    { id: 1, name: 'Aspirin', time: 'Tomorrow, 9:00 AM', type: 'morning' },
    { id: 2, name: 'Insulin', time: 'Tomorrow, 8:00 AM', type: 'morning' },
    { id: 3, name: 'Thyroid Med', time: 'Tomorrow, 7:00 AM', type: 'morning' },
  ];

  const expiringMedicines = [
    { id: 1, name: 'Pain Relief Gel', daysLeft: 5, category: 'Topical' },
    { id: 2, name: 'Eye Drops', daysLeft: 12, category: 'Ophthalmic' },
    { id: 3, name: 'Cough Syrup', daysLeft: 20, category: 'Oral' },
  ];

  // Chart data
  const complianceData = [
    { name: 'Taken', value: 85, color: '#10B981' },
    { name: 'Missed', value: 15, color: '#EF4444' },
  ];

  const weeklyData = [
    { day: 'Mon', taken: 3, missed: 0 },
    { day: 'Tue', taken: 3, missed: 0 },
    { day: 'Wed', taken: 2, missed: 1 },
    { day: 'Thu', taken: 3, missed: 0 },
    { day: 'Fri', taken: 3, missed: 0 },
    { day: 'Sat', taken: 2, missed: 1 },
    { day: 'Sun', taken: 3, missed: 0 },
  ];

  const healthStats = [
    { label: 'Total Medicines', value: '12', icon: Pill, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'This Week', value: '19/21', icon: CheckCircle2, color: 'from-green-500 to-green-600', textColor: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Adherence Rate', value: '85%', icon: TrendingUp, color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Next Refill', value: '5 days', icon: Calendar, color: 'from-orange-500 to-orange-600', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5F7FA] via-[#E3F2FD] to-[#F5F7FA]">
        <Navigation isLoggedIn={true} userName={userName} />

        <main className="flex-1 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section with Gradient */}
            <motion.div 
              className="mb-8 bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
              
              <div className="relative z-10">
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Welcome back, {userName} 👋
                </motion.h1>
                <motion.p 
                  className="text-blue-100 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  You have 1 medicine pending for today. Keep up the great work!
                </motion.p>
              </div>
            </motion.div>

            {/* Health Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {healthStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                      </div>
                      <motion.div 
                        className={`h-2 w-2 rounded-full bg-gradient-to-r ${stat.color}`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Weekly Adherence Chart */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#1E88E5]" />
                  Weekly Adherence
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px' 
                      }}
                    />
                    <Legend />
                    <Bar dataKey="taken" fill="#10B981" radius={[8, 8, 0, 0]} name="Taken" />
                    <Bar dataKey="missed" fill="#EF4444" radius={[8, 8, 0, 0]} name="Missed" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Compliance Pie Chart */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  Overall Compliance
                </h2>
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {complianceData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1E88E5]" />
                    Today's Schedule
                  </h2>
                  <Link 
                    to="/medicines"
                    className="text-sm text-[#1E88E5] hover:text-[#1565C0] font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {todaysMedicines.map((medicine, index) => (
                    <motion.div 
                      key={medicine.id}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        medicine.taken 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                          : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-full ${medicine.taken ? 'bg-green-500' : 'bg-orange-500'}`}>
                          {medicine.taken ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">{medicine.time} • {medicine.dosage}</p>
                        </div>
                      </div>
                      {medicine.taken ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-white px-3 py-1.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          Taken
                        </div>
                      ) : (
                        <motion.button 
                          className="text-sm font-semibold text-white bg-[#1E88E5] px-4 py-1.5 rounded-full hover:bg-[#1565C0] transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Mark Done
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Reminders */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#1565C0]" />
                    Upcoming Reminders
                  </h2>
                  <Link 
                    to="/medicines"
                    className="text-sm text-[#1E88E5] hover:text-[#1565C0] font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder, index) => (
                    <motion.div 
                      key={reminder.id}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 flex items-center gap-3 cursor-pointer transition-all"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="p-2.5 rounded-full bg-blue-500">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{reminder.name}</p>
                        <p className="text-sm text-gray-600">{reminder.time}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Medicines Expiring Soon */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    Expiring Soon
                  </h2>
                  <Link 
                    to="/expiry-alerts"
                    className="text-sm text-[#1E88E5] hover:text-[#1565C0] font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {expiringMedicines.map((medicine, index) => (
                    <motion.div 
                      key={medicine.id}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        medicine.daysLeft <= 7 
                          ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300' 
                          : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:border-yellow-300'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-full ${medicine.daysLeft <= 7 ? 'bg-red-500' : 'bg-orange-500'}`}>
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">{medicine.category} • {medicine.daysLeft} days left</p>
                        </div>
                      </div>
                      <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        medicine.daysLeft <= 7 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {medicine.daysLeft}d
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <Link 
                      to="/add-medicine"
                      className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all border-2 border-blue-200 hover:border-blue-400 group shadow-sm hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-full bg-blue-500 group-hover:bg-white transition-colors">
                        <Plus className="w-5 h-5 text-white group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-white transition-colors">Add New Medicine</p>
                        <p className="text-sm text-gray-600 group-hover:text-blue-100 transition-colors">Create a new medicine entry</p>
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    <Link 
                      to="/prescriptions"
                      className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 transition-all border-2 border-green-200 hover:border-green-400 group shadow-sm hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-full bg-green-500 group-hover:bg-white transition-colors">
                        <FileText className="w-5 h-5 text-white group-hover:text-green-500 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-white transition-colors">Upload Prescription</p>
                        <p className="text-sm text-gray-600 group-hover:text-green-100 transition-colors">Store your prescription safely</p>
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    <Link 
                      to="/medicines"
                      className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 transition-all border-2 border-purple-200 hover:border-purple-400 group shadow-sm hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-full bg-purple-500 group-hover:bg-white transition-colors">
                        <Pill className="w-5 h-5 text-white group-hover:text-purple-500 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-white transition-colors">View All Medicines</p>
                        <p className="text-sm text-gray-600 group-hover:text-purple-100 transition-colors">Manage your medicine list</p>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}