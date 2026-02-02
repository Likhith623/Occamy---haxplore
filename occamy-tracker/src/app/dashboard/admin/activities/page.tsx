'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { format } from 'date-fns';
import { 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Users,
  Package,
  ShoppingCart,
  Download
} from 'lucide-react';

export default function AllActivitiesPage() {
  const { meetings, samples, sales, getAllUsers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const users = getAllUsers();

  // Combine all activities
  const allActivities = [
    ...meetings.map(m => ({ ...m, activityType: 'meeting' as const })),
    ...samples.map(s => ({ ...s, activityType: 'sample' as const })),
    ...sales.map(s => ({ ...s, activityType: 'sale' as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredActivities = allActivities.filter(activity => {
    const matchesType = filterType === 'all' || activity.activityType === filterType;
    const matchesUser = filterUser === 'all' || activity.userId === filterUser;
    const matchesSearch = 
      activity.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ('personName' in activity && activity.personName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ('customerName' in activity && activity.customerName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ('recipientName' in activity && activity.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesUser && matchesSearch;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users size={18} className="text-blue-600" />;
      case 'sample': return <Package size={18} className="text-purple-600" />;
      case 'sale': return <ShoppingCart size={18} className="text-emerald-600" />;
      default: return null;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-700';
      case 'sample': return 'bg-purple-100 text-purple-700';
      case 'sale': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityDetails = (activity: typeof allActivities[0]) => {
    switch (activity.activityType) {
      case 'meeting':
        return activity.type === 'group' 
          ? `Group meeting with ${activity.attendeeCount} attendees`
          : `Meeting with ${activity.personName}`;
      case 'sample':
        return `${activity.quantity} ${activity.unit} of ${activity.productName} to ${activity.recipientName}`;
      case 'sale':
        return `₹${activity.totalAmount} - ${activity.productName} to ${activity.customerName}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Activities</h1>
          <p className="text-gray-500">{filteredActivities.length} activities found</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="meeting">Meetings</option>
            <option value="sample">Samples</option>
            <option value="sale">Sales</option>
          </select>
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => {
              const user = users.find(u => u.id === activity.userId);
              return (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.activityType === 'meeting' ? 'bg-blue-100' :
                      activity.activityType === 'sample' ? 'bg-purple-100' : 'bg-emerald-100'
                    }`}>
                      {getActivityIcon(activity.activityType)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {getActivityDetails(activity)}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getActivityColor(activity.activityType)}`}>
                              {activity.activityType}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin size={12} />
                              {activity.village}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.role.replace('_', ' ')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(activity.createdAt), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center">
              <Filter className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
