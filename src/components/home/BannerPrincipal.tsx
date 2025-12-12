import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import { type MovieBase } from "@/features/movie/reducer/movieReducer";
import BannerImage from "./BannerImage";
import {
  degradeSombraBaixo,
  degradeSombraEsquerda,
} from "@/styles/Reutilizaveis";
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
    <div className="w-full">
      <div className="relative flex items-stretch">
        <div className="md:col-span-5 flex items-stretch bg-[#303030]">
          <Card className="w-full h-[320px] md:h-[430px] rounded-xl border-none overflow-hidden z-30">
            <div className="h-full flex items-end p-6">
              <ConteudoBanner titulo={first.title} sinopse={first.overview} />
            </div>
          </Card>
        </div>

        <div className="md:col-span-7 flex items-stretch ">
          <Card className="relative w-[850px] h-[430px] rounded-none border-none overflow-hidden py-0">
            <BannerImage url={url} titulo={first.title} />
          </Card>
          {/* degradê lateral — só na borda esquerda da imagem */}
          <div className={degradeSombraEsquerda} />

          {/* degradê inferior — escurece a base da imagem */}
          <div className={degradeSombraBaixo} />
        </div>
      </div>
    </div>
  );
}
