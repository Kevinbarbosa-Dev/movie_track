import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/home/Banner/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import { type MovieBase } from "@/features/movie/reducer/movieReducer";
import BannerImage from "./BannerImage";
import {
  degradeSombraBaixo,
  degradeSombraEsquerda,
} from "@/styles/Reutilizaveis";
import useMoviesFetch from "@/hooks/useMoviesFetch";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BannerThumbnails from "./BannerThumnails";

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
    // fallback quando não há filme
    return (
      <div className="w-full">
        <Card className="relative w-full max-w-4xl h-[220px] md:h-[300px] mx-auto rounded-xl border-none overflow-hidden">
          <div className="p-0 h-full bg-gray-800/30 flex items-center justify-center">
            <div className="text-gray-300">Nenhum banner disponível</div>
          </div>
        </Card>
      </div>
    );
  }

  const url = first.backdrop_path
    ? getImageUrl(first.backdrop_path, "backdrop", "w1280")
    : "/cinematic-movie-backdrop-dark-atmosphere.png";

  return (
    <>
      <Card className="relative h-[80vh] overflow-hidden rounded-none border-none p-0">
        <div className="absolute inset-0 flex justify-end">
          <div className="relative w-[75%] h-full">
            <BannerImage url={url} titulo={first.title} />
          </div>
        </div>

        <div className={degradeSombraEsquerda} />

        <div className={degradeSombraBaixo} />

        {/* Conteúdo em cima das overlays */}
        <div className="relative h-full px-4 md:px-8 lg:px-16 flex items-center z-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 w-full max-w-7xl">
            <ConteudoBanner titulo={first.title} sinopse={first.overview} />
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            <button
              className={`h-2 rounded-full transition-all w-8 bg-primary"
              }`}
            />
          </div>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
      <div className="relative ">
        {movies && movies.length > 1 && (
          <BannerThumbnails movies={movies.slice(1, 10)} maxVisible={6} />
        )}
      </div>
    </>
  );
}
