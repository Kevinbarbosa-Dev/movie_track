import { getImageUrl } from "@/features/movie/api/movieApi";
import BannerImage from "../Banner/BannerImage";
import { degradeSombraBaixo } from "@/styles/Reutilizaveis";
import type { Movie } from "@/features/movie/types/movie";
import {
  ConteudoContainer,
  ConteudoTitulo,
  ConteudoFooter,
} from "@/features/movie/components/ConteudoPoster";

import { Card, CardContent } from "@/components/ui/card";

export interface FilmCardProps {
  movie: Movie;
  generosMap: Record<number, string>;
  nota?: number;
}

export default function FilmePoster({
  movie,
  generosMap,
  nota,
}: FilmCardProps) {
  const posterUrl = getImageUrl(movie?.poster_path ?? null, "poster", "w342");

  const generos = movie.genre_ids
    .map((id) => generosMap[id])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Card className="relative w-[200px] h-[300px] rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group flex-shrink-0">
      <CardContent className="p-0">
        <BannerImage url={posterUrl} titulo={movie.title} />

        <div className={degradeSombraBaixo} />

        <ConteudoContainer>
          <ConteudoTitulo className="md:text-base text-sm">
            {movie.title}
          </ConteudoTitulo>

          <ConteudoFooter nota={nota?.toFixed(1)} generos={generos} />
        </ConteudoContainer>
      </CardContent>
    </Card>
  );
}
