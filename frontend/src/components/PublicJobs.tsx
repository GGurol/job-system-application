"use client";
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

type Job = { id: string; title: string; company: string; location?: string };

export default function PublicJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const res = await fetch(`${baseUrl}/jobs/public-list?limit=8`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-semibold">Latest jobs</h2>
        <button onClick={load} className="text-sm px-2 py-1 rounded bg-gray-200">Refresh</button>
      </div>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid gap-3 sm:grid-cols-2">
          {jobs.map(j => (
            <JobCard key={j.id} title={j.title} company={j.company} location={j.location} />
          ))}
          {jobs.length === 0 && <p className="text-gray-600">No jobs available.</p>}
        </div>
      )}
    </div>
  );
}


