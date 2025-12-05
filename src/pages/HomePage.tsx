import BannerPrincipal from "@/components/BannerPrincipal";
import FilmeCard from "@/components/FilmeCard";
import HeaderInicial from "@/components/home/HeaderInicial";
import type { MovieDetails } from "@/features/movie/api/movieApi";
import { sampleMovies } from "@/features/movie/Mock/SampleMovies";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    // simula um fetch inicial
    setMovies(sampleMovies);
  }, []);
  return (
    <div className="min-h-screen w-full gap-4">
      <HeaderInicial />
      <BannerPrincipal />
      <div className="flex gap-4 overflow-x-auto px-4">
        {movies.map((movie) => (
          <FilmeCard
            key={movie.id}
            movie={movie}
            genres={movie.genres?.map((g) => g.name) || []}
            size="md"
            onClick={() => console.log("Abrir detalhes de:", movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
