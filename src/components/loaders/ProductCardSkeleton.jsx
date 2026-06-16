import Shimmer from './Shimmer';

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface" aria-busy="true" aria-label="Loading product">
      <Shimmer className="aspect-[4/5] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <Shimmer className="h-5 w-16" />
          <Shimmer className="h-4 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
