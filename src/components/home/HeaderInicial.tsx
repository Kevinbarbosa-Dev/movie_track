import { Button } from "../ui/button";
import InputSearch from "./InputSearch";

export default function HeaderInicial() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-transparent ">
      <div className="max-w-7x1 mx-auto flex items-center justify-between px-4 text-white">
        <h1 className="text-lg font-semibold tracking-wide ">MovieTrack</h1>

        <nav className="flex gap-2">
          <InputSearch />
          <Button
            variant="ghost"
            className="rounded-lg text-sm hover:text-gray-700 px-0"
          >
            Explorar
          </Button>
          <Button
            variant="ghost"
            className="rounded-lg text-sm hover:text-gray-700 px-0"
          >
            Lista de Favoritos
          </Button>
        </nav>
      </div>
    </header>
  );
}
