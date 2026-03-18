import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Pill, Calendar, Clock } from 'lucide-react';

export function AddMedicinePage() {
  const navigate = useNavigate();
  const userName = "Sarah Johnson";

  const [formData, setFormData] = useState({
    medicineName: '',
    dosageTime: 'Morning',
    customTime: '09:00',
    startDate: '',
    endDate: '',
    expiryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save the medicine here
    navigate('/medicines');
  };

  const handleCancel = () => {
    navigate('/medicines');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
              Add New Medicine
            </h1>
            <p className="text-[#64748B]">Fill in the details to add a medicine to your list</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Medicine Name */}
              <div>
                <label htmlFor="medicineName" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Medicine Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Pill className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="text"
                    id="medicineName"
                    required
                    value={formData.medicineName}
                    onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Aspirin, Vitamin D"
                  />
                </div>
                <p className="mt-1 text-sm text-[#64748B]">Enter the full name of the medicine</p>
              </div>

              {/* Dosage Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-3">
                  Dosage Time *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, dosageTime: time })}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                        formData.dosageTime === time
                          ? 'bg-[#1E88E5] text-white border-[#1E88E5]'
                          : 'bg-white text-[#64748B] border-gray-300 hover:border-[#1E88E5]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Time */}
              <div>
                <label htmlFor="customTime" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Specific Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="time"
                    id="customTime"
                    required
                    value={formData.customTime}
                    onChange={(e) => setFormData({ ...formData, customTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="mt-1 text-sm text-[#64748B]">Select the exact time for reminder</p>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-[#64748B]" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="endDate" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-[#64748B]" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Expiry Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-[#64748B]" />
                  </div>
                  <input
                    type="date"
                    id="expiryDate"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="mt-1 text-sm text-[#64748B]">We'll alert you before the medicine expires</p>
              </div>

              {/* Info Box */}
              <div className="bg-[#E3F2FD] border border-[#1E88E5]/20 rounded-lg p-4">
                <p className="text-sm text-[#1565C0]">
                  <strong>Note:</strong> You will receive reminders at the specified time. Make sure to enable notifications for best experience.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold shadow-lg"
                >
                  Save Medicine
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3.5 bg-white text-[#64748B] border-2 border-gray-300 rounded-lg hover:bg-[#F5F7FA] transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Helpful Tips */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-[#2C3E50] mb-3">Helpful Tips</h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Double-check the medicine name to avoid confusion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Set reminders at least 5-10 minutes before your usual routine</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Always check the expiry date on the medicine package</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Keep your medicine schedule up to date</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
