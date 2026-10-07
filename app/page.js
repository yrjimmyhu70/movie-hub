import Link from "next/link";
import { tmdb, img } from "@/lib/tmdb";
import Row from "@/components/Row";
import AdSlot from "@/components/AdSlot";

export default async function Home() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    tmdb("/trending/movie/week"),
    tmdb("/movie/popular"),
    tmdb("/movie/top_rated"),
    tmdb("/movie/upcoming"),
  ]);
  const hero = trending.results[0];

  return (
    <main>
      <section
        className="hero"
        style={{ backgroundImage: `linear-gradient(to top, #0e1116 5%, rgba(14,17,22,.2)), url(${img(hero.backdrop_path, "w1280")})` }}
      >
        <div className="hero-in">
          <h1>{hero.title}</h1>
          <p>{hero.overview}</p>
          <Link href={`/movie/${hero.id}`} className="btn">Details aur Trailer</Link>
        </div>
      </section>

      <Row title="Is hafte trending" items={trending.results.slice(1)} />
      <AdSlot id="home-top" />
      <Row title="Popular" items={popular.results} />
      <Row title="Top rated" items={topRated.results} />
      <AdSlot id="home-bottom" />
      <Row title="Aane wali" items={upcoming.results} />
    </main>
  );
}
