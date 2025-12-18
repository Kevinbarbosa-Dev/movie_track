import { Card } from "@/components/ui/card";

export default function NenhumBanner() {
  return (
    <div className="w-full">
      <Card className="relative w-full max-w-4xl h-[220px] md:h-[300px] mx-auto rounded-xl border-none overflow-hidden">
        <div className="p-0 h-full bg-gray-800/30 flex items-center justify-center">
          <div className="text-gray-300">Nenhum banner disponível</div>
        </div>
      </Card>
    </div>
  );
}
