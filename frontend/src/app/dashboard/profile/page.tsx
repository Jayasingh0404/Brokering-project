'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';
import { Save, Loader2 } from 'lucide-react';

const profileSchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  phone: zod.string().min(10, 'Phone must be at least 10 digits'),
  designation: zod.string().optional(),
  profilePhoto: zod.string().url('Invalid photo URL').or(zod.literal('')),
});

type ProfileForm = zod.infer<typeof profileSchema>;

export default function MyProfile() {
  const { user, updateUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('phone', user.phone);
      setValue('designation', user.designation || '');
      setValue('profilePhoto', user.profilePhoto || '');
    }
  }, [user, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      const res = await api.put('/users/profile', data);
      return res.data;
    },
    onSuccess: (data) => {
      setSuccess(true);
      setError('');
      updateUser(data);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update profile details.');
    },
  });

  const onSubmit = (data: ProfileForm) => {
    saveMutation.mutate(data);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">My Profile</h1>
        <p className="mt-1 text-slate-400 text-sm">Update your personal and professional profile details.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl mb-6">
            Profile details updated successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-800">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.name} className="h-20 w-20 rounded-full object-cover border border-slate-800" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-2xl">
                {user?.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{user?.name}</h3>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mt-0.5">{user?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email (Cannot be modified)</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 text-sm outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Designation / Role Title</label>
              <input
                type="text"
                {...register('designation')}
                placeholder="e.g. Operations Lead, Sourcing Manager"
                className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
              <input
                type="text"
                {...register('phone')}
                className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Profile Photo URL</label>
              <input
                type="text"
                {...register('profilePhoto')}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-slate-955 border border-slate-805 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.profilePhoto && <p className="mt-1.5 text-xs text-red-400">{errors.profilePhoto.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm flex items-center justify-center gap-2"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Profile Details
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
