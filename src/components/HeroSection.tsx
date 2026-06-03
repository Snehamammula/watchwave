'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-secondary to-primary flex items-center justify-center text-center px-4">
      <div className="max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
          Welcome to WatchWave
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Your ultimate destination for tracking movies and TV shows. Discover trending content, create personalized watchlists, and never miss your favorite entertainment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary inline-block">
            Get Started
          </Link>
          <Link href="/" className="btn-secondary inline-block">
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
}
