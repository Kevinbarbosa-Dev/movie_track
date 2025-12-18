import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";

export default function EntrarFavoritar() {
  return (
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
  );
}
