'use client';

import { useAuth } from '@/context/AuthContext';
import FieldOfficerDashboard from '@/components/dashboard/FieldOfficerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <FieldOfficerDashboard />;
}
