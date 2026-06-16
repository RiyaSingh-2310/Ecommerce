import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import BrandLogo from './BrandLogo';
import ExpandableSearch from './ExpandableSearch';
import MobileSearchTrigger from './MobileSearchTrigger';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const urlQuery = searchParams.get('q') || '';

  const submitSearch = useCallback((query) => {
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) params.set('q', trimmed);
    navigate({ pathname: '/products', search: params.toString() });
  }, [navigate]);

  return (
    <header className="header-bar relative z-50 h-[var(--header-height)] shrink-0 border-b border-header">
        <div className="mx-auto flex h-full max-w-[1600px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <BrandLogo variant="header" to="/" className="shrink-0" />

          <ExpandableSearch
            key={urlQuery}
            defaultQuery={urlQuery}
            onSearch={submitSearch}
          />

          <div className="ml-auto flex shrink-0 items-center gap-0.5">
            <MobileSearchTrigger
              key={urlQuery}
              defaultQuery={urlQuery}
              onSearch={submitSearch}
            />

            <ThemeToggle variant="header" />

            {isAuthenticated && (
              <NotificationDropdown
                open={notificationsOpen}
                onToggle={() => setNotificationsOpen((o) => !o)}
                onClose={() => setNotificationsOpen(false)}
              />
            )}

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-on-primary transition-colors hover:opacity-90 sm:text-sm"
              >
                Sign in
              </button>
            )}
        </div>
      </div>
    </header>
  );
}
