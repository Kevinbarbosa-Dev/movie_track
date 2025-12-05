const API_KEY = "10d2820a72cd116ea036df0501d570a1"; // pegue em https://developer.themoviedb.org/docs

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

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

// Image size options for different use cases
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
): string => {
  if (!path) return "/abstract-movie-poster.png";
  return `${"https://image.tmdb.org/t/p"}/${size}${path}`;
};

export async function fetchPopularMovies(page = 1, signal?: AbortSignal) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`TMDB popular fetch failed: ${res.status}`);
  }
  const data = await res.json();
  const anoAtual = new Date().getFullYear();
  // retorna o array de results (cada item tem fields suficientes para o banner)
  const filtrarFilmes = (data.results as Movie[])
    .filter((movie) => {
      const year = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 0;

      return (
        year === anoAtual && // lançado neste ano
        movie.vote_average > 7 && // avaliação > 7
        movie.overview?.trim().length > 0 // precisa ter overview
      );
    })
    .slice(0, 10); // limitar a no máximo 10 filmes

  return filtrarFilmes;
}

export async function fetchMovieDetails(id: number, signal?: AbortSignal) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`TMDB movie details fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data as MovieDetails;
}
