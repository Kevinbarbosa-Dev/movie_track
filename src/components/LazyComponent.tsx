import { useLoading } from "@/hooks/useLoading";
import { useComponenteVisivel } from "@/hooks/useComponenteVisivel";
import { useEffect, useMemo, useState } from "react";
import FilmePoster from "@/features/movie/components/home/Poster/FilmePoster";
import type { Movie } from "@/features/movie/types/movie";
import type { MovieBase } from "@/features/movie/reducer/movieReducer";
import {
  fetchMovieDetails,
  type MovieDetails,
} from "@/features/movie/api/movieApi";
import SkeletonCard from "./SkeletonCard";

type LazyComponentProps = {
  movie: Movie | MovieBase;
  generosMap: Record<number, string>;
  skeletonDelay?: number;
};

export default function LazyComponent({
  movie,
  generosMap,
  skeletonDelay = 700,
}: LazyComponentProps) {
  const { elementoQueSeraObservado, jaCarregado } =
    useComponenteVisivel<HTMLDivElement>();
  // Não iniciar automaticamente o timer; vamos ativar quando começarmos a busca
  const { estaCarregando, ativarCarregamento } = useLoading(
    skeletonDelay,
    false
  );

  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!(jaCarregado && !details && !isFetching && movie?.id)) return;

    setIsFetching(true);
    ativarCarregamento(); // inicia o skeleton timer

    const controller = new AbortController();

    fetchMovieDetails(movie.id, controller.signal)
      .then((data) => {
        setDetails(data);
      })
      .catch((err: any) => {
        if (err.name === "AbortError") return;
        console.error(err);
      })
      .finally(() => setIsFetching(false));

    return () => controller.abort();
  }, [jaCarregado, movie?.id, ativarCarregamento]);

  const mostrarSkeleton =
    (!details && (isFetching || estaCarregando)) || !jaCarregado;

  const content = useMemo(() => {
    if (mostrarSkeleton) {
      return <SkeletonCard />;
    }

    // Se já trouxe detalhes, renderiza o cartão completo
    if (details) {
      return (
        <FilmePoster
          movie={details}
          generosMap={generosMap}
          nota={details.vote_average}
        />
      );
    }

    // Fallback: se não há detalhes e não está carregando, mostra o poster básico (dados iniciais)
    return (
      <FilmePoster
        movie={movie}
        generosMap={generosMap}
        nota={movie.vote_average}
      />
    );
  }, [mostrarSkeleton, details, movie, generosMap]);

  return (
    <div
      ref={elementoQueSeraObservado}
      aria-busy={mostrarSkeleton ? "true" : "false"}
    >
      {content}
    </div>
  );
}
