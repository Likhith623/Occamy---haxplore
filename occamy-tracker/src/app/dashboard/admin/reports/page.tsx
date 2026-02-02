'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { 
  Download,
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  MapPin,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

export default function ReportsPage() {
  const { meetings, samples, sales, attendance, getAllUsers, getStats } = useData();
  const [dateRange, setDateRange] = useState('30days');
  const [selectedState, setSelectedState] = useState('all');

  const users = getAllUsers();
  const stats = getStats();

  // Weekly data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      day: format(date, 'EEE'),
      meetings: meetings.filter(m => m.createdAt.startsWith(dateStr)).length,
      sales: sales.filter(s => s.createdAt.startsWith(dateStr)).reduce((sum, s) => sum + s.totalAmount, 0) / 1000,
      samples: samples.filter(s => s.createdAt.startsWith(dateStr)).length,
    };
  });

  // User performance
  const userPerformance = users.map(user => ({
    name: user.name.split(' ')[0],
    fullName: user.name,
    meetings: meetings.filter(m => m.userId === user.id).length,
    sales: sales.filter(s => s.userId === user.id).reduce((sum, s) => sum + s.totalAmount, 0),
    samples: samples.filter(s => s.userId === user.id).length,
    distance: attendance.filter(a => a.userId === user.id).reduce((sum, a) => sum + (a.totalDistance || 0), 0),
  }));

  // Sales by mode
  const salesByMode = [
    { name: 'B2C', value: stats.b2cSales },
    { name: 'B2B', value: stats.b2bSales },
  ];

  // Meeting categories
  const meetingCategories = [
    { name: 'Farmers', value: meetings.filter(m => m.category === 'farmer').length },
    { name: 'Sellers', value: meetings.filter(m => m.category === 'seller').length },
    { name: 'Influencers', value: meetings.filter(m => m.category === 'influencer').length },
  ];

  // Sample purposes
  const samplePurposes = [
    { name: 'Trial', value: samples.filter(s => s.purpose === 'trial').length },
    { name: 'Demo', value: samples.filter(s => s.purpose === 'demo').length },
    { name: 'Follow-up', value: samples.filter(s => s.purpose === 'follow_up').length },
  ];

  // Top products
  const productSales = sales.reduce((acc, sale) => {
    acc[sale.productName] = (acc[sale.productName] || 0) + sale.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productSales)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Comprehensive analytics and insights</p>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Meetings"
          value={stats.totalMeetings}
          icon={<Users size={20} />}
          color="blue"
        />
        <SummaryCard
          title="Samples Given"
          value={stats.totalSamples}
          icon={<Package size={20} />}
          color="purple"
        />
        <SummaryCard
          title="Total Sales"
          value={`₹${(stats.totalSales / 1000).toFixed(1)}K`}
          icon={<ShoppingCart size={20} />}
          color="emerald"
        />
        <SummaryCard
          title="Distance Traveled"
          value={`${stats.totalDistance} km`}
          icon={<MapPin size={20} />}
          color="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="meetings" stroke="#3b82f6" strokeWidth={2} name="Meetings" />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales (K)" />
              <Line type="monotone" dataKey="samples" stroke="#8b5cf6" strokeWidth={2} name="Samples" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Mode */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Distribution (B2C vs B2B)</h3>
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
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {salesByMode.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
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

      {/* User Performance Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Team Member</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Meetings</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Samples</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Distance</th>
              </tr>
            </thead>
            <tbody>
              {userPerformance.map((user) => (
                <tr key={user.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium text-sm">
                        {user.fullName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">{user.meetings}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{user.samples}</td>
                  <td className="py-3 px-4 text-right font-medium text-emerald-600">₹{user.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{user.distance} km</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Total</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {userPerformance.reduce((sum, u) => sum + u.meetings, 0)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {userPerformance.reduce((sum, u) => sum + u.samples, 0)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-emerald-600">
                  ₹{userPerformance.reduce((sum, u) => sum + u.sales, 0).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {userPerformance.reduce((sum, u) => sum + u.distance, 0)} km
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meeting Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meetings by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={meetingCategories}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {meetingCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sample Purposes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Samples by Purpose</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={samplePurposes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Sales</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(product.amount / topProducts[0].amount) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-600">
                  ₹{(product.amount / 1000).toFixed(1)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ 
  title, 
  value, 
  icon, 
  color 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color: 'blue' | 'purple' | 'emerald' | 'orange';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className={`inline-flex p-3 rounded-xl ${colorClasses[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );
}
