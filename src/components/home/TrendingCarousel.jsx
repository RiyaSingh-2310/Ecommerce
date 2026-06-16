import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import ProductCardSkeleton from '../loaders/ProductCardSkeleton';
import { formatPrice } from '../../utils/filters';

export default function TrendingCarousel({ products, loading }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="heading-lg">Trending now</h2>
          <p className="mt-1 text-sm text-muted">Most popular picks this week</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-default bg-surface text-muted hover:text-ink" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-default bg-surface text-muted hover:text-ink" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-56 shrink-0"><ProductCardSkeleton /></div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="w-56 shrink-0"
            >
              <Link
                to={`/product/${product.id}`}
                className="block overflow-hidden rounded-2xl border border-default bg-surface shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="aspect-square bg-surface-secondary p-4">
                  <img src={product.thumbnail} alt="" className="h-full w-full object-contain" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium text-ink">{product.title}</p>
                  <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
