'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import Navbar from '@/components/navbar';
import { Search, MapPin, Tag, Package, Loader2, SlidersHorizontal } from 'lucide-react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Fetch categories for filter
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  // Fetch listings with filters
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', searchTerm, location, categoryId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (location) params.append('location', location);
      if (categoryId) params.append('categoryId', categoryId);
      
      const res = await api.get(`/listings?${params.toString()}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg pb-4 border-b border-slate-800">
              <SlidersHorizontal className="h-5 w-5 text-emerald-400" /> Filters
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Search Term</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. scrap metal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 text-sm transition-all appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New York"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white">Marketplace Listings</h1>
            <div className="text-sm font-medium text-slate-400">
              {listings?.length || 0} result{listings?.length !== 1 && 's'}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : listings?.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-xl">
              <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No listings found</h3>
              <p className="text-slate-400 max-w-sm">We couldn't find any materials matching your criteria. Try adjusting your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryId('');
                  setLocation('');
                }}
                className="mt-6 text-emerald-400 hover:text-emerald-300 text-sm font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings?.map((listing: any) => (
                <Link key={listing.id} href={`/listings/${listing.id}`} className="block group">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all flex flex-col h-full">
                    <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
                      {listing.images && listing.images.length > 0 ? (
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium">No Image</div>
                      )}
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur border border-slate-700/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        ${listing.price} / {listing.unit}
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 mb-2 group-hover:text-emerald-400 transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                        {listing.description}
                      </p>
                      
                      <div className="space-y-2 mt-auto pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <Tag className="h-3.5 w-3.5 text-slate-500" />
                          {listing.category?.name || 'Uncategorized'}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                          {listing.location}
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-2">
                           <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                            <Package className="h-3.5 w-3.5 text-slate-500" />
                            {listing.quantity} {listing.unit}
                          </div>
                          <span className="text-xs text-slate-500">{new Date(listing.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
