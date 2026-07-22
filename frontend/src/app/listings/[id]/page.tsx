'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, Building, Loader2, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function ListingDetails() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const router = useRouter();
  const [showContact, setShowContact] = useState(false);

  const { data: item, isLoading } = useQuery({
    queryKey: ['listingDetails', id],
    queryFn: async () => {
      const res = await api.get(`/listings/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleContactClick = () => {
    if (!user) {
      router.push('/auth/login');
    } else {
      setShowContact(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <span className="text-4xl mb-4">⚠️</span>
          <h1 className="text-2xl font-bold">Listing Not Found</h1>
          <Link href="/search" className="mt-4 text-emerald-400 font-semibold hover:underline">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <Link href="/search" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Search Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images preview */}
          <div className="space-y-4">
            <div className="w-full h-96 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center relative">
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0].imageUrl} alt={item.title} className="object-cover w-full h-full" />
              ) : (
                <span className="text-7xl">♻️</span>
              )}
              <span className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1.5 rounded-lg">
                {item.category?.name}
              </span>
            </div>
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {item.images.map((img: any, idx: number) => (
                  <div key={idx} className="h-20 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer">
                    <img src={img.imageUrl} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{item.title}</h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-405">
                <MapPin className="h-4.5 w-4.5 text-emerald-400" />
                <span>{item.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Available Stock</span>
                <span className="text-xl font-extrabold text-white mt-1 block">{item.quantity} {item.unit}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Unit Cost ($)</span>
                <span className="text-xl font-extrabold text-emerald-400 mt-1 block">${item.price} <span className="text-xs text-slate-500 font-normal">/ {item.unit}</span></span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-3">Material Description</h2>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{item.description}</p>
            </div>

            {/* Seller Info card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-emerald-400" /> Seller Verification Details
              </h3>
              {item.seller?.company ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Company Name</span>
                    <span className="text-white font-semibold">{item.seller.company.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">GST Registration</span>
                    <span className="text-white font-mono text-xs">{item.seller.company.gstNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PAN Reference</span>
                    <span className="text-white font-mono text-xs">{item.seller.company.panNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">HQ Address</span>
                    <span className="text-white text-right max-w-[200px]">{item.seller.company.address}</span>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">Individual/unverified seller profile.</p>
              )}

              {/* Reveal contact details */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                {showContact ? (
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4.5 w-4.5 text-emerald-400" />
                      <a href={`mailto:${item.seller?.email}`} className="text-white font-medium hover:underline">
                        {item.seller?.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4.5 w-4.5 text-emerald-400" />
                      <a href={`tel:${item.seller?.phone}`} className="text-white font-medium hover:underline">
                        {item.seller?.phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleContactClick}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 text-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>{user ? 'Reveal Contact Info' : 'Sign in to Contact Seller'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-955 border-t border-slate-900 mt-20 py-8 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>ReWaste © 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
