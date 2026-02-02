'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { SaleMode } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  ShoppingCart,
  Save,
  Loader2,
  CheckCircle,
  Package
} from 'lucide-react';
import Link from 'next/link';

export default function SalesForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { addSale, products } = useData();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    mode: 'B2C' as SaleMode,
    customerName: '',
    customerType: 'Farmer',
    productSKU: '',
    productName: '',
    packSize: '',
    quantity: 1,
    unitPrice: 0,
    isRepeatOrder: false,
    village: '',
    notes: '',
  });

  const selectedProduct = products.find(p => p.id === formData.productSKU);
  const totalAmount = formData.quantity * formData.unitPrice;

  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        ...formData,
        productSKU: productId,
        productName: product.name,
        packSize: product.packSizes[0],
        unitPrice: product.unitPrice,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addSale({
      userId: user.id,
      mode: formData.mode,
      customerName: formData.customerName,
      customerType: formData.customerType,
      productSKU: selectedProduct?.sku || '',
      productName: formData.productName,
      packSize: formData.packSize,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      totalAmount: totalAmount,
      isRepeatOrder: formData.isRepeatOrder,
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
      router.push('/dashboard/sales');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Recorded!</h2>
          <p className="text-gray-500">Redirecting to sales list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/sales"
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Record Sale</h1>
          <p className="text-gray-500">Capture B2C or B2B order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sale Mode */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sale Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, mode: 'B2C', customerType: 'Farmer' })}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                formData.mode === 'B2C'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">👨‍🌾</span>
              <span className="font-medium">B2C</span>
              <span className="text-xs text-gray-500">Direct to Farmer</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, mode: 'B2B', customerType: 'Distributor' })}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                formData.mode === 'B2B'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">🏪</span>
              <span className="font-medium">B2B</span>
              <span className="text-xs text-gray-500">Distributor/Reseller</span>
            </button>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Customer Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={formData.mode === 'B2C' ? "Farmer's name" : "Business/Distributor name"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Type *
            </label>
            <select
              value={formData.customerType}
              onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {formData.mode === 'B2C' ? (
                <>
                  <option value="Farmer">Farmer</option>
                  <option value="Small Dairy">Small Dairy</option>
                  <option value="Individual">Individual</option>
                </>
              ) : (
                <>
                  <option value="Distributor">Distributor</option>
                  <option value="Reseller">Reseller</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Cooperative">Cooperative</option>
                </>
              )}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="repeatOrder"
              checked={formData.isRepeatOrder}
              onChange={(e) => setFormData({ ...formData, isRepeatOrder: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="repeatOrder" className="text-sm text-gray-700">
              This is a repeat order
            </label>
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
              value={formData.productSKU}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.unitPrice}/unit
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pack Size *
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.packSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, packSize: size })}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.packSize === size
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price (₹)
              </label>
              <input
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-emerald-50 p-4 rounded-xl flex items-center justify-between">
            <span className="font-medium text-emerald-700">Total Amount</span>
            <span className="text-2xl font-bold text-emerald-700">₹{totalAmount.toLocaleString()}</span>
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
            placeholder="Add any notes about this sale..."
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
              <ShoppingCart size={20} />
              Record Sale • ₹{totalAmount.toLocaleString()}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
