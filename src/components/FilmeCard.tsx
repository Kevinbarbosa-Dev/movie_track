import { getImageUrl } from "@/features/movie/api/movieApi";
import ConteudoPoster from "@/features/movie/components/ConteudoPoster";
import { Card, CardContent } from "./ui/card";

export interface MovieMini {
  id: number;
  title: string;
  release_date?: string;
  poster_path: string | null;
  vote_average?: number;
}

export interface FilmCardProps {
  movie: MovieMini | any; // aceita Movie ou MovieDetails do seu projeto
  genres?: string[]; // nomes dos gêneros (opcional). Se passar MovieDetails, passe movie.genres.map(g=>g.name)
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function FilmeCard({
  movie,
  genres = [],
  className = "",
  onClick,
  size = "md",
}: FilmCardProps) {
  const posterUrl = getImageUrl(movie?.poster_path ?? null, "poster", "w342");

  // tamanhos (pode ajustar)
  // const sizes: Record<string, string> = {
  //   sm: "w-[120px] h-[190px]",
  //   md: "w-[160px] h-[260px]",
  //   lg: "w-[200px] h-[320px]",
  // };

  // const wrapperSize = sizes[size] ?? sizes.md;

  // nota
  const nota =
    typeof movie?.vote_average === "number"
      ? Number(movie.vote_average).toFixed(1)
      : null;

  return (
    <Card
      className="relative w-[200px] h-[300px] rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* imagem */}
        <img
          src={posterUrl}
          alt={movie?.title ?? "Poster"}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* overlay geral para contraste */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* degrade próximo ao título (aumenta no hover) */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/85 to-transparent transition-all duration-300 group-hover:from-black/95 pointer-events-none" />

        {/* conteúdo (título + nota + gêneros) */}
        <ConteudoPoster titulo={movie?.title} nota={nota} generos={genres} />
      </CardContent>
    </Card>
  );
}
