import { CardContent } from "@/components/ui/card";
import { ConteudoSinopse, ConteudoTitulo } from "./ConteudoPoster";

type ConteudoBannerProps = {
  titulo: string;
  sinopse: string;
};

export default function ConteudoBanner({
  titulo,
  sinopse,
}: ConteudoBannerProps) {
  return (
    <div className="w-full">
      <CardContent className="p-0">
        <div className="max-w-full">
          <ConteudoTitulo className="md:text-3xl text-xl font-extrabold text-white">
            {titulo}
          </ConteudoTitulo>
          <ConteudoSinopse className="mt-3 text-sm text-gray-200 leading-relaxed max-h-[6rem] overflow-hidden">
            {sinopse}
          </ConteudoSinopse>
        </div>
      </CardContent>
    </div>
  );
}
