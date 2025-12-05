import { Card } from "@/components/ui/card";
import {
  fetchMovieDetails,
  fetchPopularMovies,
  getImageUrl,
  type Movie,
  type MovieDetails,
} from "@/features/movie/api/movieApi";
import ConteudoBanner from "@/features/movie/components/ConteudoBanner";
import SkeletonBanner from "@/features/movie/components/SkeletonBanner";
import {
  initialState,
  movieReducer,
  type MovieBase,
} from "@/features/movie/reducer/movieReducer";
import { useEffect, useReducer } from "react";
import BannerImage from "./home/BannerImage";
import { degradeSombra } from "@/styles/Reutilizaveis";

interface MovieBannerProps {
  movieId?: number;
}

export default function BannerPrincipal({ movieId }: MovieBannerProps) {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { loading, movies, error } = state;

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "FETCH_START" });

    const ativarCarregamento = async () => {
      try {
        let resultado: (Movie | MovieDetails)[] = [];
        if (movieId) {
          const detalhes = await fetchMovieDetails(movieId, controller.signal);
          resultado = [detalhes];
        } else {
          const populares = await fetchPopularMovies(1, controller.signal);
          resultado = populares;
        }
        dispatch({ type: "FETCH_SUCCESS", payload: resultado });
      } catch (err: any) {
        if (err.name === "AbortError") return;
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message ?? "Erro ao buscar filmes",
        });
      }
    };
    ativarCarregamento();
    return () => controller.abort();
  }, [movieId]);

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

              <div className={degradeSombra} />

              <ConteudoBanner titulo={m.title} sinopse={m.overview} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
