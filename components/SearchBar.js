"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);

  useEffect(() => {
    if (q.trim().length < 2) { setRes([]); return; }
    const t = setTimeout(async () => {
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      setRes(await r.json());
    }, 300); // debounce: har key par request nahi jati
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="search">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Movie search karein" aria-label="Search movies" />
      {res.length > 0 && (
        <div className="results">
          {res.map((m) => (
            <Link key={m.id} href={`/movie/${m.id}`} onClick={() => { setQ(""); setRes([]); }}>
              {m.poster ? <img src={m.poster} alt="" /> : <img alt="" />}
              <div>{m.title}<br /><small>{m.year}</small></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
