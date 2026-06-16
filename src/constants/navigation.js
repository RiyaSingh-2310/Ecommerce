import {
  Home, ShoppingBag, Heart, Package, Bell, User, Settings, Grid3X3,
} from 'lucide-react';

export const SIDEBAR_NAV_ITEMS = [
  { id: 'home', path: '/', label: 'Home', icon: Home },
  { id: 'products', path: '/products', label: 'Products', icon: Grid3X3 },
  { id: 'cart', path: '/cart', label: 'Cart', icon: ShoppingBag, badgeKey: 'cart' },
  { id: 'wishlist', path: '/wishlist', label: 'Wishlist', icon: Heart, badgeKey: 'wishlist' },
  { id: 'orders', path: '/orders', label: 'Orders', icon: Package },
  { id: 'notifications', path: '/notifications', label: 'Notifications', icon: Bell, badgeKey: 'notifications' },
  { id: 'account', path: '/account', label: 'Account', icon: User },
  { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
];

export const BOTTOM_NAV_ITEMS = [
  { id: 'home', path: '/', label: 'Home', icon: Home },
  { id: 'cart', path: '/cart', label: 'Cart', icon: ShoppingBag, badgeKey: 'cart' },
  { id: 'wishlist', path: '/wishlist', label: 'Wishlist', icon: Heart, badgeKey: 'wishlist' },
  { id: 'orders', path: '/orders', label: 'Orders', icon: Package },
  { id: 'account', path: '/account', label: 'Account', icon: User },
];

export function isNavActive(pathname, itemPath) {
  if (itemPath === '/') return pathname === '/';
  if (itemPath === '/products') return pathname === '/products';
  return pathname.startsWith(itemPath);
}
