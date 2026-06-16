import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BOTTOM_NAV_ITEMS, isNavActive } from '../../constants/navigation';
import { spring } from '../../constants/motion';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

function NavItem({ item, active, badge }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className="relative flex flex-1 flex-col items-center gap-1 py-1"
      aria-label={item.label}
    >
      <motion.div
        className="relative flex h-9 w-9 items-center justify-center"
        animate={{ scale: active ? 1.12 : 1 }}
        whileTap={{ scale: 0.92 }}
        transition={spring}
      >
        <Icon
          className={`h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-muted'}`}
          strokeWidth={active ? 2.25 : 1.75}
        />
        {badge > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-on-primary">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </motion.div>
      <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted'}`}>
        {item.label}
      </span>
      {active && (
        <motion.span
          layoutId="bottom-nav-indicator"
          className="absolute -top-1 h-1 w-8 rounded-full bg-primary"
          transition={spring}
        />
      )}
    </NavLink>
  );
}

export default function BottomNav() {
  const location = useLocation();
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const badges = { cart: cartCount, wishlist: wishlistCount };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.1 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-default bg-surface-elevated/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-elevated backdrop-blur-xl lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={isNavActive(location.pathname, item.path)}
            badge={item.badgeKey ? badges[item.badgeKey] : 0}
          />
        ))}
      </div>
    </motion.nav>
  );
}
