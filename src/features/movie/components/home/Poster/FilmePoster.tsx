import { getImageUrl } from "@/features/movie/api/movieApi";
import { degradeSombraBaixo } from "@/styles/Reutilizaveis";
import type { Movie } from "@/features/movie/types/movie";
import type { MovieBase } from "@/features/movie/reducer/movieReducer";
import {
  ConteudoContainer,
  ConteudoTitulo,
  ConteudoFooter,
} from "@/features/movie/components/ConteudoPoster";

import { Card, CardContent } from "@/components/ui/card";
import Imagem from "@/components/imagem";

export interface FilmCardProps {
  movie: Movie | MovieBase;
  generosMap: Record<number, string>;
  nota?: number;
}

export default function FilmePoster({
  movie,
  generosMap,
  nota,
}: FilmCardProps) {
  const posterUrl = getImageUrl(movie?.poster_path ?? null, "poster", "w342");

  const genreIds =
    movie.genre_ids ?? (movie as any).genres?.map((g: any) => g.id) ?? [];
  const generos = (genreIds as number[])
    .map((id) => generosMap[id])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Card
      className="relative w-[200px] rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group flex-shrink-0 p-0"
      p-0
    >
      <CardContent className="p-0">
        <Imagem urlImage={posterUrl} title={movie.title} />

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
