'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/src/config/firebase';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-primary border-b border-gray-700 sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="text-3xl font-bold gradient-text">
          🎬 WatchWave
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/watchlist" className="hover:text-blue-400 transition">
                Watchlist
              </Link>
              <Link href="/profile" className="hover:text-blue-400 transition">
                Profile
              </Link>
              {user.email === 'admin@watchwave.com' && (
                <Link href="/admin" className="hover:text-blue-400 transition">
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700 py-4">
          <div className="container flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/watchlist" className="hover:text-blue-400 transition">
                  Watchlist
                </Link>
                <Link href="/profile" className="hover:text-blue-400 transition">
                  Profile
                </Link>
                {user.email === 'admin@watchwave.com' && (
                  <Link href="/admin" className="hover:text-blue-400 transition">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-400 transition">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
