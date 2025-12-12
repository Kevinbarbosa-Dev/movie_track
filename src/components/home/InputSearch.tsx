import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { iconeComInput } from "@/styles/Reutilizaveis";

export default function InputSearch() {
  return (
    <div className="relative w-full max-w-xs">
      <Search className={iconeComInput} />
      {/* <Input
        type="text"
        placeholder="Pesquisar..."
        className="rounded-md bg-[#202020] border-none outline-none text-sm placeholder:text-gray-400 text-gray-200"
      /> */}
    </div>
  );
}
