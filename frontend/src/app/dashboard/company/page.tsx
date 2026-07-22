'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { Save, Loader2, Building2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const companySchema = zod.object({
  name: zod.string().min(2, 'Company name must be at least 2 characters'),
  logo: zod.string().url('Invalid URL').or(zod.literal('')).optional(),
  website: zod.string().url('Invalid URL').or(zod.literal('')).optional(),
  description: zod.string().optional(),
  industry: zod.string().optional(),
  businessType: zod.string().optional(),
  registrationNumber: zod.string().optional(),
  taxId: zod.string().optional(),
  address: zod.string().min(5, 'Address is required'),
  city: zod.string().min(2, 'City is required'),
  state: zod.string().min(2, 'State is required'),
  country: zod.string().min(2, 'Country is required'),
  postalCode: zod.string().min(3, 'Postal Code is required'),
});

type CompanyForm = zod.infer<typeof companySchema>;

export default function CompanyProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
  });

  const { data: company, isLoading } = useQuery({
    queryKey: ['my-company'],
    queryFn: async () => {
      const res = await api.get('/companies/my-company');
      return res.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name || '',
        logo: company.logo || '',
        website: company.website || '',
        description: company.description || '',
        industry: company.industry || '',
        businessType: company.businessType || '',
        registrationNumber: company.registrationNumber || '',
        taxId: company.taxId || '',
        address: company.address || '',
        city: company.city || '',
        state: company.state || '',
        country: company.country || '',
        postalCode: company.postalCode || '',
      });
    }
  }, [company, reset]);

  const saveMutation = useMutation({
    mutationFn: async (data: CompanyForm) => {
      const res = await api.post('/companies', data);
      return res.data;
    },
    onSuccess: () => {
      setSuccess(true);
      setError('');
      queryClient.invalidateQueries({ queryKey: ['my-company'] });
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update company details.');
    },
  });

  const onSubmit = (data: CompanyForm) => {
    saveMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // If user is Buyer, maybe we shouldn't allow them to manage company unless they are Seller, but for now we'll show it or check user role.
  if (user?.role === 'BUYER') {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-white">Company Profile</h1>
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center">
          <Building2 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Not Applicable for Buyers</h2>
          <p className="text-slate-400">Buyers do not need to set up a seller company profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Company Profile</h1>
        <p className="mt-1 text-slate-400 text-sm">Manage your seller organization details and business information.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl mb-6">
            Company details saved successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Company Name *</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Company Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                ></textarea>
                {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Industry</label>
                <input
                  type="text"
                  {...register('industry')}
                  placeholder="e.g. Manufacturing, Recycling"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.industry && <p className="mt-1.5 text-xs text-red-400">{errors.industry.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Business Type</label>
                <select
                  {...register('businessType')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm appearance-none"
                >
                  <option value="">Select Type...</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Recycler">Recycler</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Trader">Trader</option>
                  <option value="Other">Other</option>
                </select>
                {errors.businessType && <p className="mt-1.5 text-xs text-red-400">{errors.businessType.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Contact & Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Website URL</label>
                <input
                  type="text"
                  {...register('website')}
                  placeholder="https://"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.website && <p className="mt-1.5 text-xs text-red-400">{errors.website.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Logo URL</label>
                <input
                  type="text"
                  {...register('logo')}
                  placeholder="https://"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.logo && <p className="mt-1.5 text-xs text-red-400">{errors.logo.message}</p>}
              </div>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Legal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Registration Number</label>
                <input
                  type="text"
                  {...register('registrationNumber')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.registrationNumber && <p className="mt-1.5 text-xs text-red-400">{errors.registrationNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Tax ID / VAT Number</label>
                <input
                  type="text"
                  {...register('taxId')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.taxId && <p className="mt-1.5 text-xs text-red-400">{errors.taxId.message}</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Address *</label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.address && <p className="mt-1.5 text-xs text-red-400">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">City *</label>
                <input
                  type="text"
                  {...register('city')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.city && <p className="mt-1.5 text-xs text-red-400">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">State / Province *</label>
                <input
                  type="text"
                  {...register('state')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.state && <p className="mt-1.5 text-xs text-red-400">{errors.state.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Country *</label>
                <input
                  type="text"
                  {...register('country')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.country && <p className="mt-1.5 text-xs text-red-400">{errors.country.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Postal Code *</label>
                <input
                  type="text"
                  {...register('postalCode')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                {errors.postalCode && <p className="mt-1.5 text-xs text-red-400">{errors.postalCode.message}</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm flex items-center justify-center gap-2 mt-4"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Company Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
