'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Search, Shield, Recycle, ArrowRight, TrendingUp, Users, Factory, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Fetch recent active listings
  const { data: listings } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      const res = await api.get('/listings');
      return res.data.slice(0, 3); // Take top 3
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  const stats = [
    { label: 'Registered Businesses', value: '1,200+', icon: Users },
    { label: 'Waste Redirected', value: '45,000 Tons', icon: Recycle },
    { label: 'Carbon Saved', value: '12,500 CO2e', icon: TrendingUp },
    { label: 'Completed Trades', value: '5,800+', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 flex-1">
        {/* Glow effect backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <Award className="h-3.5 w-3.5" /> Direct B2B Waste Exchange Marketplace
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Turn Your Industrial Waste into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Valuable Resources</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified recyclers and manufacturers. Streamline bulk transactions, ensure compliance, and boost circular operations.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto flex items-center bg-slate-900 border border-slate-800 focus-within:border-emerald-500/50 p-2 rounded-2xl shadow-2xl transition-all">
            <div className="flex items-center flex-1 px-3">
              <Search className="h-5 w-5 text-slate-500 mr-2" />
              <input
                type="text"
                placeholder="Search plastic, metals, paper, e-waste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 ring-0 outline-none text-white placeholder-slate-500 w-full text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              Search
            </button>
          </form>

          {/* Core Categories Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Plastic', 'Metal', 'Glass', 'Paper', 'Wood', 'E-Waste'].map((cat) => (
              <Link
                key={cat}
                href={`/search?category=${cat}`}
                className="text-xs sm:text-sm font-medium bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 px-4 py-2 rounded-xl transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Waste Listings</h2>
              <p className="mt-2 text-slate-400">Recent materials posted by verified sellers</p>
            </div>
            <Link href="/search" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group">
              View All <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listings && listings.length > 0 ? (
              listings.map((item: any) => (
                <div key={item.id} className="bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/20 rounded-2xl p-5 hover:-translate-y-1 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-full h-44 bg-slate-850 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center border border-slate-800">
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images[0].imageUrl} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-4xl">♻️</span>
                      )}
                      <span className="absolute top-3 left-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {item.category?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-850 flex justify-between items-center text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Quantity</span>
                      <span className="font-semibold text-white">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Price</span>
                      <span className="font-bold text-emerald-400">${item.price}</span>
                    </div>
                  </div>
                  <Link href={`/listings/${item.id}`} className="mt-4 w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-center py-2.5 rounded-xl font-bold transition-all text-sm block">
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              // Fallback mock cards if database has no items
              [
                { title: '12 Tons of Sorted PET Flakes', desc: 'Washed and shredded PET bottle scrap, ready for extruder feed.', qty: '12 Tons', price: '$450/Ton', cat: 'Plastic' },
                { title: '800kg Copper Wire Cables Scrap', desc: 'Insulated copper wiring scrap stripped from industrial site renovations.', qty: '800 kg', price: '$4.2/kg', cat: 'Metal' },
                { title: 'Bulk Corrugated Cardboard Bales', desc: 'Heavy duty industrial shipping box packaging, compressed into bales.', qty: '18 Tons', price: '$95/Ton', cat: 'Paper' }
              ].map((mock, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/20 rounded-2xl p-5 hover:-translate-y-1 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-full h-44 bg-slate-950 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center border border-slate-800">
                      <span className="text-5xl">{mock.cat === 'Plastic' ? '🥤' : mock.cat === 'Metal' ? '🔌' : '📦'}</span>
                      <span className="absolute top-3 left-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {mock.cat}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{mock.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{mock.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-850 flex justify-between items-center text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Quantity</span>
                      <span className="font-semibold text-white">{mock.qty}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Estimated Value</span>
                      <span className="font-bold text-emerald-400">{mock.price}</span>
                    </div>
                  </div>
                  <Link href="/auth/register" className="mt-4 w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-center py-2.5 rounded-xl font-bold transition-all text-sm block">
                    Register to Contact Seller
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-slate-900/20 border border-slate-900 rounded-2xl backdrop-blur-sm">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Monetize Your Waste Streams?</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Join a network of manufacturers and recycling professionals making circular industrial operations profitable.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register?role=SELLER"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              Register as Seller <Factory className="h-5 w-5" />
            </Link>
            <Link
              href="/auth/register?role=BUYER"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-850 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              Register as Buyer <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔄</span>
            <span className="font-bold text-white">ReWaste</span>
            <span className="ml-2">© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
