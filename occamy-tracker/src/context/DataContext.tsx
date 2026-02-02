'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Meeting, 
  SampleDistribution, 
  Sale, 
  Attendance, 
  Product,
  DashboardStats 
} from '@/types';
import { useAuth } from './AuthContext';

interface DataContextType {
  // Meetings
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, 'id' | 'createdAt'>) => void;
  
  // Samples
  samples: SampleDistribution[];
  addSample: (sample: Omit<SampleDistribution, 'id' | 'createdAt'>) => void;
  
  // Sales
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
  
  // Attendance
  attendance: Attendance[];
  currentAttendance: Attendance | null;
  checkIn: (location: { lat: number; lng: number }, odometer?: number) => void;
  checkOut: (location: { lat: number; lng: number }, odometer?: number) => void;
  
  // Products
  products: Product[];
  
  // Stats
  getStats: (userId?: string) => DashboardStats;
  getAllUsers: () => { id: string; name: string; role: string; state: string; district: string }[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Demo products
const DEMO_PRODUCTS: Product[] = [
  { id: '1', sku: 'OCC-NUT-001', name: 'Dairy Boost Plus', packSizes: ['1kg', '5kg', '10kg', '25kg'], unitPrice: 250, category: 'Nutraceuticals' },
  { id: '2', sku: 'OCC-NUT-002', name: 'Cattle Care Pro', packSizes: ['500g', '1kg', '5kg'], unitPrice: 180, category: 'Nutraceuticals' },
  { id: '3', sku: 'OCC-NUT-003', name: 'Milk Enhancer Gold', packSizes: ['1kg', '5kg', '10kg'], unitPrice: 320, category: 'Nutraceuticals' },
  { id: '4', sku: 'OCC-SUP-001', name: 'Vitamin Mix Complete', packSizes: ['250g', '500g', '1kg'], unitPrice: 150, category: 'Supplements' },
  { id: '5', sku: 'OCC-SUP-002', name: 'Mineral Block Premium', packSizes: ['2kg', '5kg'], unitPrice: 200, category: 'Supplements' },
];

// Generate demo data
function generateDemoMeetings(): Meeting[] {
  const villages = ['Tumkur', 'Hassan', 'Mandya', 'Raichur', 'Bellary', 'Shimoga', 'Chitradurga'];
  const names = ['Ramesh', 'Suresh', 'Mahesh', 'Ganesh', 'Lokesh', 'Naresh', 'Dinesh'];
  const meetings: Meeting[] = [];
  
  for (let i = 0; i < 25; i++) {
    const isGroup = Math.random() > 0.6;
    meetings.push({
      id: `meeting-${i + 1}`,
      userId: ['2', '3', '4'][Math.floor(Math.random() * 3)],
      type: isGroup ? 'group' : 'one_on_one',
      category: ['farmer', 'seller', 'influencer'][Math.floor(Math.random() * 3)] as Meeting['category'],
      personName: isGroup ? undefined : `${names[Math.floor(Math.random() * names.length)]} ${['Kumar', 'Singh', 'Patel', 'Sharma'][Math.floor(Math.random() * 4)]}`,
      village: villages[Math.floor(Math.random() * villages.length)],
      state: 'Karnataka',
      district: 'Mysore',
      latitude: 12.2958 + (Math.random() - 0.5) * 0.5,
      longitude: 76.6394 + (Math.random() - 0.5) * 0.5,
      attendeeCount: isGroup ? Math.floor(Math.random() * 20) + 5 : 1,
      businessPotential: `${Math.floor(Math.random() * 50) + 5}-${Math.floor(Math.random() * 100) + 50} kg`,
      notes: 'Follow up required next week',
      photos: [],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return meetings;
}

function generateDemoSamples(): SampleDistribution[] {
  const samples: SampleDistribution[] = [];
  for (let i = 0; i < 15; i++) {
    samples.push({
      id: `sample-${i + 1}`,
      userId: ['2', '3', '4'][Math.floor(Math.random() * 3)],
      recipientName: `Farmer ${i + 1}`,
      recipientType: 'farmer',
      productName: DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)].name,
      quantity: Math.floor(Math.random() * 5) + 1,
      unit: 'kg',
      purpose: ['trial', 'demo', 'follow_up'][Math.floor(Math.random() * 3)] as SampleDistribution['purpose'],
      village: ['Tumkur', 'Hassan', 'Mandya'][Math.floor(Math.random() * 3)],
      state: 'Karnataka',
      district: 'Mysore',
      latitude: 12.2958 + (Math.random() - 0.5) * 0.5,
      longitude: 76.6394 + (Math.random() - 0.5) * 0.5,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return samples;
}

function generateDemoSales(): Sale[] {
  const sales: Sale[] = [];
  for (let i = 0; i < 30; i++) {
    const product = DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const isB2B = Math.random() > 0.6;
    sales.push({
      id: `sale-${i + 1}`,
      userId: ['2', '3', '4'][Math.floor(Math.random() * 3)],
      mode: isB2B ? 'B2B' : 'B2C',
      customerName: isB2B ? `Distributor ${i + 1}` : `Farmer ${i + 1}`,
      customerType: isB2B ? 'Distributor' : 'Farmer',
      productSKU: product.sku,
      productName: product.name,
      packSize: product.packSizes[Math.floor(Math.random() * product.packSizes.length)],
      quantity,
      unitPrice: product.unitPrice,
      totalAmount: product.unitPrice * quantity,
      isRepeatOrder: Math.random() > 0.7,
      village: ['Tumkur', 'Hassan', 'Mandya', 'Shimoga'][Math.floor(Math.random() * 4)],
      state: 'Karnataka',
      district: 'Mysore',
      latitude: 12.2958 + (Math.random() - 0.5) * 0.5,
      longitude: 76.6394 + (Math.random() - 0.5) * 0.5,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return sales;
}

function generateDemoAttendance(): Attendance[] {
  const attendance: Attendance[] = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    attendance.push({
      id: `att-${i + 1}`,
      userId: ['2', '3', '4'][Math.floor(Math.random() * 3)],
      date: date.toISOString().split('T')[0],
      checkInTime: '09:00',
      checkInLocation: { lat: 12.2958, lng: 76.6394 },
      checkInOdometer: 45000 + i * 50,
      checkOutTime: '18:00',
      checkOutLocation: { lat: 12.3158, lng: 76.6594 },
      checkOutOdometer: 45000 + i * 50 + Math.floor(Math.random() * 80) + 20,
      totalDistance: Math.floor(Math.random() * 80) + 20,
      status: 'completed',
    });
  }
  return attendance;
}

const DEMO_USERS_LIST = [
  { id: '2', name: 'Rajesh Kumar', role: 'field_officer', state: 'Karnataka', district: 'Mysore' },
  { id: '3', name: 'Suresh Patel', role: 'distributor', state: 'Gujarat', district: 'Ahmedabad' },
  { id: '4', name: 'Priya Sharma', role: 'field_officer', state: 'Maharashtra', district: 'Pune' },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [samples, setSamples] = useState<SampleDistribution[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [currentAttendance, setCurrentAttendance] = useState<Attendance | null>(null);

  // Initialize demo data
  useEffect(() => {
    const savedMeetings = localStorage.getItem('occamy_meetings');
    const savedSamples = localStorage.getItem('occamy_samples');
    const savedSales = localStorage.getItem('occamy_sales');
    const savedAttendance = localStorage.getItem('occamy_attendance');
    const savedCurrentAttendance = localStorage.getItem('occamy_current_attendance');

    setMeetings(savedMeetings ? JSON.parse(savedMeetings) : generateDemoMeetings());
    setSamples(savedSamples ? JSON.parse(savedSamples) : generateDemoSamples());
    setSales(savedSales ? JSON.parse(savedSales) : generateDemoSales());
    setAttendance(savedAttendance ? JSON.parse(savedAttendance) : generateDemoAttendance());
    
    if (savedCurrentAttendance) {
      setCurrentAttendance(JSON.parse(savedCurrentAttendance));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (meetings.length > 0) localStorage.setItem('occamy_meetings', JSON.stringify(meetings));
  }, [meetings]);

  useEffect(() => {
    if (samples.length > 0) localStorage.setItem('occamy_samples', JSON.stringify(samples));
  }, [samples]);

  useEffect(() => {
    if (sales.length > 0) localStorage.setItem('occamy_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    if (attendance.length > 0) localStorage.setItem('occamy_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    if (currentAttendance) {
      localStorage.setItem('occamy_current_attendance', JSON.stringify(currentAttendance));
    } else {
      localStorage.removeItem('occamy_current_attendance');
    }
  }, [currentAttendance]);

  const addMeeting = (meeting: Omit<Meeting, 'id' | 'createdAt'>) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: `meeting-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setMeetings(prev => [newMeeting, ...prev]);
  };

  const addSample = (sample: Omit<SampleDistribution, 'id' | 'createdAt'>) => {
    const newSample: SampleDistribution = {
      ...sample,
      id: `sample-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSamples(prev => [newSample, ...prev]);
  };

  const addSale = (sale: Omit<Sale, 'id' | 'createdAt'>) => {
    const newSale: Sale = {
      ...sale,
      id: `sale-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSales(prev => [newSale, ...prev]);
  };

  const checkIn = (location: { lat: number; lng: number }, odometer?: number) => {
    if (!user) return;
    
    const now = new Date();
    const newAttendance: Attendance = {
      id: `att-${Date.now()}`,
      userId: user.id,
      date: now.toISOString().split('T')[0],
      checkInTime: now.toTimeString().slice(0, 5),
      checkInLocation: location,
      checkInOdometer: odometer,
      status: 'active',
    };
    setCurrentAttendance(newAttendance);
    setAttendance(prev => [newAttendance, ...prev]);
  };

  const checkOut = (location: { lat: number; lng: number }, odometer?: number) => {
    if (!currentAttendance) return;
    
    const now = new Date();
    const distance = odometer && currentAttendance.checkInOdometer 
      ? odometer - currentAttendance.checkInOdometer 
      : Math.floor(Math.random() * 50) + 10;

    const updatedAttendance: Attendance = {
      ...currentAttendance,
      checkOutTime: now.toTimeString().slice(0, 5),
      checkOutLocation: location,
      checkOutOdometer: odometer,
      totalDistance: distance,
      status: 'completed',
    };

    setAttendance(prev => 
      prev.map(a => a.id === currentAttendance.id ? updatedAttendance : a)
    );
    setCurrentAttendance(null);
  };

  const getStats = (userId?: string): DashboardStats => {
    const filteredMeetings = userId ? meetings.filter(m => m.userId === userId) : meetings;
    const filteredSales = userId ? sales.filter(s => s.userId === userId) : sales;
    const filteredSamples = userId ? samples.filter(s => s.userId === userId) : samples;
    const filteredAttendance = userId ? attendance.filter(a => a.userId === userId) : attendance;

    const farmerMeetings = filteredMeetings.filter(m => m.category === 'farmer');
    const totalAttendees = filteredMeetings.reduce((sum, m) => sum + (m.attendeeCount || 1), 0);

    return {
      totalMeetings: filteredMeetings.length,
      totalSales: filteredSales.reduce((sum, s) => sum + s.totalAmount, 0),
      totalSamples: filteredSamples.length,
      totalDistance: filteredAttendance.reduce((sum, a) => sum + (a.totalDistance || 0), 0),
      farmersContacted: totalAttendees,
      farmersConverted: Math.floor(totalAttendees * 0.3),
      b2cSales: filteredSales.filter(s => s.mode === 'B2C').reduce((sum, s) => sum + s.totalAmount, 0),
      b2bSales: filteredSales.filter(s => s.mode === 'B2B').reduce((sum, s) => sum + s.totalAmount, 0),
    };
  };

  const getAllUsers = () => DEMO_USERS_LIST;

  return (
    <DataContext.Provider
      value={{
        meetings,
        addMeeting,
        samples,
        addSample,
        sales,
        addSale,
        attendance,
        currentAttendance,
        checkIn,
        checkOut,
        products: DEMO_PRODUCTS,
        getStats,
        getAllUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
