'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { SamplePurpose, MeetingCategory } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  Package,
  Save,
  Loader2,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SampleForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { addSample, products } = useData();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientType: 'farmer' as MeetingCategory,
    productName: '',
    quantity: 1,
    unit: 'kg',
    purpose: 'trial' as SamplePurpose,
    village: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addSample({
      userId: user.id,
      recipientName: formData.recipientName,
      recipientType: formData.recipientType,
      productName: formData.productName,
      quantity: formData.quantity,
      unit: formData.unit,
      purpose: formData.purpose,
      village: formData.village,
      state: user.state,
      district: user.district,
      latitude: 12.2958 + (Math.random() - 0.5) * 0.1,
      longitude: 76.6394 + (Math.random() - 0.5) * 0.1,
      notes: formData.notes || undefined,
    });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      router.push('/dashboard/samples');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sample Recorded!</h2>
          <p className="text-gray-500">Redirecting to samples list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/samples"
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Record Sample Distribution</h1>
          <p className="text-gray-500">Track sample given to farmer/seller</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Recipient Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Name *
            </label>
            <input
              type="text"
              required
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Type *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['farmer', 'seller', 'influencer'] as MeetingCategory[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, recipientType: type })}
                  className={`p-3 rounded-xl border-2 transition-all capitalize ${
                    formData.recipientType === type
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <Package className="text-purple-600" size={20} />
            <h3 className="font-semibold text-gray-900">Product Details</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product *
            </label>
            <select
              required
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="0.1"
                step="0.1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="packets">Packets</option>
                <option value="units">Units</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'trial', label: 'Trial', icon: '🧪' },
                { value: 'demo', label: 'Demo', icon: '📋' },
                { value: 'follow_up', label: 'Follow-up', icon: '🔄' },
              ] as const).map((purpose) => (
                <button
                  key={purpose.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, purpose: purpose.value })}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    formData.purpose === purpose.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{purpose.icon}</span>
                  <span className="text-sm">{purpose.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-emerald-600" size={20} />
            <h3 className="font-semibold text-gray-900">Location</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Village / Location *
            </label>
            <input
              type="text"
              required
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter village name"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
            <MapPin size={16} />
            <span>GPS location will be auto-captured</span>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            rows={3}
            placeholder="Add any notes about this sample..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Record Sample
            </>
          )}
        </button>
      </form>
    </div>
  );
}
