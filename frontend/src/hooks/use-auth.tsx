'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  designation?: string;
  profilePhoto?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/auth/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const res = await api.get('/users/profile');
          setUser(res.data);
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', credentials);
      const { accessToken, refreshToken, user: loggedUser } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Load full profile immediately after login
      const profileRes = await api.get('/users/profile');
      setUser(profileRes.data);
      router.push('/dashboard');
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', data);
      const { accessToken, refreshToken, user: registeredUser } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Load full profile immediately after registration
      const profileRes = await api.get('/users/profile');
      setUser(profileRes.data);
      router.push('/dashboard');
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
