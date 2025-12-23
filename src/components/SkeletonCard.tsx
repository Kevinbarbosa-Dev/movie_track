import { degradeSombraBaixo } from "@/styles/Reutilizaveis";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="relative w-[200px] rounded overflow-hidden shadow-lg flex-shrink-0 p-0">
      <CardContent className="p-0">
        <Skeleton className="w-[200px] h-[300px]" />
        <div className={degradeSombraBaixo} />
      </CardContent>
    </Card>
  );
}
