'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  Package,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function SamplesList() {
  const { user } = useAuth();
  const { samples } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPurpose, setFilterPurpose] = useState('all');

  const userSamples = samples.filter(s => s.userId === user?.id);
  
  const filteredSamples = userSamples.filter(sample => {
    const matchesSearch = 
      sample.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPurpose = filterPurpose === 'all' || sample.purpose === filterPurpose;
    
    return matchesSearch && matchesPurpose;
  });

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'trial': return 'bg-blue-100 text-blue-700';
      case 'demo': return 'bg-purple-100 text-purple-700';
      case 'follow_up': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPurposeIcon = (purpose: string) => {
    return purpose === 'trial' ? '🧪' : purpose === 'demo' ? '📋' : '🔄';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sample Distribution</h1>
          <p className="text-gray-500">{userSamples.length} total samples given</p>
        </div>
        <Link
          href="/dashboard/samples/new"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
        >
          <Plus size={20} />
          Add Sample
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, product, or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterPurpose}
            onChange={(e) => setFilterPurpose(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Purposes</option>
            <option value="trial">Trial</option>
            <option value="demo">Demo</option>
            <option value="follow_up">Follow-up</option>
          </select>
        </div>
      </div>

      {/* Samples List */}
      <div className="space-y-3">
        {filteredSamples.length > 0 ? (
          filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Package size={24} className="text-purple-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{sample.productName}</h3>
                      <p className="text-sm text-gray-600">To: {sample.recipientName}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPurposeColor(sample.purpose)}`}>
                          {getPurposeIcon(sample.purpose)} {sample.purpose.replace('_', '-')}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {sample.village}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-emerald-600">
                        {sample.quantity} {sample.unit}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{sample.recipientType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(sample.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No samples found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterPurpose !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by recording your first sample'
              }
            </p>
            <Link
              href="/dashboard/samples/new"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus size={20} />
              Add Sample
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
