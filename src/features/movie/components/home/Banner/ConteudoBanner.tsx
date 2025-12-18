import { ConteudoTitulo } from "../../ConteudoPoster";
import EntrarFavoritar from "./EntrarFavoritar";

type ConteudoBannerProps = {
  titulo: string;
  sinopse: string;
};

export default function ConteudoBanner({ titulo }: ConteudoBannerProps) {
  return (
    <div className="flex-1 space-y-4 max-w-2xl">
      <ConteudoTitulo className="text-5xl md:text-6xl font-bold text-balance">
        {titulo}
      </ConteudoTitulo>
      <EntrarFavoritar />
    </div>
  );
}
