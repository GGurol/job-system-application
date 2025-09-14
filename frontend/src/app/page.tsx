async function getHealth(): Promise<{ status: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${baseUrl}/health`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getPublicJobs(): Promise<{ id: number; title: string; company: string; location: string }[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${baseUrl}/jobs/public-list?limit=5`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

import PublicJobs from '../components/PublicJobs';

export default async function Home() {
  const [health] = await Promise.all([getHealth()]);
  const isOk = health?.status === 'ok';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <h1 className="text-3xl font-semibold">Find jobs that match your profile</h1>
        <p className="mt-2 text-blue-100">Connect your LinkedIn, set keywords, and swipe to apply.</p>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <a href="/register" className="px-4 py-2 rounded bg-white text-blue-700 font-medium">Get started</a>
          <a href="/profile" className="px-4 py-2 rounded border border-white/60">Set up profile</a>
          <span className={`ml-auto inline-flex items-center gap-2 rounded-md px-3 py-1.5 ${isOk ? 'bg-white/20' : 'bg-red-600/70'}`}>
            <span className={`inline-block h-2 w-2 rounded-full ${isOk ? 'bg-emerald-300' : 'bg-white'}`}></span>
            <span className="text-xs">API: {isOk ? 'OK' : 'Down'}</span>
          </span>
        </div>
      </section>
      <div className="mt-8">
        <PublicJobs />
      </div>
      <footer className="mt-12 border-t pt-6 text-sm text-gray-600">Made with Next.js & Express</footer>
    </main>
  );
}
