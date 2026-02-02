'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  User,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function MeetingsList() {
  const { user } = useAuth();
  const { meetings } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const userMeetings = meetings.filter(m => m.userId === user?.id);
  
  const filteredMeetings = userMeetings.filter(meeting => {
    const matchesSearch = 
      meeting.personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || meeting.category === filterCategory;
    const matchesType = filterType === 'all' || meeting.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'farmer': return 'bg-green-100 text-green-700';
      case 'seller': return 'bg-blue-100 text-blue-700';
      case 'influencer': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === 'farmer' ? '🌾' : category === 'seller' ? '🏪' : '📢';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-500">{userMeetings.length} total meetings</p>
        </div>
        <Link
          href="/dashboard/meetings/new"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
        >
          <Plus size={20} />
          Log Meeting
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="farmer">Farmers</option>
              <option value="seller">Sellers</option>
              <option value="influencer">Influencers</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="one_on_one">One-on-One</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-3">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  meeting.type === 'group' ? 'bg-indigo-100' : 'bg-emerald-100'
                }`}>
                  {meeting.type === 'group' ? <Users size={24} className="text-indigo-600" /> : getCategoryIcon(meeting.category)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {meeting.type === 'group' 
                          ? `Group Meeting (${meeting.attendeeCount} attendees)`
                          : meeting.personName
                        }
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(meeting.category)}`}>
                          {meeting.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {meeting.village}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(meeting.createdAt), 'MMM d, yyyy')}
                    </span>
                    {meeting.businessPotential && (
                      <span className="text-emerald-600 font-medium">
                        📊 {meeting.businessPotential}
                      </span>
                    )}
                  </div>
                  
                  {meeting.notes && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-1">{meeting.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Users className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== 'all' || filterType !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by logging your first meeting'
              }
            </p>
            <Link
              href="/dashboard/meetings/new"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus size={20} />
              Log Meeting
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
