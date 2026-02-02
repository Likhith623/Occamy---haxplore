'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { format, parseISO } from 'date-fns';
import { 
  Clock, 
  MapPin, 
  CheckCircle,
  Calendar,
  Gauge,
  Route
} from 'lucide-react';

export default function AttendanceView() {
  const { user } = useAuth();
  const { attendance, currentAttendance, checkIn, checkOut } = useData();

  const userAttendance = attendance
    .filter(a => a.userId === user?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalDistance = userAttendance.reduce((sum, a) => sum + (a.totalDistance || 0), 0);
  const avgDistance = userAttendance.length > 0 
    ? Math.round(totalDistance / userAttendance.length) 
    : 0;

  const handleCheckIn = () => {
    const mockLocation = { lat: 12.2958, lng: 76.6394 };
    checkIn(mockLocation, 45000);
  };

  const handleCheckOut = () => {
    const mockLocation = { lat: 12.3158, lng: 76.6594 };
    checkOut(mockLocation, 45065);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500">Track your daily check-ins and travel</p>
      </div>

      {/* Today's Status */}
      <div className={`rounded-2xl p-6 ${
        currentAttendance 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
          : 'bg-white border border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className={`text-lg font-semibold ${currentAttendance ? 'text-white' : 'text-gray-900'}`}>
              Today's Status
            </h2>
            <p className={currentAttendance ? 'text-emerald-100' : 'text-gray-500'}>
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
            {currentAttendance && (
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>Checked in at {currentAttendance.checkInTime}</span>
              </div>
            )}
          </div>
          <div>
            {!currentAttendance ? (
              <button
                onClick={handleCheckIn}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
              >
                <Clock size={24} />
                Check In Now
              </button>
            ) : (
              <button
                onClick={handleCheckOut}
                className="flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors shadow-lg"
              >
                <CheckCircle size={24} />
                Check Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="text-blue-600" size={20} />}
          label="Days Logged"
          value={userAttendance.length}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Route className="text-emerald-600" size={20} />}
          label="Total Distance"
          value={`${totalDistance} km`}
          bgColor="bg-emerald-50"
        />
        <StatCard
          icon={<Gauge className="text-purple-600" size={20} />}
          label="Avg Distance/Day"
          value={`${avgDistance} km`}
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={<Clock className="text-orange-600" size={20} />}
          label="This Month"
          value={userAttendance.filter(a => {
            const date = parseISO(a.date);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          }).length}
          bgColor="bg-orange-50"
        />
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Attendance History</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {userAttendance.length > 0 ? (
            userAttendance.map((record) => (
              <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    record.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {record.status === 'completed' ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <Clock className="text-amber-600" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">
                        {format(parseISO(record.date), 'EEEE, MMM d, yyyy')}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        record.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {record.status === 'completed' ? 'Completed' : 'Active'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {record.checkInTime}
                        {record.checkOutTime && ` - ${record.checkOutTime}`}
                      </span>
                      {record.totalDistance && (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <Route size={14} />
                          {record.totalDistance} km
                        </span>
                      )}
                    </div>
                  </div>

                  {record.checkInOdometer && (
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-gray-500">Odometer</p>
                      <p className="text-sm font-medium text-gray-700">
                        {record.checkInOdometer.toLocaleString()}
                        {record.checkOutOdometer && ` → ${record.checkOutOdometer.toLocaleString()}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No attendance records</h3>
              <p className="text-gray-500">Check in to start tracking your daily activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  bgColor 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className={`inline-flex p-2 rounded-lg ${bgColor} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
