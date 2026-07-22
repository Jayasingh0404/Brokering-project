'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-955 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-extrabold text-emerald-400">
          🔄 ReWaste
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-white">Reset your password</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email address and we'll send you a link to reset your credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 sm:rounded-3xl sm:px-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-6">
              <span className="text-5xl mb-4 block">✉️</span>
              <h3 className="text-xl font-bold text-white">Check your email</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                We've sent a password reset link to <span className="text-emerald-400 font-medium">{email}</span> if it is registered.
              </p>
              <Link
                href="/auth/login"
                className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-bold transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-805 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
