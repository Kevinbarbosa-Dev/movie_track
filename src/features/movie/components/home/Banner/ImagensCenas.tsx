import Imagem from "@/components/imagem";
import { getImageUrl } from "@/features/movie/api/movieApi";

type ImagensCenasProps = {
  sceneImages: string[];
};

export default function ImagensCenas({ sceneImages }: ImagensCenasProps) {
  return (
    <div className="hidden lg:flex absolute top-0 right-6 bottom-0 z-30 pointer-events-auto items-center">
      <div className="w-[340px] max-w-[36%] bg-gradient-to-l rounded-md p-4 flex flex-col gap-2">
        {/* Lista de cenas */}
        <div className="grid grid-cols-1 gap-4  w-[280px]">
          {sceneImages.slice(0, 3).map((imagePath, index) => (
            <div
              key={index}
              className="relative h-[120px] rounded-lg overflow-hidden shadow-xl transition-all cursor-pointer group"
            >
              <Imagem
                urlImage={getImageUrl(imagePath, "backdrop", "w500")}
                title={`Cena ${index + 1}`}
                className="group-hover:scale-105 transition-transform duration-300 shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
