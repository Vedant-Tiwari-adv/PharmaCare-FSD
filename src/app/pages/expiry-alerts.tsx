import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { AlertTriangle, Pill, Calendar, ShoppingCart } from 'lucide-react';

export function ExpiryAlertsPage() {
  const userName = "Sarah Johnson";

  // Mock data - medicines nearing expiry
  const expiringMedicines = [
    {
      id: 1,
      name: 'Blood Pressure Medication',
      expiryDate: '2026-02-15',
      daysLeft: 7,
      quantity: '15 tablets',
      severity: 'critical'
    },
    {
      id: 2,
      name: 'Pain Relief Gel',
      expiryDate: '2026-02-20',
      daysLeft: 12,
      quantity: '1 tube',
      severity: 'warning'
    },
    {
      id: 3,
      name: 'Vitamin D',
      expiryDate: '2026-03-01',
      daysLeft: 21,
      quantity: '30 capsules',
      severity: 'warning'
    },
    {
      id: 4,
      name: 'Eye Drops',
      expiryDate: '2026-03-10',
      daysLeft: 30,
      quantity: '1 bottle',
      severity: 'info'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-[#FEE2E2]',
          border: 'border-[#EF4444]/30',
          icon: 'bg-[#EF4444]',
          text: 'text-[#EF4444]'
        };
      case 'warning':
        return {
          bg: 'bg-[#FEF3C7]',
          border: 'border-[#F59E0B]/30',
          icon: 'bg-[#F59E0B]',
          text: 'text-[#F59E0B]'
        };
      default:
        return {
          bg: 'bg-[#E3F2FD]',
          border: 'border-[#1E88E5]/30',
          icon: 'bg-[#1E88E5]',
          text: 'text-[#1E88E5]'
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
              Expiry Alerts
            </h1>
            <p className="text-[#64748B]">Medicines that will expire soon - take action to stay safe</p>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border-2 border-[#EF4444]/30 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Expiring This Week</p>
                  <p className="text-3xl font-bold text-[#EF4444]">1</p>
                </div>
                <div className="bg-[#FEE2E2] p-3 rounded-lg">
                  <AlertTriangle className="w-7 h-7 text-[#EF4444]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border-2 border-[#F59E0B]/30 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">This Month</p>
                  <p className="text-3xl font-bold text-[#F59E0B]">2</p>
                </div>
                <div className="bg-[#FEF3C7] p-3 rounded-lg">
                  <Calendar className="w-7 h-7 text-[#F59E0B]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border-2 border-[#1E88E5]/30 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Total Tracked</p>
                  <p className="text-3xl font-bold text-[#1E88E5]">4</p>
                </div>
                <div className="bg-[#E3F2FD] p-3 rounded-lg">
                  <Pill className="w-7 h-7 text-[#1E88E5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Important Health Notice</h3>
                <p className="text-white/90 leading-relaxed">
                  Using expired medicines can be harmful to your health. Please check the medicines listed below and replace them before they expire. Always consult your doctor before taking any medication.
                </p>
              </div>
            </div>
          </div>

          {/* Medicines List */}
          <div className="space-y-4">
            {expiringMedicines.map((medicine) => {
              const colors = getSeverityColor(medicine.severity);
              return (
                <div
                  key={medicine.id}
                  className={`${colors.bg} border ${colors.border} rounded-xl p-6 shadow-sm`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Medicine Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${colors.icon} p-3 rounded-lg flex-shrink-0`}>
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#2C3E50] mb-1">
                          {medicine.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                          </span>
                          <span>Quantity: {medicine.quantity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Days Left & Action */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {medicine.daysLeft}
                        </div>
                        <div className="text-sm text-[#64748B]">days left</div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#1E88E5] rounded-lg border-2 border-[#1E88E5] hover:bg-[#E3F2FD] transition-colors font-semibold whitespace-nowrap">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Warning Message */}
                  {medicine.daysLeft <= 7 && (
                    <div className="mt-4 pt-4 border-t border-[#EF4444]/20">
                      <p className={`text-sm font-semibold ${colors.text}`}>
                        ⚠️ Critical: This medicine expires very soon. Please replace it immediately.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety Tips */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#1E88E5]" />
              Safety Tips for Medicine Expiry
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Never use medicines after their expiry date - they may be ineffective or harmful</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Store medicines in a cool, dry place away from direct sunlight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Dispose of expired medicines properly - don't throw them in regular trash</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Check medicine packaging regularly, even before the expiry date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1E88E5] mt-0.5">•</span>
                <span>Consult your doctor or pharmacist if you have questions about expired medicines</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
