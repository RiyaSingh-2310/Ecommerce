import { useContext } from 'react';
import { NotificationsContext } from '../context/notificationsContext';

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications requires NotificationsProvider');
  return ctx;
}
