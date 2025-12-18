import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/home/Banner/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import { type MovieBase } from "@/features/movie/reducer/movieReducer";
import {
  degradeSombraBaixo,
  degradeSombraEsquerda,
} from "@/styles/Reutilizaveis";
import useMoviesFetch from "@/hooks/useMoviesFetch";
import BannerThumbnails from "./BannerThumnails";
import Imagem from "@/components/imagem";
import NenhumBanner from "./NenhumBanner";
import CarouselBanner from "./CarouselBanner";

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

  const first = movies && movies.length > 0 ? (movies[0] as MovieBase) : null;

  if (!first) {
    return <NenhumBanner />;
  }

  const url = getImageUrl(first.backdrop_path, "backdrop", "w1280");

  return (
    <>
      <Card className="relative h-[80vh] overflow-hidden rounded-none border-none p-0 z-10">
        <div className="absolute inset-0 flex justify-end">
          <div className="relative w-[75%] h-full">
            <Imagem urlImage={url} title={first.title} />
          </div>
        </div>

        <div className={degradeSombraEsquerda} />

        <div className={degradeSombraBaixo} />

        {/* Conteúdo em cima das overlays */}
        <div className="relative h-full px-4 md:px-8 lg:px-16 flex items-center z-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <ConteudoBanner titulo={first.title} sinopse={first.overview} />
          </div>
        </div>

        <CarouselBanner />
      </Card>
      <div className="relative z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {movies && movies.length > 1 && (
            <BannerThumbnails movies={movies.slice(1, 10)} maxVisible={6} />
          )}
        </div>
      </div>
    </>
  );
}
