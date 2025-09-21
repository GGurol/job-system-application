import PublicJobs from '../components/PublicJobs';
import HeroSection from '../components/HeroSection';
import { getApiUrl } from '@/lib/utils';


async function getHealth(): Promise<{ status: string } | null> {
  const baseUrl = getApiUrl();
  try {
    const res = await fetch(`${baseUrl}/health`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Health check failed with status: ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Health check fetch failed:', error);
    return null;
  }
}

export default async function Home() {
  const health = await getHealth();
  const isOk = !!health;
  
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <HeroSection isApiOk={isOk} />
      <div className="mt-6 sm:mt-8">
        <PublicJobs />
      </div>
      <footer className="mt-8 sm:mt-12 border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
        CareerPilot - Navigate your career with confidence
      </footer>
    </main>
  );
}