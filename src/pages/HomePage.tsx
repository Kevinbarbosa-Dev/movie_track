import BannerPrincipal from "@/features/movie/components/home/Banner/BannerPrincipal";
import HeaderInicial from "@/features/movie/components/home/HeaderInicial";

import useMoviesFetch from "@/hooks/useMoviesFetch";
import LazyComponent from "@/components/LazyComponent";

export default function HomePage() {
  const { state, genreMap } = useMoviesFetch({ fetchGenres: true });
  const { movies } = state;

  return (
    <div className="min-h-screen w-full gap-4">
      <div className="relative mb-50">
        <HeaderInicial />
        <BannerPrincipal />
      </div>
      <div className="flex gap-4 px-4 overflow-x-auto">
        {movies.map((movie) => {
          return (
            <LazyComponent
              key={movie.id}
              movie={movie}
              generosMap={genreMap}
              skeletonDelay={700}
            />
          );
        })}
      </div>
    </div>
  );
}
