import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid3X3, Heart, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useOrders } from '../../hooks/useOrders';

function StatCard({
  icon: Icon, label, value, to, loading, delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <Link
        to={to}
        className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-5 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
          {loading ? (
            <div className="mt-2 h-7 w-16 shimmer rounded-lg" />
          ) : (
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function DashboardStats({ totalProducts, loading }) {
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { orders } = useOrders();

  const stats = [
    {
      icon: Grid3X3,
      label: 'Total products',
      value: totalProducts?.toLocaleString() ?? '—',
      to: '/products',
    },
    {
      icon: Heart,
      label: 'Wishlist items',
      value: wishlistCount,
      to: '/wishlist',
    },
    {
      icon: ShoppingBag,
      label: 'Cart items',
      value: cartCount,
      to: '/cart',
    },
    {
      icon: Package,
      label: 'Orders',
      value: orders.length,
      to: '/orders',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} loading={loading && stat.label === 'Total products'} delay={i * 0.06} />
      ))}
    </div>
  );
}
