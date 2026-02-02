'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for the application
const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@occamy.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 9876543210',
    state: 'Karnataka',
    district: 'Bangalore',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@occamy.com',
    password: 'field123',
    role: 'field_officer',
    phone: '+91 9876543211',
    state: 'Karnataka',
    district: 'Mysore',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Suresh Patel',
    email: 'suresh@occamy.com',
    password: 'dist123',
    role: 'distributor',
    phone: '+91 9876543212',
    state: 'Gujarat',
    district: 'Ahmedabad',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya@occamy.com',
    password: 'field123',
    role: 'field_officer',
    phone: '+91 9876543213',
    state: 'Maharashtra',
    district: 'Pune',
    createdAt: '2024-02-10',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('occamy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('occamy_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('occamy_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('occamy_user');
    localStorage.removeItem('occamy_attendance');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { DEMO_USERS };
