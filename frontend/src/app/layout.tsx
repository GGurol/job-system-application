import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Job App',
  description: 'Track jobs, swipe, and auto-apply',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="transition-colors duration-300">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
