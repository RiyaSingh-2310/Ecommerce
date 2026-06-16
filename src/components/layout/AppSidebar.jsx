import { Link, useLocation } from 'react-router-dom';
import { SIDEBAR_NAV_ITEMS, isNavActive } from '../../constants/navigation';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useNotifications } from '../../hooks/useNotifications';

export default function AppSidebar() {
  const location = useLocation();
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { unreadCount } = useNotifications();

  const badges = {
    cart: cartCount,
    wishlist: wishlistCount,
    notifications: unreadCount,
  };

  return (
    <aside
      className="hidden w-[var(--sidebar-width)] shrink-0 flex-col border-r border-default bg-surface lg:flex"
      style={{ height: 'calc(100dvh - var(--header-height))' }}
      aria-label="Sidebar"
    >
      <nav className="flex-1 space-y-1 overflow-hidden p-3 pt-4" aria-label="Main navigation">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(location.pathname, item.path);
          const badge = item.badgeKey ? badges[item.badgeKey] : 0;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary font-medium text-on-primary shadow-sm'
                  : 'text-secondary hover:bg-surface-secondary hover:text-ink'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.25 : 1.75} />
              <span>{item.label}</span>
              {badge > 0 && (
                <span className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  active ? 'bg-surface-elevated text-primary' : 'bg-primary text-on-primary'
                }`}
                >
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
