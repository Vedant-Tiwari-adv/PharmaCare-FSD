import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Pill, Check, X, Clock } from 'lucide-react';

export function ReminderNotificationPage() {
  const userName = "Sarah Johnson";

  // Mock reminder
  const reminder = {
    medicineName: 'Blood Pressure Medication',
    dosage: '1 tablet',
    time: '6:00 PM',
    instructions: 'Take with food and a full glass of water'
  };

  const handleMarkAsTaken = () => {
    // In a real app, mark medicine as taken
    alert('Medicine marked as taken!');
  };

  const handleSnooze = () => {
    // In a real app, snooze the reminder
    alert('Reminder snoozed for 10 minutes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Reminder Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1E88E5] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] p-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                <Pill className="w-10 h-10 text-[#1E88E5]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Time for Your Medicine
              </h2>
              <p className="text-white/90 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{reminder.time}</span>
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">
                  {reminder.medicineName}
                </h3>
                <p className="text-lg text-[#64748B]">
                  Dosage: {reminder.dosage}
                </p>
              </div>

              {/* Instructions Box */}
              <div className="bg-[#E3F2FD] border border-[#1E88E5]/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-[#1565C0] mb-2">Instructions:</p>
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  {reminder.instructions}
                </p>
              </div>

              {/* Friendly Message */}
              <div className="text-center mb-6">
                <p className="text-[#64748B] leading-relaxed">
                  Taking your medicine on time helps maintain your health. Please take it now if you haven't already.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleMarkAsTaken}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-semibold shadow-lg"
                >
                  <Check className="w-5 h-5" />
                  <span>I've Taken It</span>
                </button>
                
                <button
                  onClick={handleSnooze}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#64748B] border-2 border-gray-300 rounded-lg hover:bg-[#F5F7FA] transition-colors font-semibold"
                >
                  <Clock className="w-5 h-5" />
                  <span>Remind Me in 10 Minutes</span>
                </button>

                <button className="w-full flex items-center justify-center gap-2 py-3 text-[#64748B] hover:text-[#EF4444] transition-colors">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Dismiss</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              This is a gentle reminder to help you maintain your health routine
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
