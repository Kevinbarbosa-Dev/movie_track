import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import { type MovieBase } from "@/features/movie/reducer/movieReducer";
import BannerImage from "./BannerImage";
import { degradeSombraEsquerda } from "@/styles/Reutilizaveis";
import useMoviesFetch from "@/hooks/useMoviesFetch";

interface MovieBannerProps {
  movieId?: number;
}

export default function BannerPrincipal({ movieId }: MovieBannerProps) {
  const { state } = useMoviesFetch({ movieId });
  const { loading, movies, error } = state;

  if (error) {
    return <div className="text-red-400">Erro: {error}</div>;
  }

  // placeholder skeletons enquanto carrega
  if (loading) {
    const SKELETON_COUNT = 4;
    return (
      <div className="flex gap-2 overflow-x-auto px-2 items-stretch">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonBanner key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto custom-scrollbar px-2 items-stretch">
      {movies.map((m: MovieBase) => {
        const url = m.backdrop_path
          ? getImageUrl(m.backdrop_path, "backdrop", "w780")
          : "/cinematic-movie-backdrop-dark-atmosphere.png";

        return (
          <Card
            key={m.id}
            className="relative w-[500px] h-[300px] flex-shrink-0 rounded-xl border-none"
          >
            <div className="p-0 h-full">
              <BannerImage url={url} titulo={m.title} />

              <div className={degradeSombraEsquerda} />

              <ConteudoBanner titulo={m.title} sinopse={m.overview} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
