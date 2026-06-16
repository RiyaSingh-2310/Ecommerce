import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Package, Tag } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useNotifications } from '../hooks/useNotifications';
import ShelfEmptyState from '../components/shared/ShelfEmptyState';
import Button from '../components/ui/Button';

const TYPE_ICONS = {
  product: Tag,
  wishlist: Tag,
  order: Package,
  default: Bell,
};

function NotificationItem({ notification, onMarkRead, index }) {
  const Icon = TYPE_ICONS[notification.type] || TYPE_ICONS.default;
  const isUnread = !notification.read;

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-2xl border p-4 transition-colors ${
        isUnread
          ? 'border-primary/20 bg-primary-soft/30'
          : 'border-default bg-surface'
      }`}
    >
      <div className="flex gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isUnread ? 'bg-primary-soft text-primary' : 'bg-surface-secondary text-muted'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold ${isUnread ? 'text-ink' : 'text-secondary'}`}>
              {notification.title}
            </p>
            {isUnread && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
            )}
          </div>
          <p className="mt-1 text-sm text-muted">{notification.message}</p>
          <p className="mt-2 text-xs text-muted">
            {new Date(notification.createdAt).toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
            })}
          </p>
          {notification.link && (
            <Link
              to={notification.link}
              className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
            >
              View details →
            </Link>
          )}
        </div>
        {isUnread && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="shrink-0 text-xs font-medium text-primary hover:underline"
          >
            Mark read
          </button>
        )}
      </div>
    </motion.li>
  );
}

export default function NotificationsPage() {
  useDocumentTitle('Notifications');
  const { notifications, unreadCount, markAsRead, markAllAsRead, isLoading } = useNotifications();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-24 shimmer rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (notifications.length === 0) {
    return (
      <ShelfEmptyState
        icon={Bell}
        title="No notifications"
        description="You're all caught up. We'll notify you about orders, deals, and wishlist updates."
        ctaLabel="Browse products"
        ctaTo="/products"
      />
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="heading-lg">Notifications</h1>
          <p className="mt-1 text-sm text-muted">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </motion.div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <ul className="mt-8 space-y-3">
        {notifications.map((n, i) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onMarkRead={markAsRead}
            index={i}
          />
        ))}
      </ul>
    </PageContainer>
  );
}
