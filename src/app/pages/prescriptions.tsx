import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { FileText, Upload, Download, Eye, Trash2, Calendar } from 'lucide-react';

export function PrescriptionsPage() {
  const userName = "Sarah Johnson";

  // Mock data
  const [prescriptions] = useState([
    {
      id: 1,
      fileName: 'Dr_Smith_Prescription_Jan2026.pdf',
      doctorName: 'Dr. John Smith',
      uploadDate: '2026-01-15',
      fileSize: '245 KB',
      prescriptionDate: '2026-01-10'
    },
    {
      id: 2,
      fileName: 'Blood_Pressure_Medication.pdf',
      doctorName: 'Dr. Sarah Wilson',
      uploadDate: '2025-12-20',
      fileSize: '189 KB',
      prescriptionDate: '2025-12-18'
    },
    {
      id: 3,
      fileName: 'Vitamin_D_Prescription.pdf',
      doctorName: 'Dr. John Smith',
      uploadDate: '2026-01-05',
      fileSize: '312 KB',
      prescriptionDate: '2026-01-03'
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, handle file upload here
      alert(`File "${files[0].name}" ready to upload`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
                My Prescriptions
              </h1>
              <p className="text-[#64748B]">Securely store and access your medical prescriptions</p>
            </div>
            <label className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors shadow-lg font-semibold cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Upload Prescription</span>
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Total Prescriptions</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{prescriptions.length}</p>
                </div>
                <div className="bg-[#E3F2FD] p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-[#1E88E5]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">This Month</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">2</p>
                </div>
                <div className="bg-[#D1FAE5] p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Storage Used</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">746 KB</p>
                </div>
                <div className="bg-[#FEF3C7] p-3 rounded-lg">
                  <Upload className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Instructions */}
          <div className="bg-gradient-to-r from-[#E3F2FD] to-white border border-[#1E88E5]/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#1E88E5] p-3 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Keep Your Prescriptions Safe</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                  Upload your doctor's prescriptions here to access them anytime. Your files are encrypted and stored securely.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-white text-[#1E88E5] rounded-full border border-[#1E88E5]/30">
                    Accepts: PDF, JPG, PNG
                  </span>
                  <span className="px-3 py-1 bg-white text-[#1E88E5] rounded-full border border-[#1E88E5]/30">
                    Max size: 5 MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F7FA] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      File Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Prescription Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Upload Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id} className="hover:bg-[#F5F7FA] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#E3F2FD] p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-[#1E88E5]" />
                          </div>
                          <span className="font-medium text-[#2C3E50] max-w-xs truncate">
                            {prescription.fileName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#64748B]">{prescription.doctorName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-[#64748B]">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(prescription.prescriptionDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#64748B]">
                          {new Date(prescription.uploadDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#64748B]">{prescription.fileSize}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-[#1E88E5] hover:bg-[#E3F2FD] rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-[#10B981] hover:bg-[#D1FAE5] rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State - Show only if no prescriptions */}
          {prescriptions.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-[#E3F2FD] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-[#1E88E5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                  No Prescriptions Yet
                </h3>
                <p className="text-[#64748B] mb-6">
                  Upload your first prescription to keep all your medical documents in one secure place.
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <span>Upload Your First Prescription</span>
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1E88E5]" />
              Security & Privacy
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span>All prescriptions are encrypted and stored securely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span>Only you can access your uploaded files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span>Files are backed up regularly to prevent data loss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-0.5">✓</span>
                <span>We never share your medical information with third parties</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
