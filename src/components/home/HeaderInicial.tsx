import { Button } from "../ui/button";
import InputSearch from "./InputSearch";

export default function HeaderInicial() {
  return (
    <header className="w-full flex items-center justify-between border-b border-gray-500 px-4 py-2">
      <h1 className="text-lg font-semibold tracking-wide">MovieTrack</h1>

      <nav className="flex gap-4">
        <Button
          variant="ghost"
          className="rounded-lg text-sm hover:text-gray-700"
        >
          Explorar
        </Button>
        <Button
          variant="ghost"
          className="rounded-lg text-sm hover:text-gray-700"
        >
          Lista de Favoritos
        </Button>
      </nav>

      <InputSearch />
    </header>
  );
}
