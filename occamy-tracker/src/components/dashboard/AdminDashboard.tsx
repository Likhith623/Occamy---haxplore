'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  MapPin,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

export default function AdminDashboard() {
  const { meetings, samples, sales, attendance, getStats, getAllUsers } = useData();
  const [dateRange, setDateRange] = useState('30days');
  const [selectedState, setSelectedState] = useState('all');

  const stats = getStats();
  const users = getAllUsers();

  // Prepare chart data
  const salesByMode = [
    { name: 'B2C Sales', value: stats.b2cSales },
    { name: 'B2B Sales', value: stats.b2bSales },
  ];

  const meetingsByCategory = [
    { name: 'Farmers', value: meetings.filter(m => m.category === 'farmer').length },
    { name: 'Sellers', value: meetings.filter(m => m.category === 'seller').length },
    { name: 'Influencers', value: meetings.filter(m => m.category === 'influencer').length },
  ];

  // Daily activity for line chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      date: format(date, 'MMM dd'),
      meetings: meetings.filter(m => m.createdAt.startsWith(dateStr)).length,
      sales: sales.filter(s => s.createdAt.startsWith(dateStr)).length,
      samples: samples.filter(s => s.createdAt.startsWith(dateStr)).length,
    };
  });

  // Performance by user
  const userPerformance = users.map(user => ({
    name: user.name.split(' ')[0],
    meetings: meetings.filter(m => m.userId === user.id).length,
    sales: sales.filter(s => s.userId === user.id).reduce((sum, s) => sum + s.totalAmount, 0) / 1000,
    distance: attendance.filter(a => a.userId === user.id).reduce((sum, a) => sum + (a.totalDistance || 0), 0),
  }));

  // State-wise data
  const stateData = [
    { state: 'Karnataka', meetings: 45, sales: 23500, samples: 12 },
    { state: 'Gujarat', meetings: 32, sales: 18200, samples: 8 },
    { state: 'Maharashtra', meetings: 28, sales: 15800, samples: 10 },
    { state: 'Tamil Nadu', meetings: 22, sales: 12400, samples: 6 },
  ];

  // Village-wise activity
  const villageActivity = [
    { village: 'Tumkur', meetings: 12, farmers: 45 },
    { village: 'Hassan', meetings: 10, farmers: 38 },
    { village: 'Mandya', meetings: 8, farmers: 32 },
    { village: 'Shimoga', meetings: 7, farmers: 28 },
    { village: 'Chitradurga', meetings: 6, farmers: 22 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="thisMonth">This Month</option>
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All States</option>
            <option value="karnataka">Karnataka</option>
            <option value="gujarat">Gujarat</option>
            <option value="maharashtra">Maharashtra</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Meetings"
          value={stats.totalMeetings}
          icon={<Users className="text-blue-600" size={24} />}
          bgColor="bg-blue-50"
          change="+18%"
          positive={true}
        />
        <MetricCard
          title="Farmers Contacted"
          value={stats.farmersContacted}
          icon={<TrendingUp className="text-green-600" size={24} />}
          bgColor="bg-green-50"
          change="+24%"
          positive={true}
          subtitle={`${stats.farmersConverted} converted`}
        />
        <MetricCard
          title="Total Sales"
          value={`₹${(stats.totalSales / 1000).toFixed(1)}K`}
          icon={<ShoppingCart className="text-emerald-600" size={24} />}
          bgColor="bg-emerald-50"
          change="+32%"
          positive={true}
        />
        <MetricCard
          title="Total Distance"
          value={`${stats.totalDistance} km`}
          icon={<MapPin className="text-orange-600" size={24} />}
          bgColor="bg-orange-50"
          change="+12%"
          positive={true}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="Meetings" />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#10b981" fill="#6ee7b7" name="Sales" />
              <Area type="monotone" dataKey="samples" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" name="Samples" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByMode}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {salesByMode.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-600">B2C: ₹{stats.b2cSales.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-600">B2B: ₹{stats.b2bSales.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="meetings" fill="#3b82f6" name="Meetings" radius={[0, 4, 4, 0]} />
              <Bar dataKey="sales" fill="#10b981" name="Sales (K)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Meeting Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meetings by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={meetingsByCategory}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {meetingsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* State & Village Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* State-wise Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">State-wise Performance</h3>
          <div className="space-y-4">
            {stateData.map((state, index) => (
              <div key={state.state} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-700">{state.state}</div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${(state.sales / 25000) * 100}%` }}
                    >
                      <span className="text-xs text-white font-medium">₹{(state.sales/1000).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-20 text-right">
                  {state.meetings} meets
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Village Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Villages by Activity</h3>
          <div className="space-y-3">
            {villageActivity.map((village, index) => (
              <div key={village.village} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{village.village}</p>
                  <p className="text-sm text-gray-500">{village.farmers} farmers reached</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">{village.meetings}</p>
                  <p className="text-xs text-gray-500">meetings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <FunnelStep 
            label="Farmers Contacted" 
            value={stats.farmersContacted} 
            percentage={100} 
            color="bg-blue-500"
          />
          <div className="hidden md:block text-gray-300">→</div>
          <FunnelStep 
            label="Samples Given" 
            value={stats.totalSamples} 
            percentage={Math.round((stats.totalSamples / stats.farmersContacted) * 100)} 
            color="bg-purple-500"
          />
          <div className="hidden md:block text-gray-300">→</div>
          <FunnelStep 
            label="Converted to Sales" 
            value={stats.farmersConverted} 
            percentage={Math.round((stats.farmersConverted / stats.farmersContacted) * 100)} 
            color="bg-emerald-500"
          />
          <div className="hidden md:block text-gray-300">→</div>
          <FunnelStep 
            label="Repeat Orders" 
            value={sales.filter(s => s.isRepeatOrder).length} 
            percentage={Math.round((sales.filter(s => s.isRepeatOrder).length / stats.farmersConverted) * 100) || 0} 
            color="bg-amber-500"
          />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Activity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Details</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
              </tr>
            </thead>
            <tbody>
              {[...meetings, ...sales].slice(0, 10).map((activity, index) => {
                const isMeeting = 'type' in activity;
                const user = users.find(u => u.id === activity.userId);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium">
                          {user?.name.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900">{user?.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isMeeting ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isMeeting ? 'Meeting' : 'Sale'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{activity.village}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {isMeeting 
                        ? `${(activity as any).personName || 'Group'} - ${(activity as any).category}`
                        : `${(activity as any).productName} - ₹${(activity as any).totalAmount}`
                      }
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {format(new Date(activity.createdAt), 'MMM d, h:mm a')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon, 
  bgColor, 
  change, 
  positive,
  subtitle
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  bgColor: string; 
  change: string; 
  positive: boolean;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-emerald-600 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function FunnelStep({ 
  label, 
  value, 
  percentage, 
  color 
}: { 
  label: string; 
  value: number; 
  percentage: number; 
  color: string;
}) {
  return (
    <div className="flex-1 min-w-[150px] max-w-[200px]">
      <div className="text-center">
        <div className={`${color} text-white rounded-xl py-4 px-6 mb-2`}>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm opacity-90">{percentage}%</p>
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
