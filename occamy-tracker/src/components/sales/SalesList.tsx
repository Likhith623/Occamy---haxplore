'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  ShoppingCart,
  MapPin,
  Calendar,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function SalesList() {
  const { user } = useAuth();
  const { sales } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const userSales = sales.filter(s => s.userId === user?.id);
  
  const filteredSales = userSales.filter(sale => {
    const matchesSearch = 
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMode = filterMode === 'all' || sale.mode === filterMode;
    
    return matchesSearch && matchesMode;
  });

  const totalB2C = userSales.filter(s => s.mode === 'B2C').reduce((sum, s) => sum + s.totalAmount, 0);
  const totalB2B = userSales.filter(s => s.mode === 'B2B').reduce((sum, s) => sum + s.totalAmount, 0);
  const totalSales = totalB2C + totalB2B;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-500">₹{totalSales.toLocaleString()} total sales</p>
        </div>
        <Link
          href="/dashboard/sales/new"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
        >
          <Plus size={20} />
          Record Sale
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="text-gray-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-900">₹{totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShoppingCart className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">B2C</p>
              <p className="text-lg font-bold text-emerald-600">₹{totalB2C.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ShoppingCart className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">B2B</p>
              <p className="text-lg font-bold text-orange-600">₹{totalB2B.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by customer, product, or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="B2C">B2C Only</option>
            <option value="B2B">B2B Only</option>
          </select>
        </div>
      </div>

      {/* Sales List */}
      <div className="space-y-3">
        {filteredSales.length > 0 ? (
          filteredSales.map((sale) => (
            <div
              key={sale.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  sale.mode === 'B2C' ? 'bg-emerald-100' : 'bg-orange-100'
                }`}>
                  <ShoppingCart size={24} className={
                    sale.mode === 'B2C' ? 'text-emerald-600' : 'text-orange-600'
                  } />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{sale.productName}</h3>
                      <p className="text-sm text-gray-600">{sale.customerName} • {sale.customerType}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          sale.mode === 'B2C' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {sale.mode}
                        </span>
                        {sale.isRepeatOrder && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                            <RefreshCw size={10} />
                            Repeat
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {sale.village}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-gray-900">₹{sale.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{sale.quantity} × ₹{sale.unitPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(sale.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{sale.packSize}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sales found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterMode !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by recording your first sale'
              }
            </p>
            <Link
              href="/dashboard/sales/new"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus size={20} />
              Record Sale
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
