'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  MapPin,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format } from 'date-fns';

export default function FieldOfficerDashboard() {
  const { user } = useAuth();
  const { meetings, samples, sales, attendance, currentAttendance, getStats, checkIn, checkOut } = useData();
  
  const stats = getStats(user?.id);
  const todayAttendance = attendance.find(a => 
    a.userId === user?.id && a.date === format(new Date(), 'yyyy-MM-dd')
  );

  const recentMeetings = meetings
    .filter(m => m.userId === user?.id)
    .slice(0, 5);

  const recentSales = sales
    .filter(s => s.userId === user?.id)
    .slice(0, 5);

  const handleCheckIn = () => {
    // In production, we'd get real GPS coordinates
    const mockLocation = { lat: 12.2958, lng: 76.6394 };
    checkIn(mockLocation, 45000);
  };

  const handleCheckOut = () => {
    const mockLocation = { lat: 12.3158, lng: 76.6594 };
    checkOut(mockLocation, 45065);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-emerald-100 mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <div className="flex gap-3">
            {!currentAttendance ? (
              <button
                onClick={handleCheckIn}
                className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Clock size={20} />
                Check In
              </button>
            ) : (
              <button
                onClick={handleCheckOut}
                className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors"
              >
                <CheckCircle size={20} />
                Check Out
              </button>
            )}
          </div>
        </div>
        {currentAttendance && (
          <div className="mt-4 pt-4 border-t border-emerald-400/30">
            <div className="flex items-center gap-2 text-emerald-100">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span>Checked in at {currentAttendance.checkInTime}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Meetings"
          value={stats.totalMeetings}
          icon={<Users className="text-blue-600" size={24} />}
          bgColor="bg-blue-50"
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Samples Given"
          value={stats.totalSamples}
          icon={<Package className="text-purple-600" size={24} />}
          bgColor="bg-purple-50"
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          title="Total Sales"
          value={`₹${(stats.totalSales / 1000).toFixed(1)}K`}
          icon={<ShoppingCart className="text-emerald-600" size={24} />}
          bgColor="bg-emerald-50"
          trend="+23%"
          trendUp={true}
        />
        <StatCard
          title="Distance"
          value={`${stats.totalDistance} km`}
          icon={<MapPin className="text-orange-600" size={24} />}
          bgColor="bg-orange-50"
          trend="-5%"
          trendUp={false}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard
            href="/dashboard/meetings/new"
            icon={<Users size={24} />}
            title="Log Meeting"
            color="blue"
          />
          <QuickActionCard
            href="/dashboard/samples/new"
            icon={<Package size={24} />}
            title="Add Sample"
            color="purple"
          />
          <QuickActionCard
            href="/dashboard/sales/new"
            icon={<ShoppingCart size={24} />}
            title="Record Sale"
            color="emerald"
          />
          <QuickActionCard
            href="/dashboard/attendance"
            icon={<Calendar size={24} />}
            title="View Attendance"
            color="orange"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Meetings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Meetings</h2>
            <a href="/dashboard/meetings" className="text-emerald-600 text-sm hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentMeetings.length > 0 ? (
              recentMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    meeting.category === 'farmer' ? 'bg-green-100 text-green-600' :
                    meeting.category === 'seller' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <Users size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {meeting.personName || `Group Meeting (${meeting.attendeeCount} people)`}
                    </p>
                    <p className="text-sm text-gray-500">{meeting.village} • {format(new Date(meeting.createdAt), 'MMM d')}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    meeting.category === 'farmer' ? 'bg-green-100 text-green-700' :
                    meeting.category === 'seller' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {meeting.category}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No meetings yet</p>
            )}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
            <a href="/dashboard/sales" className="text-emerald-600 text-sm hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentSales.length > 0 ? (
              recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    sale.mode === 'B2C' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    <ShoppingCart size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{sale.productName}</p>
                    <p className="text-sm text-gray-500">{sale.customerName} • {sale.quantity} units</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{sale.totalAmount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      sale.mode === 'B2C' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {sale.mode}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No sales yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  bgColor, 
  trend, 
  trendUp 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  bgColor: string; 
  trend: string; 
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ 
  href, 
  icon, 
  title, 
  color 
}: { 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  };

  return (
    <a
      href={href}
      className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-colors ${colorClasses[color]}`}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </a>
  );
}
