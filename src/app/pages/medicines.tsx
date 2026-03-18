import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Pill, Plus, Edit, Trash2, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MedicinesPage() {
  const userName = "Sarah Johnson";

  // Mock data
  const [medicines] = useState([
    {
      id: 1,
      name: 'Aspirin',
      dosage: 'Morning',
      time: '9:00 AM',
      startDate: '2026-01-01',
      endDate: '2026-06-01',
      expiryDate: '2027-12-31',
      daysUntilExpiry: 695
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: 'Afternoon',
      time: '12:00 PM',
      startDate: '2026-01-15',
      endDate: '2026-07-15',
      expiryDate: '2026-03-01',
      daysUntilExpiry: 21
    },
    {
      id: 3,
      name: 'Blood Pressure Med',
      dosage: 'Evening',
      time: '6:00 PM',
      startDate: '2025-12-01',
      endDate: '2026-12-01',
      expiryDate: '2026-02-15',
      daysUntilExpiry: 7
    },
    {
      id: 4,
      name: 'Thyroid Medication',
      dosage: 'Morning',
      time: '7:00 AM',
      startDate: '2026-01-01',
      endDate: '2027-01-01',
      expiryDate: '2028-01-01',
      daysUntilExpiry: 727
    },
    {
      id: 5,
      name: 'Pain Relief',
      dosage: 'As Needed',
      time: 'When Required',
      startDate: '2026-02-01',
      endDate: '2026-08-01',
      expiryDate: '2026-02-20',
      daysUntilExpiry: 12
    },
  ]);

  const getExpiryStatusColor = (days: number) => {
    if (days <= 7) return 'bg-[#FEE2E2] border-[#EF4444]/30 text-[#EF4444]';
    if (days <= 30) return 'bg-[#FEF3C7] border-[#F59E0B]/30 text-[#F59E0B]';
    return 'bg-[#D1FAE5] border-[#10B981]/30 text-[#10B981]';
  };

  const getDosageBadgeColor = (dosage: string) => {
    if (dosage === 'Morning') return 'bg-[#DBEAFE] text-[#1565C0]';
    if (dosage === 'Afternoon') return 'bg-[#FEF3C7] text-[#D97706]';
    if (dosage === 'Evening') return 'bg-[#E9D5FF] text-[#7C3AED]';
    return 'bg-[#E5E7EB] text-[#64748B]';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navigation isLoggedIn={true} userName={userName} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
                My Medicines
              </h1>
              <p className="text-[#64748B]">Manage and track all your medications</p>
            </div>
            <Link
              to="/add-medicine"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors shadow-lg font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Add Medicine</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Total Medicines</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{medicines.length}</p>
                </div>
                <div className="bg-[#E3F2FD] p-3 rounded-lg">
                  <Pill className="w-6 h-6 text-[#1E88E5]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Active Today</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">3</p>
                </div>
                <div className="bg-[#D1FAE5] p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Expiring Soon</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">2</p>
                </div>
                <div className="bg-[#FEF3C7] p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </div>
          </div>

          {/* Medicines List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F7FA] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Medicine Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Dosage Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Expiry Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C3E50]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicines.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-[#F5F7FA] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#E3F2FD] p-2 rounded-lg">
                            <Pill className="w-5 h-5 text-[#1E88E5]" />
                          </div>
                          <span className="font-semibold text-[#2C3E50]">{medicine.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit ${getDosageBadgeColor(medicine.dosage)}`}>
                            {medicine.dosage}
                          </span>
                          <span className="text-sm text-[#64748B] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {medicine.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Start: {new Date(medicine.startDate).toLocaleDateString()}
                          </span>
                          <span>End: {new Date(medicine.endDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-medium text-sm ${getExpiryStatusColor(medicine.daysUntilExpiry)}`}>
                          <AlertTriangle className="w-4 h-4" />
                          <span>{medicine.daysUntilExpiry} days left</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/edit-medicine/${medicine.id}`}
                            className="p-2 text-[#1E88E5] hover:bg-[#E3F2FD] rounded-lg transition-colors"
                            title="Edit Medicine"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            title="Delete Medicine"
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

          {/* Empty State - Show only if no medicines */}
          {medicines.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-[#E3F2FD] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Pill className="w-10 h-10 text-[#1E88E5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                  No Medicines Yet
                </h3>
                <p className="text-[#64748B] mb-6">
                  Start by adding your first medicine to track and manage your medication schedule.
                </p>
                <Link
                  to="/add-medicine"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Medicine</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
