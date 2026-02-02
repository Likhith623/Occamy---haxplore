'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Package, 
  ShoppingCart, 
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: <LayoutDashboard size={20} />,
    roles: ['admin', 'field_officer', 'distributor']
  },
  { 
    name: 'Meetings', 
    href: '/dashboard/meetings', 
    icon: <Users size={20} />,
    roles: ['field_officer', 'distributor']
  },
  { 
    name: 'Samples', 
    href: '/dashboard/samples', 
    icon: <Package size={20} />,
    roles: ['field_officer', 'distributor']
  },
  { 
    name: 'Sales', 
    href: '/dashboard/sales', 
    icon: <ShoppingCart size={20} />,
    roles: ['field_officer', 'distributor']
  },
  { 
    name: 'Attendance', 
    href: '/dashboard/attendance', 
    icon: <ClipboardList size={20} />,
    roles: ['field_officer', 'distributor']
  },
  { 
    name: 'All Activities', 
    href: '/dashboard/admin/activities', 
    icon: <MapPin size={20} />,
    roles: ['admin']
  },
  { 
    name: 'Team', 
    href: '/dashboard/admin/team', 
    icon: <Users size={20} />,
    roles: ['admin']
  },
  { 
    name: 'Reports', 
    href: '/dashboard/admin/reports', 
    icon: <ClipboardList size={20} />,
    roles: ['admin']
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'field_officer': return 'bg-blue-100 text-blue-700';
      case 'distributor': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'field_officer': return 'Field Officer';
      case 'distributor': return 'Distributor';
      default: return role;
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">Occamy</span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold"
          >
            {user?.name.charAt(0)}
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Occamy</h1>
              <p className="text-xs text-gray-500">Field Tracker</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role || '')}`}>
                {getRoleLabel(user?.role || '')}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-emerald-50 text-emerald-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className={isActive ? 'text-emerald-600' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
