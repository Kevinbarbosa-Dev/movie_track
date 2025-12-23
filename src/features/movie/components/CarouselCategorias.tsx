import { categorias } from "@/components/Categorias";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CarouselCategoria() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <Carousel className="w-full">
          <CarouselContent className="flex gap-2 px-2 min-w-max">
            {categorias.map((categoria, index) => (
              <CarouselItem key={index} className="basis-auto">
                <Button
                  variant="ghost"
                  className="whitespace-nowrap text-white px-5 py-4 hover:bg-gray-800 ransition min-w-[120px]"
                >
                  {categoria}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
