'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/src/components/MovieCard';
import HeroSection from '@/src/components/HeroSection';
import { getTrendingMovies } from '@/src/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.slice(0, 12));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-full">
      <HeroSection />
      
      <section className="container py-16">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Trending Now</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading movies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="container py-16 bg-primary/50 rounded-lg my-12">
        <h2 className="text-3xl font-bold mb-6">Why Choose WatchWave?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">📊 Track Your Shows</h3>
            <p>Keep track of all your favorite movies and TV shows in one place.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">🎯 Personalized Lists</h3>
            <p>Create and manage custom watchlists tailored to your preferences.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">⭐ Ratings & Reviews</h3>
            <p>Rate and review movies and shows to help others discover great content.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
