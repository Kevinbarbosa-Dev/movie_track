import { ConteudoTitulo } from "../../ConteudoPoster";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";

type ConteudoBannerProps = {
  titulo: string;
  sinopse: string;
};

export default function ConteudoBanner({ titulo }: ConteudoBannerProps) {
  return (
    <div className="flex-1 space-y-6 max-w-2xl">
      <ConteudoTitulo className="text-5xl md:text-7xl font-bold text-balance">
        {titulo}
      </ConteudoTitulo>
      <div className="flex items-center gap-3 text-white">
        <Button size="lg" className="gap-2 text-lg px-8">
          <Play className="h-5 w-5" fill="currentColor" />
          Entrar
        </Button>

        <Button size="lg" variant="default" className="gap-2">
          <Heart className="h-5 w-5" />
          <span className="hidden md:inline">Favoritar</span>
        </Button>
      </div>
    </div>
  );
}
