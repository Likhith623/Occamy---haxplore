'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Meeting, MeetingCategory, MeetingType } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Users, 
  Camera,
  Save,
  Loader2,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function MeetingForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { addMeeting } = useData();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'one_on_one' as MeetingType,
    category: 'farmer' as MeetingCategory,
    personName: '',
    contactDetails: '',
    village: '',
    attendeeCount: 1,
    businessPotential: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addMeeting({
      userId: user.id,
      type: formData.type,
      category: formData.category,
      personName: formData.type === 'one_on_one' ? formData.personName : undefined,
      contactDetails: formData.contactDetails || undefined,
      village: formData.village,
      state: user.state,
      district: user.district,
      latitude: 12.2958 + (Math.random() - 0.5) * 0.1,
      longitude: 76.6394 + (Math.random() - 0.5) * 0.1,
      attendeeCount: formData.type === 'group' ? formData.attendeeCount : 1,
      businessPotential: formData.businessPotential || undefined,
      notes: formData.notes || undefined,
      photos: [],
    });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      router.push('/dashboard/meetings');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meeting Logged!</h2>
          <p className="text-gray-500">Redirecting to meetings list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/meetings"
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Log New Meeting</h1>
          <p className="text-gray-500">Record your interaction details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meeting Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Meeting Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'one_on_one' })}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                formData.type === 'one_on_one'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User size={24} />
              <span className="font-medium">One-on-One</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'group' })}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                formData.type === 'group'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users size={24} />
              <span className="font-medium">Group Meeting</span>
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['farmer', 'seller', 'influencer'] as MeetingCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`p-3 rounded-xl border-2 transition-all capitalize ${
                  formData.category === cat
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Person Details (for one-on-one) */}
        {formData.type === 'one_on_one' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-900">Person Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.personName}
                onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter person's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact (Optional)
              </label>
              <input
                type="tel"
                value={formData.contactDetails}
                onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Phone number"
              />
            </div>
          </div>
        )}

        {/* Group Details (for group meeting) */}
        {formData.type === 'group' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Group Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Attendees *
              </label>
              <input
                type="number"
                required
                min="2"
                value={formData.attendeeCount}
                onChange={(e) => setFormData({ ...formData, attendeeCount: parseInt(e.target.value) || 2 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Number of people"
              />
            </div>
          </div>
        )}

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

        {/* Business Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Business Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Potential Estimate
            </label>
            <select
              value={formData.businessPotential}
              onChange={(e) => setFormData({ ...formData, businessPotential: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select potential</option>
              <option value="5-10 kg">5-10 kg / month</option>
              <option value="10-25 kg">10-25 kg / month</option>
              <option value="25-50 kg">25-50 kg / month</option>
              <option value="50-100 kg">50-100 kg / month</option>
              <option value="100+ kg">100+ kg / month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Add any notes or follow-up reminders..."
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="text-gray-400" size={20} />
            <h3 className="font-semibold text-gray-900">Photos (Optional)</h3>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Camera className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-gray-500">Tap to add photos</p>
            <p className="text-xs text-gray-400 mt-1">Farm photos, meeting session photos</p>
          </div>
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
              Save Meeting
            </>
          )}
        </button>
      </form>
    </div>
  );
}
