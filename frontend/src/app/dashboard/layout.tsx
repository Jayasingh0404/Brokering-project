'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LayoutDashboard, List, User, Building, Settings, LogOut, Loader2, ArrowLeft } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-955 text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!user) {
    return null; // Managed by AuthProvider redirect
  }

  const sidebarLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', href: '/dashboard/listings', icon: List, role: 'SELLER' },
    { label: 'Company Profile', href: '/dashboard/company', icon: Building, role: 'SELLER' },
    { label: 'My Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-900 bg-slate-900/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span className="text-slate-800">|</span>
          <span className="text-sm font-semibold text-white">ReWaste Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold text-white">{user.name}</div>
            <div className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">{user.role}</div>
          </div>
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} className="h-9 w-9 rounded-full object-cover border border-slate-800" />
          ) : (
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-900 bg-slate-900/20 hidden md:flex flex-col justify-between p-4">
          <div className="space-y-1.5">
            {sidebarLinks
              .filter((link) => !link.role || link.role === user.role)
              .map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-auto"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
