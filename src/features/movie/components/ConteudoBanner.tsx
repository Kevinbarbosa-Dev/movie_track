import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="relative h-full flex flex-col justify-end  border-none p-0">
      <CardContent className="max-w-2/3 space-y-6 ">
        <ConteudoTitulo className="md:text-2x1 text-lg">
          {titulo}
        </ConteudoTitulo>
        <ConteudoSinopse className="mt-2 text-sm text-gray-200 leading-relaxed max-h-[4.5rem] overflow-hidden">
          {sinopse}
        </ConteudoSinopse>
      </CardContent>
    </Card>
  );
}
