import type { MovieDetails } from "../api/movieApi";
import type { Movie } from "../types/movie";

export type MovieBase = Pick<
  Movie,
  "id" | "title" | "overview" | "backdrop_path" | "poster_path" | "vote_average"
> &
  Partial<MovieDetails>;

interface State {
  loading: boolean;
  error: string | null;
  movies: MovieBase[];
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: MovieBase[] }
  | { type: "FETCH_ERROR"; payload: string };

export const initialState: State = {
  loading: false,
  error: null,
  movies: [],
};

export function movieReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null, movies: [] };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, movies: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
