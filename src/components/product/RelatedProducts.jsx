import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../loaders/ProductCardSkeleton';
import { formatCategoryLabel } from '../../utils/filters';
import { staggerContainer, staggerItem } from '../../constants/motion';

function ProductRow({ title, subtitle, products, loading, viewAllTo }) {
  if (!loading && products.length === 0) return null;

  return (
    <section className="mt-12 border-t border-default pt-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="heading-md">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default function RelatedProducts({
  related,
  similar,
  category,
  loading,
}) {
  const categoryLabel = formatCategoryLabel(category);
  const categoryLink = category ? `/products?category=${encodeURIComponent(category)}` : '/products';

  return (
    <>
      <ProductRow
        title="Related products"
        subtitle="Customers also viewed"
        products={related}
        loading={loading}
      />
      <ProductRow
        title={`More from ${categoryLabel}`}
        subtitle="Similar items in this category"
        products={similar}
        loading={loading}
        viewAllTo={categoryLink}
      />
    </>
  );
}
