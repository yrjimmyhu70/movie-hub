import { tmdb } from "@/lib/tmdb";
import AdSlot from "@/components/AdSlot";

export default async function MoviePage({ params }) {
  const m = await tmdb(`/movie/${params.id}`, { append_to_response: "videos,credits,watch/providers" });
  const region = process.env.WATCH_REGION || "US";
  const wp = m["watch/providers"]?.results?.[region];
  const trailer = m.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const cast = m.credits?.cast?.slice(0, 10) || [];
  const providers = [...(wp?.flatrate || []), ...(wp?.rent || []), ...(wp?.buy || [])];

  return (
    <main className="detail">
      <h1>{m.title}</h1>
      <p className="meta">
        {(m.release_date || "").slice(0, 4)} • {m.runtime} min • Rating {m.vote_average?.toFixed(1)} • {m.genres.map((g) => g.name).join(", ")}
      </p>
      <p>{m.overview}</p>

      {trailer && (
        <section className="section">
          <h3>Trailer</h3>
          <iframe
            className="trailer"
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
            title="Trailer"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
          />
        </section>
      )}

      <AdSlot id="movie-mid" />

      <section className="section">
        <h3>Kahan dekhein ({region})</h3>
        {providers.length ? (
          <>
            <div className="chips">
              {[...new Map(providers.map((p) => [p.provider_id, p])).values()].map((p) => (
                <span key={p.provider_id} className="chip">{p.provider_name}</span>
              ))}
            </div>
            {wp?.link && <p className="meta"><a href={wp.link} target="_blank" rel="noopener noreferrer">Poori list dekhein</a> (data: JustWatch)</p>}
          </>
        ) : (
          <p className="meta">Is mulk mein koi legal streaming option nahi mila.</p>
        )}
      </section>

      <section className="section">
        <h3>Cast</h3>
        <div className="chips">{cast.map((c) => <span key={c.id} className="chip">{c.name}</span>)}</div>
      </section>
    </main>
  );
}
