'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MoviePage() {
  const params = useParams();
  const movieId = params?.id;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // TMDb API Key (Agar env file mein hai toh wahan se uthayega)
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '8c24a682a201c13d33939611f71df89d';

  useEffect(() => {
    if (!movieId) return;

    // TMDb se Movie Details fetching
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setLoading(false);
      });
  }, [movieId, API_KEY]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p className="text-xl">Movie load ho rahi hai...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Movie Title */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{movie?.title || 'Watch Movie'}</h1>

      {/* Embedded Full Movie Streaming Player (VidSrc Embed) */}
      <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-900 border border-gray-800">
        <iframe
          src={`https://vidsrc.me/embed/movie/${movieId}`}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
          title={movie?.title || 'Movie Player'}
        ></iframe>
      </div>

      {/* Movie Details / Overview */}
      <div className="max-w-5xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{movie?.overview || 'No description available.'}</p>
        
        {movie?.release_date && (
          <p className="text-sm text-gray-400 mt-4">
            Release Date: <span className="text-white">{movie.release_date}</span>
          </p>
        )}
      </div>
    </div>
  );
}
