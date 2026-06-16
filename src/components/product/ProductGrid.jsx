import { memo } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../loaders/ProductCardSkeleton';
import EmptyState from '../shared/EmptyState';
import ErrorState from '../shared/ErrorState';

function ProductGrid({ products, loading, error, onRetry, onReset }) {
  if (error) {
    return (
      <div className="col-span-full">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (loading) {
    return (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (products.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default memo(ProductGrid);
