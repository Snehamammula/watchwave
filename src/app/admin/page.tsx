'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/src/config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  createdAt: any;
}

const ADMIN_EMAIL = 'admin@watchwave.com';

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        router.push('/');
        return;
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({
            id: doc.id,
            email: doc.data().email,
            createdAt: doc.data().createdAt,
          });
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading || !user) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Admin Dashboard</h1>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Users ({users.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Created At</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">
                    {u.createdAt?.toDate?.()?.toLocaleDateString?.() || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
