import Link from "next/link";
import { img } from "@/lib/tmdb";

export default function Row({ title, items }) {
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="track">
        {items.map((m) => (
          <Link key={m.id} href={`/movie/${m.id}`} className="card">
            {m.poster_path ? <img src={img(m.poster_path)} alt={m.title} loading="lazy" /> : <div className="noimg">{m.title}</div>}
            <span>{m.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
