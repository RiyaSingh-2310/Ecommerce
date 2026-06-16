import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import IconButton from '../ui/IconButton';
import { spring } from '../../constants/motion';

function formatTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours || 1}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NotificationDropdown({ open, onToggle, onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  const recent = notifications.slice(0, 5);

  return (
    <div className="relative" ref={ref}>
      <IconButton
        label="Notifications"
        variant="header"
        badge={unreadCount}
        onClick={onToggle}
      >
        <Bell className="h-5 w-5" />
      </IconButton>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={spring}
            className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,24rem)] origin-top-right overflow-hidden rounded-2xl border border-default bg-surface-elevated shadow-elevated sm:w-96"
            role="menu"
          >
            <div className="flex items-center justify-between border-b border-default px-4 py-3">
              <p className="text-sm font-semibold text-ink">Notifications</p>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <ul className="max-h-80 overflow-y-auto">
              {recent.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => { markAsRead(n.id); onClose(); }}
                    className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-secondary ${
                      !n.read ? 'bg-primary-soft/50' : ''
                    }`}
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{n.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted">{n.message}</p>
                      <p className="mt-1 text-[10px] text-muted">{formatTime(n.createdAt)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-default p-2">
              <Link
                to="/notifications"
                onClick={onClose}
                className="block rounded-xl px-3 py-2 text-center text-sm font-medium text-primary hover:bg-surface-secondary"
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
