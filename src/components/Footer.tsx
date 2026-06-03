'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-gray-700 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">WatchWave</h3>
            <p className="text-gray-400">Your favorite movie and TV show management platform.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/watchlist" className="hover:text-blue-400">Watchlist</Link></li>
              <li><Link href="/profile" className="hover:text-blue-400">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Data Source</h4>
            <p className="text-gray-400 text-sm">Movie data provided by TMDb API</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WatchWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
