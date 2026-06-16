import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, XCircle } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useOrders } from '../hooks/useOrders';
import ShelfEmptyState from '../components/shared/ShelfEmptyState';
import { formatPrice } from '../utils/filters';

const STATUS_CONFIG = {
  processing: { icon: Package, label: 'Processing', className: 'bg-warning-soft text-warning' },
  shipped: { icon: Truck, label: 'Shipped', className: 'bg-info-soft text-info' },
  delivered: { icon: CheckCircle2, label: 'Delivered', className: 'bg-success-soft text-success' },
  cancelled: { icon: XCircle, label: 'Cancelled', className: 'bg-error-soft text-error' },
};

function OrderCard({ order, index }) {
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.processing;
  const StatusIcon = config.icon;
  const date = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl border border-default bg-surface p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Order ID</p>
          <p className="mt-1 font-mono text-sm font-semibold text-ink">{order.id}</p>
          <p className="mt-2 text-sm text-muted">{date}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {config.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 border-t border-default pt-4 text-sm">
        <div>
          <p className="text-muted">Items</p>
          <p className="font-semibold text-ink">{order.itemCount}</p>
        </div>
        <div>
          <p className="text-muted">Total</p>
          <p className="font-semibold text-primary">{formatPrice(order.total)}</p>
        </div>
      </div>

      {order.products?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {order.products.map((name) => (
            <li
              key={name}
              className="rounded-lg bg-surface-secondary px-3 py-1.5 text-xs font-medium text-secondary"
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      {order.items?.length > 0 && (
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {order.items.slice(0, 4).map((item) => (
            <li key={item.id} className="shrink-0">
              <img
                src={item.thumbnail}
                alt=""
                className="h-14 w-14 rounded-lg border border-default bg-surface-secondary object-contain p-1"
              />
            </li>
          ))}
          {order.items.length > 4 && (
            <li className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-xs font-medium text-muted">
              +{order.items.length - 4}
            </li>
          )}
        </ul>
      )}
    </motion.article>
  );
}

export default function OrdersPage() {
  useDocumentTitle('Orders');
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-40 shimmer rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <ShelfEmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order, it will appear here with tracking and status updates."
        ctaLabel="Start shopping"
        ctaTo="/products"
      />
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Your orders</h1>
        <p className="mt-1 text-sm text-muted">{orders.length} orders</p>
      </motion.div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {orders.map((order, i) => (
          <OrderCard key={order.id} order={order} index={i} />
        ))}
      </div>
    </PageContainer>
  );
}
