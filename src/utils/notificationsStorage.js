import { NOTIFICATIONS_STORAGE_KEY } from '../constants/brand';

const SEED = [
  {
    id: 'n1',
    title: 'New arrivals',
    message: 'Fresh products have been added to the catalog.',
    type: 'product',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'n2',
    title: 'Wishlist price drop',
    message: 'An item in your wishlist is now discounted.',
    type: 'wishlist',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n3',
    title: 'Order shipped',
    message: 'Your order #LG-1042 has been shipped.',
    type: 'order',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'n4',
    title: 'Order delivered',
    message: 'Your order #LG-1038 was delivered successfully.',
    type: 'order',
    read: true,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

export function readNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export function persistNotifications(items) {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

export function getInitialNotifications() {
  return readNotifications() ?? SEED;
}
