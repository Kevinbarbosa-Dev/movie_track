import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MovieBase } from "@/features/movie/reducer/movieReducer";

interface CarouselBannerProps {
  prevMovie: () => void;
  nextMovie: () => void;
  movies: MovieBase[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function CarouselBanner({
  prevMovie,
  nextMovie,
  movies,
  currentIndex,
  onSelect,
}: CarouselBannerProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white z-40 pointer-events-auto">
      <Button
        onClick={prevMovie}
        size="icon"
        variant="outline"
        className="rounded-full bg-transparent"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            aria-label={`Ir para ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      <Button
        onClick={nextMovie}
        size="icon"
        variant="outline"
        className="rounded-full bg-transparent"
        aria-label="Próximo"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
