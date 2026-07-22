'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Plus, Search, Edit, Trash2, MapPin, Tag, Package, ExternalLink, Loader2 } from 'lucide-react';

export default function MyListingsPage() {
  const { data: listings, isLoading } = useQuery({
    queryKey: ['my-listings'],
    queryFn: async () => {
      const res = await api.get('/listings/my');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Listings</h1>
          <p className="mt-1 text-slate-400 text-sm">Manage your waste and recycling materials inventory.</p>
        </div>
        <Link
          href="/dashboard/listings/new"
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/10 text-sm"
        >
          <Plus className="h-4 w-4" /> Add New Listing
        </Link>
      </div>

      {listings?.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No listings found</h3>
          <p className="text-slate-400 max-w-sm mb-6">You haven't added any listings yet. Start selling your materials by creating your first listing.</p>
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm border border-slate-700"
          >
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings?.map((listing: any) => (
            <div key={listing.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all shadow-xl group flex flex-col">
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                {listing.images && listing.images.length > 0 ? (
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium">No Image</div>
                )}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur border border-slate-700/50 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {listing.status}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">{listing.title}</h3>
                  <div className="text-emerald-400 font-bold whitespace-nowrap">
                    ${listing.price} <span className="text-slate-500 text-xs font-normal">/{listing.unit}</span>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                  {listing.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Tag className="h-4 w-4 text-slate-500" />
                    {listing.category?.name || 'Uncategorized'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    {listing.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Package className="h-4 w-4 text-slate-500" />
                    {listing.quantity} {listing.unit} available &bull; {listing.condition}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-slate-800 mt-auto">
                  <Link
                    href={`/dashboard/listings/${listing.id}/edit`}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </Link>
                  <button
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
