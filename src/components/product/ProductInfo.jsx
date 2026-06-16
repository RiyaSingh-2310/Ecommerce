import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import { formatPrice, formatCategoryLabel } from '../../utils/filters';
import Button from '../ui/Button';
import QuantitySelector from '../ui/QuantitySelector';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

const item = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="lg:sticky lg:top-4 lg:self-start">
      <div className="space-y-6">
        <motion.div custom={0} initial="hidden" animate="show" variants={item}>
          <div className="flex flex-wrap gap-2">
            {product.brand && (
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                {product.brand}
              </span>
            )}
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-secondary transition-colors hover:text-primary"
            >
              {formatCategoryLabel(product.category)}
            </Link>
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={item}
          className="heading-xl text-2xl sm:text-3xl lg:text-4xl"
        >
          {product.title}
        </motion.h1>

        <motion.div custom={2} initial="hidden" animate="show" variants={item}>
          <ProductRating rating={product.rating} size="lg" />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="show" variants={item} className="flex items-baseline gap-3">
          <span className="text-3xl font-bold tracking-tight text-ink">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="rounded-lg bg-success-soft px-2 py-0.5 text-sm font-semibold text-success">
              {Math.round(product.discountPercentage)}% off
            </span>
          )}
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="show" variants={item} className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-surface-muted p-3 text-xs text-secondary">
            <Truck className="h-4 w-4 shrink-0 text-primary" />
            Free shipping over $50
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-surface-muted p-3 text-xs text-secondary">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            Secure checkout
          </div>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={item}
          className="rounded-2xl bg-surface-muted p-5"
        >
          <h2 className="label-xs mb-2">Description</h2>
          <p className="body-sm text-secondary">{product.description}</p>
        </motion.div>

        <motion.dl
          custom={6}
          initial="hidden"
          animate="show"
          variants={item}
          className="grid grid-cols-2 gap-4 text-sm"
        >
          <div className="rounded-xl bg-surface-muted p-3">
            <dt className="text-xs text-muted">SKU</dt>
            <dd className="mt-1 font-medium text-ink">{product.sku || product.id}</dd>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <dt className="text-xs text-muted">Stock</dt>
            <dd className="mt-1 font-medium text-ink">{product.stock} available</dd>
          </div>
        </motion.dl>
      </div>

      <motion.div
        custom={7}
        initial="hidden"
        animate="show"
        variants={item}
        className="mt-8 space-y-4 rounded-2xl bg-surface p-4 shadow-elevated"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary">Quantity</span>
          <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock || 99} />
        </div>
        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => addItem(product, quantity)}>
            <ShoppingBag className="h-4 w-4" />
            {inCart ? 'Add more' : 'Add to cart'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => toggleItem(product)}
            aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
