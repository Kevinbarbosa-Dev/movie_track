import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonBanner() {
  return (
    <div className="relative w-[500px] flex-shrink-0 overflow-hidden rounded-xl">
      <div className="p-0 h-[300px]">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
