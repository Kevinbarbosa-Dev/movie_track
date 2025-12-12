import BannerPrincipal from "@/components/home/BannerPrincipal";
import HeaderInicial from "@/components/home/HeaderInicial";
import { type MovieDetails } from "@/features/movie/api/movieApi";

import FilmePoster from "@/components/FilmePoster";

import useMoviesFetch from "@/hooks/useMoviesFetch";

export default function HomePage() {
  const { state, genreMap } = useMoviesFetch({ fetchGenres: true });
  const { loading, error, movies } = state;

  return (
    <div className="min-h-screen w-full gap-4">
      <div className="relative">
        <HeaderInicial />
        <BannerPrincipal />
      </div>
      <div className="flex gap-4 px-4 items-stretch">
        {/* {movies.map((movie) => {
          return (
            <FilmePoster
              key={movie.id}
              movie={movie as MovieDetails}
              generosMap={genreMap}
              nota={movie.vote_average}
            />
          );
        })} */}
      </div>
    </div>
  );
}
