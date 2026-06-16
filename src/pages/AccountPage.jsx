import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'framer-motion';
import {
  User, Mail, Globe, Heart, ShoppingBag, Package, Palette, LogOut,
  ChevronRight, Lock, Bell, Settings,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useOrders } from '../hooks/useOrders';
import { useSettings } from '../hooks/useSettings';
import ThemeToggle from '../components/layout/ThemeToggle';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Input from '../components/ui/Input';
import { toast } from 'sonner';

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

function Section({ title, children, delay = 0 }) {
  return (
    <motion.section
      {...fadeUp}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-default bg-surface p-5 shadow-card"
    >
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">{title}</h2>
      {children}
    </motion.section>
  );
}

function Row({ icon: Icon, label, value, to }) {
  const inner = (
    <div className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3 transition-colors hover:bg-surface">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted" />
        <div>
          <p className="text-xs text-muted">{label}</p>
          <p className="text-sm font-medium text-ink">{value}</p>
        </div>
      </div>
      {to && <ChevronRight className="h-4 w-4 text-muted" />}
    </div>
  );

  if (to) {
    return <Link to={to}>{inner}</Link>;
  }
  return inner;
}

function StatCard({ icon: Icon, label, value, to, delay }) {
  return (
    <motion.div {...fadeUp} transition={{ delay }}>
      <Link
        to={to}
        className="flex flex-col rounded-2xl border border-default bg-surface p-5 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <Icon className="h-5 w-5 text-primary" />
        <p className="mt-4 text-3xl font-bold text-ink">{value}</p>
        <p className="mt-1 text-sm text-muted">{label}</p>
      </Link>
    </motion.div>
  );
}

export default function AccountPage() {
  useDocumentTitle('Account');
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { orders } = useOrders();
  const { settings, updateSetting } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast.success('Password updated', { description: 'Your password has been changed (demo).' });
  };

  return (
    <PageContainer>
      <div className="space-y-5">
      <motion.div {...fadeUp} className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-on-primary shadow-lg">
          {user?.initials}
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">{user?.name}</h1>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={ShoppingBag} label="Cart items" value={cartCount} to="/cart" delay={0.05} />
        <StatCard icon={Heart} label="Wishlist" value={wishlistCount} to="/wishlist" delay={0.08} />
        <StatCard icon={Package} label="Orders" value={orders.length} to="/orders" delay={0.11} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Section title="Profile information" delay={0.12}>
          <div className="space-y-2">
            <Row icon={User} label="Display name" value={user?.name} />
            <Row icon={Mail} label="Email address" value={user?.email} />
            <Row icon={Globe} label="Country" value={user?.country || 'United States'} />
          </div>
        </Section>

        <Section title="Preferences" delay={0.15}>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3">
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-muted" />
              <div>
                <p className="text-sm font-medium text-ink">Theme</p>
                <p className="text-xs text-muted">{isDark ? 'Dark mode' : 'Light mode'}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted" />
              <div>
                <p className="text-sm font-medium text-ink">Email notifications</p>
                <p className="text-xs text-muted">Order and promo updates</p>
              </div>
            </div>
            <Toggle
              checked={settings.emailNotifications}
              onChange={(v) => updateSetting('emailNotifications', v)}
              aria-label="Email notifications"
            />
          </div>
          <Link to="/settings" className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3 transition-colors hover:bg-surface">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-muted" />
              <p className="text-sm font-medium text-ink">All settings</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted" />
          </Link>
        </div>
        </Section>
      </div>

      <Section title="Security" delay={0.2}>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="mb-1.5 block text-xs font-medium text-muted">Current password</label>
            <Input id="current-password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-xs font-medium text-muted">New password</label>
            <Input id="new-password" type="password" placeholder="••••••••" autoComplete="new-password" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-medium text-muted">Confirm new password</label>
            <Input id="confirm-password" type="password" placeholder="••••••••" autoComplete="new-password" />
          </div>
          <Button type="submit" variant="secondary" className="w-full">
            <Lock className="h-4 w-4" />
            Change password
          </Button>
        </form>
      </Section>

      <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
        <Button
          variant="secondary"
          className="w-full border-error text-error hover:bg-error-soft"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </motion.div>
      </div>
    </PageContainer>
  );
}
