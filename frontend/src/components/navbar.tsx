'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span>ReWaste</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                <Link href="/search" className="hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Search Listings</Link>
                <Link href="/how-it-works" className="hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">How It Works</Link>
                <Link href="/about" className="hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium transition-colors">Home</Link>
          <Link href="/search" className="block hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium transition-colors">Search Listings</Link>
          <Link href="/how-it-works" className="block hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium transition-colors">How It Works</Link>
          <Link href="/about" className="block hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium transition-colors">About Us</Link>
          <Link href="/contact" className="block hover:text-emerald-400 px-3 py-2 rounded-md text-base font-medium transition-colors">Contact</Link>
          {user ? (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-lg text-center font-medium flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full text-slate-400 hover:text-red-400 px-4 py-2 rounded-md text-center font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <Link href="/auth/login" className="w-full text-slate-300 text-center py-2 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link
                href="/auth/register"
                className="w-full bg-emerald-500 text-slate-950 text-center py-2 rounded-lg font-medium shadow-md shadow-emerald-500/25 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
