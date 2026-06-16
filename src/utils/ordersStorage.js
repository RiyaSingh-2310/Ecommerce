import { ORDERS_STORAGE_KEY } from '../constants/brand';

const SEED = [
  {
    id: 'LG-1042',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'shipped',
    itemCount: 3,
    total: 284.97,
    products: ['Wireless Headphones', 'Minimal Watch', 'Leather Sneakers'],
  },
  {
    id: 'LG-1038',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: 'delivered',
    itemCount: 1,
    total: 89.99,
    products: ['Essence Mascara Lash Princess'],
  },
  {
    id: 'LG-1031',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    status: 'processing',
    itemCount: 2,
    total: 156.50,
    products: ['Red Lipstick', 'Chanel Coco Noir'],
  },
  {
    id: 'LG-1024',
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    status: 'cancelled',
    itemCount: 1,
    total: 49.00,
    products: ['Powder Canister'],
  },
];

export const ORDER_STATUSES = {
  processing: { label: 'Processing', color: 'text-warning' },
  shipped: { label: 'Shipped', color: 'text-info' },
  delivered: { label: 'Delivered', color: 'text-success' },
  cancelled: { label: 'Cancelled', color: 'text-error' },
};

export function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export function persistOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch {
    return false;
  }
}

export function getInitialOrders() {
  return readOrders() ?? SEED;
}
