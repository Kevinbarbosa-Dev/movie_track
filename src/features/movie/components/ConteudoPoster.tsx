interface ConteudoPosterProps {
  titulo: string;
  nota: string | null;
  generos?: string[];
}

export default function ({ titulo, nota, generos = [] }: ConteudoPosterProps) {
  const genreList = generos.length > 0 ? generos.slice(0, 2) : [];
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 z-10  space-y-4 rounded-md bg-black/30">
      <h3
        className="text-white font-semibold text-sm md:text-base leading-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
        title={titulo}
      >
        {titulo}
      </h3>

      {/* linha inferior: nota à esquerda, gêneros à direita */}
      <div className="mt-2 flex items-center justify-between gap-2">
        {/* Nota */}
        <div className="inline-flex items-center gap-2 pointer-events-auto">
          <span className="text-[10px] text-gray-300">Nota</span>
          <span className="text-xs font-semibold bg-black/50 px-2 py-0.5 rounded-md border border-white/10 text-white">
            {nota ?? "—"}
          </span>
        </div>

        {/* Gêneros (pills) */}
        <div className="flex gap-2">
          {genreList.length > 0 ? (
            genreList.map((g, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 bg-black/30 text-gray-200"
              >
                {g}
              </span>
            ))
          ) : (
            <span className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 bg-black/30 text-gray-200">
              {/* fallback: categoria desconhecida */}—
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
