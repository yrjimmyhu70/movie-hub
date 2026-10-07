import { notFound } from "next/navigation";
import movies from "@/data/free-movies.json";
import Player from "@/components/Player";
import AdSlot from "@/components/AdSlot";

export default function Watch({ params }) {
  const i = movies.findIndex((m) => m.slug === params.slug);
  if (i < 0) notFound();
  const m = movies[i];
  const next = movies[(i + 1) % movies.length];

  return (
    <main className="detail">
      <h1>{m.title}</h1>
      <p className="meta">{m.year} • License: {m.license}</p>
      <Player src={m.src} poster={m.poster || undefined} nextHref={next.slug !== m.slug ? `/free/${next.slug}` : undefined} />
      <AdSlot id="watch-below" />
    </main>
  );
}
