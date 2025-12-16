import { getImageUrl } from "@/features/movie/api/movieApi";
import type { MovieBase } from "@/features/movie/reducer/movieReducer";
import { degradeSombraBaixo } from "@/styles/Reutilizaveis";

type Props = {
  movies: MovieBase[];
  maxVisible?: number;
};

export default function BannerThumbnails({ movies, maxVisible = 6 }: Props) {
  const items = movies.slice(0, maxVisible);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8rem] z-30 w-full pointer-events-auto">
      <div className="mx-4 md:mx-0">
        <div className="flex gap-3 overflow-x-auto px-2">
          {items.map((m) => {
            const url = m.backdrop_path ?? m.poster_path ?? null;

            const img = url
              ? getImageUrl(
                  url,
                  url === m.backdrop_path ? "backdrop" : "poster",
                  "w342"
                )
              : "/placeholder_poster.png";

            return (
              <button
                key={m.id}
                aria-label={m.title}
                className="
                  group relative flex-shrink-0
                  w-[170px] md:w-[210px] lg:w-[240px]
                  h-[96px] md:h-[112px] lg:h-[128px]
                  rounded-lg overflow-hidden
                  shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                  transition-transform duration-300
                  hover:-translate-y-1 hover:scale-105
                "
              >
                {/* IMAGEM */}
                <img
                  src={img}
                  alt={m.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* SOMBRA / DEGRADÊ */}
                <div className={degradeSombraBaixo} />

                {/* TÍTULO */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="block text-xs md:text-sm font-semibold text-white leading-tight line-clamp-2 drop-shadow">
                    {m.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
