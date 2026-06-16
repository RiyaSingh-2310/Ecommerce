import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductRating from './ProductRating';
import { formatPrice, formatCategoryLabel } from '../../utils/filters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

function ProductCard({ product }) {
  const location = useLocation();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div className="absolute right-2 top-2 z-10 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface/95 shadow-sm backdrop-blur-sm transition-colors hover:bg-surface"
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-primary text-primary' : 'text-ink'}`} />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleCart}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm"
          aria-label="Add to cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </motion.button>
      </div>

      <Link
        to={`/product/${product.id}`}
        state={{ from: location.pathname + location.search }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-default bg-surface shadow-card transition-token hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label={`View ${product.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-token-slow group-hover:scale-105"
          />
          {product.brand && (
            <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow-sm backdrop-blur-sm">
              {product.brand}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4 pt-3">
          <p className="label-xs">{formatCategoryLabel(product.category)}</p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-token-fast group-hover:text-primary">
            {product.title}
          </h3>
          <ProductRating rating={product.rating} />
          <div className="mt-auto flex items-baseline justify-between pt-2">
            <span className="text-lg font-bold tracking-tight text-ink">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs font-medium text-success">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default memo(ProductCard);
