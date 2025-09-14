"use client";
import React, { useEffect, useState } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState<{ jobs: number; last_added: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState('software engineer');
  const [location, setLocation] = useState('United States');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const loadStats = async () => {
    if (!token) return;
    const res = await fetch(`${baseUrl}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setStats(await res.json());
  };

  useEffect(() => { loadStats(); }, []);

  const runScrape = async () => {
    if (!token) { alert('Login first'); return; }
    setLoading(true);
    await fetch(`${baseUrl}/admin/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ keywords, location })
    });
    setLoading(false);
    setTimeout(loadStats, 5000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="border rounded p-3 bg-white">
          <div className="text-sm text-gray-500">Jobs</div>
          <div className="text-2xl font-semibold">{stats?.jobs ?? '—'}</div>
        </div>
        <div className="border rounded p-3 bg-white sm:col-span-2">
          <div className="text-sm text-gray-500">Last added</div>
          <div className="text-lg">{stats?.last_added ? new Date(stats.last_added).toLocaleString() : '—'}</div>
        </div>
      </div>
      <div className="border rounded p-4 bg-white space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Keywords</label>
            <input value={keywords} onChange={e=>setKeywords(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <button disabled={loading} onClick={runScrape} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">{loading ? 'Starting...' : 'Run scrape now'}</button>
      </div>
    </div>
  );
}




