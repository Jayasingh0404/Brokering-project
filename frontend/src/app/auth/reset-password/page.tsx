'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-955 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-extrabold text-emerald-400">
          🔄 ReWaste
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-white">Reset your password</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 sm:rounded-3xl sm:px-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-6">
              <span className="text-5xl mb-4 block">✅</span>
              <h3 className="text-xl font-bold text-white">Password Reset Complete!</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Your password has been successfully updated. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-955 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
