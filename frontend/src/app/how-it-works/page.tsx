'use client';

import Navbar from '@/components/navbar';
import { UserCheck, UploadCloud, Search, MessageSquare, Handshake, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const sellerSteps = [
    { title: 'Register & Setup Profile', desc: 'Create your account and complete your company profile details including PAN and GST validations.', icon: UserCheck },
    { title: 'Create Listings', desc: 'Post details about your secondary materials, specifying quantity, unit, price, and uploading images.', icon: UploadCloud },
    { title: 'Receive Buyer Leads', desc: 'Buyers discover your materials and contact you directly. Negotiate prices and logistics terms directly.', icon: Handshake },
  ];

  const buyerSteps = [
    { title: 'Browse & Filter', desc: 'Register as a Buyer and query the listings by category, location, quantity, or price range.', icon: Search },
    { title: 'Contact Seller', desc: 'View complete details, review seller company information, and reach out via contact channels.', icon: MessageSquare },
    { title: 'Complete Transaction', desc: 'Verify the quality, coordinate logistics, and complete secure payments off-platform.', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">How ReWaste Works</h1>
          <p className="mt-4 text-slate-400">A direct, secure, and straightforward channel to transact bulk industrial scrap materials.</p>
        </div>

        {/* Two column flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Seller Flow */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-10 flex items-center gap-2 pb-3 border-b border-slate-900">
              <span>🏭</span> Seller Workflow
            </h2>
            <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {sellerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-6 relative z-10">
                    <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{idx + 1}. {step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buyer Flow */}
          <div>
            <h2 className="text-2xl font-bold text-teal-400 mb-10 flex items-center gap-2 pb-3 border-b border-slate-900">
              <span>💼</span> Buyer Workflow
            </h2>
            <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {buyerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-6 relative z-10">
                    <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 text-teal-400 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{idx + 1}. {step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-24 p-8 sm:p-12 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/10 rounded-3xl text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Join the Marketplace Today</h3>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">Create an account in 2 minutes and start connecting with waste brokers across India.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/auth/register"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all"
            >
              Get Started Now
            </Link>
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
