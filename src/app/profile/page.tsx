'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/src/config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

interface UserData {
  email: string;
  watchlist: number[];
  createdAt: Date;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading profile...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-4xl font-bold mb-8 gradient-text">My Profile</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <p className="text-xl">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Account Created</label>
              <p className="text-xl">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Watchlist Items</label>
              <p className="text-xl">{userData?.watchlist?.length || 0} items</p>
            </div>

            <div className="pt-6 border-t border-gray-700 flex gap-4">
              <Link href="/watchlist" className="btn-primary flex-1 text-center">
                View Watchlist
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary flex-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
