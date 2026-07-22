'use client';

import Navbar from '@/components/navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Get in Touch</h1>
          <p className="mt-4 text-slate-400">Have questions about listings, verification or logistics? Our team is here to support you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info details */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Connect directly with our support helpdesk for corporate accounts, integrations, or validation questions.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Address</span>
                    <span className="text-white font-medium">support@rewaste.co</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Phone Support</span>
                    <span className="text-white font-medium">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Corporate Office</span>
                    <span className="text-white font-medium">New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500">
              Response times are typically under 24 hours on business days.
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="text-5xl mb-6">✅</span>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="mt-4 text-slate-400 max-w-sm">
                  Thank you for reaching out. A support representative will email you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-350 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-8 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>ReWaste © 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
