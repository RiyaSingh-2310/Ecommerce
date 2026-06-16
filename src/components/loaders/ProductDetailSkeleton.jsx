import Shimmer from './Shimmer';

export default function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2" aria-busy="true" aria-label="Loading product details">
      <Shimmer className="aspect-square w-full rounded-3xl" />
      <div className="space-y-5">
        <Shimmer className="h-4 w-24 rounded-full" />
        <Shimmer className="h-10 w-full" />
        <Shimmer className="h-10 w-1/3" />
        <Shimmer className="h-5 w-28" />
        <div className="space-y-2 pt-4">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
