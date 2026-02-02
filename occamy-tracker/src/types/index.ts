// User Types
export type UserRole = 'admin' | 'distributor' | 'field_officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  state: string;
  district: string;
  avatar?: string;
  createdAt: string;
}

// Meeting Types
export type MeetingCategory = 'farmer' | 'seller' | 'influencer';
export type MeetingType = 'one_on_one' | 'group';

export interface Meeting {
  id: string;
  userId: string;
  type: MeetingType;
  category: MeetingCategory;
  personName?: string;
  contactDetails?: string;
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  attendeeCount?: number;
  businessPotential?: string;
  notes?: string;
  photos: string[];
  createdAt: string;
}

// Sample Distribution Types
export type SamplePurpose = 'trial' | 'demo' | 'follow_up';

export interface SampleDistribution {
  id: string;
  userId: string;
  recipientName: string;
  recipientType: MeetingCategory;
  productName: string;
  quantity: number;
  unit: string;
  purpose: SamplePurpose;
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  notes?: string;
  createdAt: string;
}

// Sales Types
export type SaleMode = 'B2C' | 'B2B';

export interface Sale {
  id: string;
  userId: string;
  mode: SaleMode;
  customerName: string;
  customerType: string;
  productSKU: string;
  productName: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  isRepeatOrder: boolean;
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  notes?: string;
  createdAt: string;
}

// Attendance Types
export interface Attendance {
  id: string;
  userId: string;
  date: string;
  checkInTime: string;
  checkInLocation: { lat: number; lng: number };
  checkInOdometer?: number;
  checkOutTime?: string;
  checkOutLocation?: { lat: number; lng: number };
  checkOutOdometer?: number;
  totalDistance?: number;
  status: 'active' | 'completed';
}

// Location Types
export interface LocationPoint {
  id: string;
  userId: string;
  attendanceId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalMeetings: number;
  totalSales: number;
  totalSamples: number;
  totalDistance: number;
  farmersContacted: number;
  farmersConverted: number;
  b2cSales: number;
  b2bSales: number;
}

// Product Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  packSizes: string[];
  unitPrice: number;
  category: string;
}
