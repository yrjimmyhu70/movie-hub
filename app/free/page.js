import Link from "next/link";
import movies from "@/data/free-movies.json";

export default function Free() {
  return (
    <main className="detail">
      <h1>Free Movies</h1>
      <p className="meta">Yeh movies open license ya public domain hain, is liye legally stream ho sakti hain.</p>
      <div className="track" style={{ flexWrap: "wrap" }}>
        {movies.map((m) => (
          <Link key={m.slug} href={`/free/${m.slug}`} className="card">
            <div className="noimg">{m.title}</div>
            <span>{m.title} ({m.year})</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
