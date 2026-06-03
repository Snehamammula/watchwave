'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/src/config/firebase';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import MovieCard from '@/src/components/MovieCard';
import { getMovieDetails } from '@/src/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export default function WatchlistPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
          const watchlistIds = userDoc.data().watchlist || [];
          const movieDetails = await Promise.all(
            watchlistIds.map(id => getMovieDetails(id))
          );
          setMovies(movieDetails.filter(m => m !== null));
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const removeFromWatchlist = async (movieId: number) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        watchlist: arrayRemove(movieId),
      });
      setMovies(movies.filter(m => m.id !== movieId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading watchlist...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 gradient-text">My Watchlist</h1>

      {movies.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-lg text-gray-400">Your watchlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
