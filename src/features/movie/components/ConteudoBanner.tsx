import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
        <CardTitle className="text-white text-lg md:text-2xl font-bold leading-tight">
          {titulo}
        </CardTitle>

        <p className="mt-2 text-sm text-gray-200 leading-relaxed max-h-[4.5rem] overflow-hidden">
          {sinopse}
        </p>
      </CardContent>
    </Card>
  );
}
