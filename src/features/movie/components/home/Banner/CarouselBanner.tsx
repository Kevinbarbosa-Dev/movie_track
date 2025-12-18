import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselBanner() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white">
      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-transparent"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex gap-2">
        <button
          className={`h-2 rounded-full transition-all w-8 bg-primary"
              }`}
        />
      </div>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-transparent"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
