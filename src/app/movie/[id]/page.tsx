'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth, db } from '@/src/config/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getMovieDetails } from '@/src/lib/tmdb';
import Image from 'next/image';
import { FaPlus, FaCheck } from 'react-icons/fa';

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ name: string; logo_path: string | null }>;
}

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Number(params.id);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);

        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setInWatchlist(userDoc.data().watchlist?.includes(movieId));
          }
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId, user]);

  const toggleWatchlist = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      if (inWatchlist) {
        await updateDoc(doc(db, 'users', user.uid), {
          watchlist: arrayRemove(movieId),
        });
      } else {
        await updateDoc(doc(db, 'users', user.uid), {
          watchlist: arrayUnion(movieId),
        });
      }
      setInWatchlist(!inWatchlist);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="container py-12 text-center">Movie not found</div>;
  }

  return (
    <div className="w-full">
      {movie.backdrop_path && (
        <div className="relative h-96 w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover brightness-50"
          />
        </div>
      )}

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {movie.poster_path && (
            <div className="md:col-span-1">
              <Image
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="md:col-span-3 space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                {movie.runtime && <span>⏱️ {movie.runtime}min</span>}
                {movie.release_date && (
                  <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                )}
              </div>
            </div>

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <button
              onClick={toggleWatchlist}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${inWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {inWatchlist ? (
                <>
                  <FaCheck /> In Watchlist
                </>
              ) : (
                <>
                  <FaPlus /> Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
