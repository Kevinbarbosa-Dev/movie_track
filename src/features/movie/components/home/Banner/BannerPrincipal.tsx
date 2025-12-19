import { Card } from "@/components/ui/card";
import {
  getImageUrl,
  getMovieImages,
  getMovieTrailer,
} from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/home/Banner/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import { type MovieBase } from "@/features/movie/reducer/movieReducer";
import useMoviesFetch from "@/hooks/useMoviesFetch";
import BannerThumbnails from "./BannerThumnails";
import Imagem from "@/components/imagem";
import NenhumBanner from "./NenhumBanner";
import CarouselBanner from "./CarouselBanner";
import { useEffect, useState } from "react";
import ImagensCenas from "./ImagensCenas";

interface MovieBannerProps {
  movieId?: number;
}

export default function BannerPrincipal({ movieId }: MovieBannerProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const { state } = useMoviesFetch({ movieId });
  const { loading, movies, error } = state;
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [sceneImages, setSceneImages] = useState<string[]>([]);
  const currentMovie = movies[currentMovieIndex] ?? null;

  useEffect(() => {
    if (!currentMovie) {
      setSceneImages([]);
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      const url = await getMovieTrailer(currentMovie.id);
      setTrailerUrl(url);
    };

    const fetchSceneImages = async () => {
      const images = await getMovieImages(currentMovie.id);
      setSceneImages(images);
    };

    fetchTrailer();
    fetchSceneImages();
    setShowTrailer(false);
  }, [currentMovie?.id]);

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

  const first = currentMovie as MovieBase | null;

  if (!first) {
    return <NenhumBanner />;
  }

  const url = getImageUrl(first.backdrop_path, "backdrop", "w1280");

  const nextMovie = () => {
    setCurrentMovieIndex((i) => (movies.length ? (i + 1) % movies.length : 0));
  };

  const prevMovie = () => {
    setCurrentMovieIndex((i) =>
      movies.length ? (i - 1 + movies.length) % movies.length : 0
    );
  };

  const handleThumbnailSelect = (movieId: number) => {
    const idx = movies.findIndex((m) => m.id === movieId);
    if (idx >= 0) setCurrentMovieIndex(idx);
  };

  return (
    <>
      <Card className="relative h-[90vh] overflow-hidden rounded-none border-none p-0 z-10">
        <div className="absolute inset-0 w-full h-full">
          <Imagem urlImage={url} title={first.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Conteúdo em cima das overlays */}
        <div className="relative h-full px-4 md:px-8 lg:px-16 flex items-center z-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <ConteudoBanner titulo={first.title} sinopse={first.overview} />
          </div>
        </div>

        {/*cenas */}
        <ImagensCenas sceneImages={sceneImages} />

        <CarouselBanner
          prevMovie={prevMovie}
          nextMovie={nextMovie}
          movies={movies}
          currentIndex={currentMovieIndex}
          onSelect={(idx) => setCurrentMovieIndex(idx)}
        />
      </Card>

      <div className="relative z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {movies && movies.length > 1 && (
            <BannerThumbnails
              movies={movies.slice(1, 10)}
              maxVisible={6}
              onSelect={handleThumbnailSelect}
            />
          )}
        </div>
      </div>

      {/* {trailerUrl && (
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                  onClick={handlePlayClick}
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                  Watch Trailer
                </Button>
              )} */}
    </>
  );
}
