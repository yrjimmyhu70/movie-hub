'use client';

export default function Player({ movieId, tmdbId }) {
  // Agar prop name movieId hai ya tmdbId, dono ko handle kar le ga
  const id = movieId || tmdbId;

  if (!id) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-white rounded-lg">
        <p>Movie ID nahi mili.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-black border border-gray-800">
      <iframe
        src={`https://vidsrc.me/embed/movie/${id}`}
        className="w-full h-full border-0"
        allowFullScreen
        scrolling="no"
        title="Movie Player"
      ></iframe>
    </div>
  );
}
