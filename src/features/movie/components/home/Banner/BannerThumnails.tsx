import Imagem from "@/components/imagem";
import { getImageUrl } from "@/features/movie/api/movieApi";
import type { MovieBase } from "@/features/movie/reducer/movieReducer";
import {
  degradeSombraBaixo,
  tamanhosBannerThumbnails,
} from "@/styles/Reutilizaveis";
import { ConteudoTitulo } from "../../ConteudoPoster";

type Props = {
  movies: MovieBase[];
  maxVisible?: number;
};

export default function BannerThumbnails({ movies, maxVisible = 6 }: Props) {
  const items = movies.slice(0, maxVisible);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8.5rem] z-50 w-full pointer-events-auto">
      <div className="mx-4 md:mx-0">
        <div className="flex gap-2 overflow-x-auto overflow-y-visible px-2">
          {items.map((m) => {
            const urlImage =
              getImageUrl(m.backdrop_path, "backdrop", "w342") ?? null;

            return (
              <button
                key={m.id}
                aria-label={m.title}
                className={`${tamanhosBannerThumbnails} group relative z-40 flex-shrink-0 rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:z-50`}
              >
                <Imagem urlImage={urlImage} title={m.title} />

                <div className={degradeSombraBaixo} />

                <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-start">
                  <ConteudoTitulo className="text-xs md:text-sm font-bold text-white leading-tight line-clamp-2 drop-shadow">
                    {m.title}
                  </ConteudoTitulo>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
