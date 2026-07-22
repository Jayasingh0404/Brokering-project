'use client';

import Navbar from '@/components/navbar';
import { Target, Lightbulb, Users, ShieldCheck, Recycle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero section */}
      <section className="py-20 text-center relative max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Our Mission & Vision</h1>
        <p className="mt-6 text-lg text-slate-400 leading-relaxed">
          ReWaste is building a transparent, direct, and efficient marketplace that connects waste producers with processing companies, reducing landfill reliance and fostering a circular economy.
        </p>
      </section>

      {/* Grid section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex gap-6">
            <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed">
                To simplify the transaction of bulk secondary materials, making recycling economically attractive for waste generators and sourcing inputs reliable for manufacturing firms.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex gap-6">
            <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
              <Lightbulb className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-slate-400 leading-relaxed">
                To see zero industrial waste end up in landfills. We envision a future where waste materials are tracked, traded, and transformed seamlessly within global production loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Culture values */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Our Core Principles</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">Trust & Verification</h3>
              <p className="mt-2 text-sm text-slate-400">All buyers and sellers verify their businesses with GST/PAN registrations to protect market interactions.</p>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <Recycle className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">Direct & Transparent Trade</h3>
              <p className="mt-2 text-sm text-slate-400">We bypass middlemen. Sellers listing materials interact directly with buyers to extract maximum value.</p>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <Users className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">Global Scalability</h3>
              <p className="mt-2 text-sm text-slate-400">Built to handle local neighborhood waste collectors up to multi-national factory output networks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-auto py-8 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>ReWaste © 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
