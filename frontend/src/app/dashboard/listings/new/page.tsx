'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/services/api';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';

const listingSchema = zod.object({
  title: zod.string().min(3, 'Title must be at least 3 characters'),
  description: zod.string().min(10, 'Description must be at least 10 characters'),
  quantity: zod.coerce.number().min(0.1, 'Quantity must be greater than 0'),
  unit: zod.string().min(1, 'Unit is required'),
  price: zod.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  location: zod.string().min(3, 'Location is required'),
  categoryId: zod.string().min(1, 'Category is required'),
  images: zod.string().optional(),
});

type ListingForm = zod.input<typeof listingSchema>;

export default function NewListing() {
  const router = useRouter();
  const [error, setError] = useState('');

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingForm>({
    resolver: zodResolver(listingSchema),
    defaultValues: { unit: 'tons' },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/listings', data);
    },
    onSuccess: () => {
      router.push('/dashboard/listings');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create listing. Please check if Company profile is configured.');
    },
  });

  const onSubmit = (data: ListingForm) => {
    const imagesArray = data.images
      ? data.images.split(',').map((url) => url.trim()).filter((url) => url.length > 0)
      : [];

    createMutation.mutate({
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      unit: data.unit,
      price: data.price,
      location: data.location,
      categoryId: data.categoryId,
      images: imagesArray,
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/listings"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Create New Listing</h1>
          <p className="mt-1 text-slate-400 text-sm">Post new secondary materials to the public marketplace.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-805 rounded-3xl p-8 shadow-xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Listing Title</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. 10 Tons of Scrap PET Bottles"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.title && <p className="mt-1.5 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
              <select
                {...register('categoryId')}
                disabled={loadingCategories}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              >
                <option value="">Select a category</option>
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1.5 text-xs text-red-400">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
              <input
                type="text"
                {...register('location')}
                placeholder="e.g. New Delhi, India"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.location && <p className="mt-1.5 text-xs text-red-400">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Quantity</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  step="any"
                  {...register('quantity')}
                  placeholder="e.g. 10"
                  className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
                <input
                  type="text"
                  {...register('unit')}
                  placeholder="e.g. tons, kg"
                  className="w-24 bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
                />
              </div>
              {errors.quantity && <p className="mt-1.5 text-xs text-red-400">{errors.quantity.message}</p>}
              {errors.unit && <p className="mt-1.5 text-xs text-red-400">{errors.unit.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Price per unit ($)</label>
              <input
                type="number"
                step="any"
                {...register('price')}
                placeholder="e.g. 250"
                className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              {errors.price && <p className="mt-1.5 text-xs text-red-400">{errors.price.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
              <textarea
                rows={5}
                {...register('description')}
                placeholder="Describe material purity, packaging details..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all resize-none"
              />
              {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Image URLs (comma separated)</label>
              <input
                type="text"
                {...register('images')}
                placeholder="e.g. https://example.com/img1.jpg, https://example.com/img2.jpg"
                className="w-full bg-slate-950 border border-slate-805 rounded-xl px-4 py-3 text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/50 text-sm transition-all"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Leave empty to use category fallback.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating Listing...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
