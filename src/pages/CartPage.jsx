import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCart } from '../hooks/useCart';
import QuantitySelector from '../components/ui/QuantitySelector';
import Button from '../components/ui/Button';
import ShelfEmptyState from '../components/shared/ShelfEmptyState';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/filters';
import { toast } from 'sonner';

function OrderSummary({ subtotal, tax, total, itemCount }) {
  return (
    <div className="rounded-2xl border border-default bg-surface p-6 shadow-card lg:sticky lg:top-4">
      <h2 className="heading-md mb-4">Order summary</h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between text-secondary">
          <dt>Subtotal ({itemCount} items)</dt>
          <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-secondary">
          <dt>Estimated tax</dt>
          <dd className="font-medium text-ink">{formatPrice(tax)}</dd>
        </div>
        <div className="border-t border-default pt-3 flex justify-between">
          <dt className="font-semibold text-ink">Total</dt>
          <dd className="text-lg font-bold text-primary">{formatPrice(total)}</dd>
        </div>
      </dl>
      <Button className="mt-6 w-full" onClick={() => toast.success('Checkout', { description: 'Demo checkout — order placed!' })}>
        Proceed to checkout
      </Button>
      <Link to="/products" className="mt-3 block">
        <Button variant="secondary" className="w-full">Continue shopping</Button>
      </Link>
    </div>
  );
}

export default function CartPage() {
  useDocumentTitle('Cart');
  const {
    items, itemCount, subtotal, tax, total, removeItem, updateQuantity, isLoading,
  } = useCart();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-28 shimmer rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (items.length === 0) {
    return (
      <ShelfEmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Discover something you love and add it to your cart. Great finds are just a scroll away."
        ctaLabel="Shop now"
        ctaTo="/products"
      />
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Shopping cart</h1>
        <p className="mt-1 text-sm text-muted">{itemCount} items in your cart</p>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 rounded-2xl border border-default bg-surface p-4 shadow-card sm:gap-6"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="h-24 w-24 rounded-xl bg-surface-secondary object-contain p-2 sm:h-28 sm:w-28"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <Link to={`/product/${item.id}`} className="line-clamp-2 text-sm font-semibold text-ink hover:text-primary">
                    {item.title}
                  </Link>
                  {item.brand && <p className="mt-0.5 text-xs text-muted">{item.brand}</p>}
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                  />
                  <p className="text-base font-bold text-ink">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 self-start rounded-lg p-2 text-muted transition-colors hover:bg-error-soft hover:text-error"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.li>
          ))}
        </ul>

        <OrderSummary subtotal={subtotal} tax={tax} total={total} itemCount={itemCount} />
      </div>
    </PageContainer>
  );
}
