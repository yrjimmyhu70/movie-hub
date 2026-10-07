import { NextResponse } from "next/server";
import { tmdb, img } from "@/lib/tmdb";

export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q") || "";
  if (q.trim().length < 2) return NextResponse.json([]);
  const data = await tmdb("/search/movie", { query: q, include_adult: "false" });
  return NextResponse.json(
    data.results.slice(0, 8).map((m) => ({
      id: m.id,
      title: m.title,
      year: (m.release_date || "").slice(0, 4),
      poster: img(m.poster_path, "w92"),
    }))
  );
}
