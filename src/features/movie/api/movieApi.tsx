import type { Movie } from "../types/movie";

const API_KEY = "10d2820a72cd116ea036df0501d570a1"; // pegue em https://developer.themoviedb.org/docs
const BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

export const IMAGE_SIZES = {
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280", // Recommended for banners
    original: "original",
  },
  poster: {
    small: "w154",
    medium: "w342",
    large: "w500",
    xlarge: "w780",
    original: "original",
  },
};

// Helper function to build image URLs - client-safe
export const getImageUrl = (
  path: string | null,
  type: "backdrop" | "poster" = "backdrop",
  size: string = type === "backdrop"
    ? IMAGE_SIZES.backdrop.large
    : IMAGE_SIZES.poster.medium
) => {
  return path ? `${IMAGE_BASE}/${size}${path}` : `/placeholder_poster.png`;
};

export async function fetchPopularMovies(page = 1, signal?: AbortSignal) {
  const res = await fetch(
    `${BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`TMDB popular fetch failed: ${res.status}`);
  }
  const data = await res.json();
  const results = Array.isArray(data?.results) ? (data.results as Movie[]) : [];
  const filtrarFilmes = results
    .filter((movie) => movie.poster_path && movie.overview?.trim().length > 0)
    .slice(0, 10);

  return filtrarFilmes;
}

export async function fetchMovieDetails(id: number, signal?: AbortSignal) {
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`TMDB movie details fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data as MovieDetails;
}

export async function fetchGenres(signal?: AbortSignal) {
  const res = await fetch(
    `${BASE}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`,
    { signal }
  );
  if (!res.ok) throw new Error(`TMDB genres fetch failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.genres)
    ? (data.genres as { id: number; name: string }[])
    : [];
}
