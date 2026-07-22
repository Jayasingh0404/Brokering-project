'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { ListPlus, Eye, CheckCircle2, AlertCircle, ShoppingBag, User, Building } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const { user } = useAuth();

  const isSeller = user?.role === 'SELLER';

  // Fetch stats if seller
  const { data: stats, isLoading } = useQuery({
    queryKey: ['sellerStats'],
    queryFn: async () => {
      const res = await api.get('/listings/stats');
      return res.data;
    },
    enabled: !!user && isSeller,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-slate-400">Here's an overview of your marketplace portal.</p>
      </div>

      {isSeller ? (
        <>
          {/* Seller Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Total Listings</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{isLoading ? '...' : stats?.totalListings ?? 0}</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl border border-emerald-500/15">
                <ListPlus className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Active Listings</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{isLoading ? '...' : stats?.activeListings ?? 0}</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl border border-emerald-500/15">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Pending Approval</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{isLoading ? '...' : stats?.pendingListings ?? 0}</span>
              </div>
              <div className="bg-amber-500/10 text-amber-400 p-3.5 rounded-xl border border-amber-500/15">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Total Views</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{isLoading ? '...' : stats?.views ?? 0}</span>
              </div>
              <div className="bg-teal-500/10 text-teal-400 p-3.5 rounded-xl border border-teal-500/15">
                <Eye className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link href="/dashboard/listings/new" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-4 rounded-2xl text-center shadow-lg shadow-emerald-500/10 transition-all flex flex-col items-center justify-center gap-2">
                <ListPlus className="h-6 w-6" />
                <span>Create Listing</span>
              </Link>
              <Link href="/dashboard/company" className="bg-slate-950 border border-slate-800 hover:border-slate-700 font-bold px-6 py-4 rounded-2xl text-center text-white transition-all flex flex-col items-center justify-center gap-2">
                <Building className="h-6 w-6 text-slate-400" />
                <span>Company Profile</span>
              </Link>
              <Link href="/dashboard/profile" className="bg-slate-950 border border-slate-800 hover:border-slate-700 font-bold px-6 py-4 rounded-2xl text-center text-white transition-all flex flex-col items-center justify-center gap-2">
                <User className="h-6 w-6 text-slate-400" />
                <span>Update Profile</span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // Buyer View
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">Discover Secondary Materials</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Access direct, verified, and filtered industrial scrap listings. Review chemical compositions, weights, packaging details, and connect immediately with suppliers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/search"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-between shadow-lg"
            >
              <span>Explore Materials</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/profile"
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-between"
            >
              <span>Verify Profile</span>
              <User className="h-5 w-5 text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
