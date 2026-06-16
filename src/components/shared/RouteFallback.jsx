import ProductCardSkeleton from '../loaders/ProductCardSkeleton';
import PageContainer from '../layout/PageContainer';

export default function RouteFallback() {
  return (
    <PageContainer>
      <div className="mb-8 space-y-3">
        <div className="h-3 w-20 shimmer rounded" />
        <div className="h-8 w-56 shimmer rounded-xl" />
        <div className="h-4 w-36 shimmer rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </PageContainer>
  );
}
