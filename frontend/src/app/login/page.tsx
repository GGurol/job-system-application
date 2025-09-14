"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Invalid credentials');
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      
      // Trigger auth state change event
      window.dispatchEvent(new Event('authStateChange'));
      
      router.push('/dashboard');
    } catch (err: any) {
      try {
        const parsed = JSON.parse(err.message);
        setError(parsed.error || 'Login failed');
      } catch {
        setError(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input name="email" type="email" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input name="password" type="password" className="w-full border rounded px-3 py-2" required />
        </div>
        <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      <p className="text-sm text-gray-600 mt-3">No account? <a className="text-blue-600 underline" href="/register">Register</a></p>
    </div>
  );
}
