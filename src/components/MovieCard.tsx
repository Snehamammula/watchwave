'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg shadow-lg h-80 mb-3">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded font-bold text-sm">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <h3 className="font-semibold group-hover:text-blue-400 transition line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}
