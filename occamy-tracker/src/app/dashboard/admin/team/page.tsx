'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { 
  Search, 
  Users,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Route,
  ShoppingCart
} from 'lucide-react';

export default function TeamPage() {
  const { getAllUsers, meetings, sales, attendance, getStats } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const users = getAllUsers();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserStats = (userId: string) => {
    const userMeetings = meetings.filter(m => m.userId === userId).length;
    const userSales = sales.filter(s => s.userId === userId).reduce((sum, s) => sum + s.totalAmount, 0);
    const userDistance = attendance.filter(a => a.userId === userId).reduce((sum, a) => sum + (a.totalDistance || 0), 0);
    return { meetings: userMeetings, sales: userSales, distance: userDistance };
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'field_officer': return 'bg-blue-100 text-blue-700';
      case 'distributor': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'field_officer': return 'Field Officer';
      case 'distributor': return 'Distributor';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-500">{users.length} team members</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          const stats = getUserStats(user.id);
          return (
            <div key={user.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${getRoleBadgeColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{user.district}, {user.state}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <Users size={14} />
                    <span className="font-semibold">{stats.meetings}</span>
                  </div>
                  <p className="text-xs text-gray-500">Meetings</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-600">
                    <ShoppingCart size={14} />
                    <span className="font-semibold">₹{(stats.sales / 1000).toFixed(0)}K</span>
                  </div>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-600">
                    <Route size={14} />
                    <span className="font-semibold">{stats.distance}</span>
                  </div>
                  <p className="text-xs text-gray-500">km</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <Users className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-500">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
