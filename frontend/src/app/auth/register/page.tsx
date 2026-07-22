'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, Lock, User, Briefcase, Eye, EyeOff } from 'lucide-react';

const registerSchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  email: zod.string().email('Invalid email address'),
  phone: zod.string().min(10, 'Phone must be at least 10 digits'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
  role: zod.enum(['BUYER', 'SELLER']),
});

type RegisterForm = zod.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'BUYER' },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      await registerUser(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check details.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-extrabold text-emerald-400">
          🔄 ReWaste
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">
          Already registered?{' '}
          <Link href="/auth/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 sm:rounded-3xl sm:px-10 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-350 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-505" />
                <input
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-355 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-505" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-355 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-505" />
                <input
                  type="text"
                  {...register('phone')}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-955 border border-slate-805 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
              </div>
              {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-355 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-505" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full bg-slate-955 border border-slate-805 rounded-xl pl-11 pr-11 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-355 mb-2">Account Role</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  selectedRole === 'BUYER' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}>
                  <input type="radio" value="BUYER" {...register('role')} className="sr-only" />
                  <Briefcase className="h-5 w-5" />
                  <span className="font-semibold text-sm">Buyer</span>
                  <span className="text-[10px] text-center text-slate-500">Discover and procure materials</span>
                </label>

                <label className={`border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  selectedRole === 'SELLER' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}>
                  <input type="radio" value="SELLER" {...register('role')} className="sr-only" />
                  <User className="h-5 w-5" />
                  <span className="font-semibold text-sm">Seller</span>
                  <span className="text-[10px] text-center text-slate-500">Post and sell listing stocks</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
