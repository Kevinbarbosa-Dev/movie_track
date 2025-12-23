import type { Movie } from "../types/movie";
import { IMAGE_SIZES } from "./imageSizes";

const API_KEY = "10d2820a72cd116ea036df0501d570a1";
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

export const getImageUrl = (
  path: string | null,
  type: "backdrop" | "poster" = "backdrop",
  size: string = type === "backdrop"
    ? IMAGE_SIZES.backdrop.large
    : IMAGE_SIZES.poster.medium
) => {
  return path ? `${IMAGE_BASE}/${size}${path}` : `/placeholder_poster.png`;
};

const movieDetailsCache = new Map<number, MovieDetails>();

export async function fetchMovieDetails(id: number, signal?: AbortSignal) {
  // retorna cache imediatamente se existir
  const cached = movieDetailsCache.get(id);
  if (cached) return cached;
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`TMDB movie details fetch failed: ${res.status}`);
  }
  const data = await res.json();
  // só guarda no cache se não foi abortado
  if (!signal || !signal.aborted) {
    movieDetailsCache.set(id, data);
  }
  return data as MovieDetails;
}

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

export async function getMovieTrailer(movieId: number): Promise<string | null> {
  try {
    const res = await fetch(
      `${BASE}/movie/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`
    );

    if (!res.ok) return null;

    const data = await res.json();
    const trailer = data.results?.find(
      (video: any) =>
        (video.type === "Trailer" || video.type === "Teaser") &&
        video.site === "YouTube"
    );

    if (trailer) {
      return `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function getMovieImages(
  movieId: number,
  count = 3
): Promise<string[]> {
  try {
    const res = await fetch(
      `${BASE}/movie/${movieId}/images?api_key=${API_KEY}`
    );

    if (!res.ok) return [];

    const data = await res.json();

    // Get backdrop images (scene screenshots) and filter out null/undefined
    const backdrops = (data.backdrops || [])
      .map((img: any) => img.file_path)
      .filter(Boolean)
      .slice(0, count);

    return backdrops;
  } catch (error) {
    return [];
  }
}
