import React, { useEffect, useReducer } from "react";
import {
  fetchGenres,
  fetchMovieDetails,
  fetchPopularMovies,
} from "@/features/movie/api/movieApi";
import {
  initialState,
  movieReducer,
  type MovieBase,
} from "@/features/movie/reducer/movieReducer";

interface UseMoviesFetchOptions {
  movieId?: number;
  fetchGenres?: boolean;
}

interface UseMoviesFetchReturn {
  state: ReturnType<typeof movieReducer>;
  genreMap: Record<number, string>;
}

export default function useMoviesFetch({
  movieId,
  fetchGenres: shouldFetchGenres = false,
}: UseMoviesFetchOptions = {}): UseMoviesFetchReturn {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const [genreMap, setGenreMap] = React.useState<Record<number, string>>({});

  useEffect(() => {
    const ac = new AbortController();
    dispatch({ type: "FETCH_START" });

    const load = async () => {
      try {
        // buscar gêneros se solicitado
        if (shouldFetchGenres) {
          const genresList = await fetchGenres(ac.signal);
          const map = Object.fromEntries(
            genresList.map((g) => [g.id, g.name])
          ) as Record<number, string>;
          setGenreMap(map);
        }

        // buscar filmes
        let resultado: MovieBase[] = [];
        if (movieId) {
          const detalhes = await fetchMovieDetails(movieId, ac.signal);
          resultado = [detalhes];
        } else {
          const populares = await fetchPopularMovies(1, ac.signal);
          resultado = populares;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: resultado });
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Erro ao buscar filmes:", err);
          dispatch({
            type: "FETCH_ERROR",
            payload: err.message ?? "Não foi possível carregar filmes.",
          });
        }
      }
    };

    load();
    return () => ac.abort();
  }, [movieId, shouldFetchGenres]);

  return { state, genreMap };
}
