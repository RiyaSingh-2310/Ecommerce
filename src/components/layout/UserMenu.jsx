import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { spring, tapScale } from '../../constants/motion';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="relative flex items-center gap-1" ref={ref}>
      <Link to="/account" aria-label="Go to account" className="header-icon-btn flex h-10 w-10 items-center justify-center rounded-xl">
        <motion.span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-on-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {user?.initials || 'U'}
        </motion.span>
      </Link>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="hidden rounded-lg p-1 text-header-muted header-icon-btn sm:block"
        aria-expanded={open}
        aria-label="Account menu"
        {...tapScale}
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-overlay-light backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={spring}
              className="absolute right-0 top-10 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-2xl border border-default bg-surface-elevated shadow-xl"
              role="menu"
            >
              <div className="border-b border-default px-4 py-3">
                <p className="text-sm font-semibold text-ink">{user?.name}</p>
                <p className="truncate text-xs text-muted">{user?.email}</p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error transition-colors hover:bg-error-soft"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
