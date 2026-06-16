import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { getProductById } from '../services/productService';
import ShelfEmptyState from '../components/shared/ShelfEmptyState';
import Button from '../components/ui/Button';
import ProductRating from '../components/product/ProductRating';
import { formatPrice } from '../utils/filters';
import { toast } from 'sonner';

export default function WishlistPage() {
  useDocumentTitle('Wishlist');
  const { items, removeItem, isLoading } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = async (item) => {
    try {
      const product = await getProductById(item.id);
      addItem(product, 1, { silent: true });
      removeItem(item.id, { silent: true });
    } catch {
      addItem(item, 1, { silent: true });
      removeItem(item.id, { silent: true });
    }
    toast.success('Moved to cart', { description: item.title });
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="aspect-[4/5] shimmer rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (items.length === 0) {
    return (
      <ShelfEmptyState
        icon={Heart}
        title="No items in wishlist"
        description="Save items you adore and revisit them anytime. Tap the heart on any product to start."
        ctaLabel="Browse products"
        ctaTo="/products"
      />
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Wishlist</h1>
        <p className="mt-1 text-sm text-muted">{items.length} saved items</p>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-2xl border border-default bg-surface shadow-card"
          >
            <Link to={`/product/${item.id}`} className="relative block aspect-[4/5] bg-surface-secondary p-4">
              <img src={item.thumbnail} alt="" className="h-full w-full object-contain transition-transform group-hover:scale-105" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.id}`} className="line-clamp-2 text-sm font-semibold text-ink hover:text-primary">
                {item.title}
              </Link>
              <ProductRating rating={item.rating} className="mt-2" />
              <p className="mt-2 text-lg font-bold text-ink">{formatPrice(item.price)}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleMoveToCart(item)}>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add to cart
                </Button>
                <Link to={`/product/${item.id}`}>
                  <Button size="sm" variant="secondary" aria-label="Quick view">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Button size="sm" variant="secondary" onClick={() => removeItem(item.id)} aria-label="Remove">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageContainer>
  );
}
