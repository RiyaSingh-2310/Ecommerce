import { useState, useCallback, useMemo, useEffect } from 'react';
import { NotificationsContext } from './notificationsContext';
import {
  getInitialNotifications,
  persistNotifications,
} from '../utils/notificationsStorage';

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const initial = getInitialNotifications();
    persistNotifications(initial);
    return initial;
  });
  const isLoading = false;

  useEffect(() => {
    persistNotifications(notifications);
  }, [notifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (
      n.id === id ? { ...n, read: true } : n
    )));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(() => ({
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }), [notifications, isLoading, unreadCount, markAsRead, markAllAsRead]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}
