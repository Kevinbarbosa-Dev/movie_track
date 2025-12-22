import BannerPrincipal from "@/features/movie/components/home/Banner/BannerPrincipal";
import HeaderInicial from "@/features/movie/components/home/HeaderInicial";
import { type MovieDetails } from "@/features/movie/api/movieApi";

import useMoviesFetch from "@/hooks/useMoviesFetch";
import FilmePoster from "@/features/movie/components/home/Poster/FilmePoster";

export default function HomePage() {
  const { state, genreMap } = useMoviesFetch({ fetchGenres: true });
  const { loading, error, movies } = state;

  return (
    <div className="min-h-screen w-full gap-4">
      <div className="relative mb-40">
        <HeaderInicial />
        <BannerPrincipal />
      </div>
      <div className="flex gap-4 px-4 overflow-x-auto">
        {movies.map((movie) => {
          return (
            <FilmePoster
              key={movie.id}
              movie={movie as MovieDetails}
              generosMap={genreMap}
              nota={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
}
