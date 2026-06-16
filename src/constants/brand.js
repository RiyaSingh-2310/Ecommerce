export const APP_NAME = 'Leegality';
export const APP_NAME_UPPER = 'LEEGALITY';

export const AUTH_STORAGE_KEY = 'leegality_auth';
export const USERS_STORAGE_KEY = 'leegality_users';
export const THEME_STORAGE_KEY = 'leegality_theme';
export const CART_STORAGE_KEY = 'leegality_cart';
export const WISHLIST_STORAGE_KEY = 'leegality_wishlist';
export const NOTIFICATIONS_STORAGE_KEY = 'leegality_notifications';
export const ORDERS_STORAGE_KEY = 'leegality_orders';
export const SETTINGS_STORAGE_KEY = 'leegality_settings';

export const DEMO_EMAIL = 'demo.user@theexample.com';
export const DEMO_PASSWORD = 'demoUser@the123';

export const TAX_RATE = 0.08;

export const PROTECTED_PATHS = [
  '/',
  '/products',
  '/account',
  '/settings',
  '/notifications',
  '/cart',
  '/wishlist',
  '/orders',
];

export function isProtectedPath(pathname) {
  if (PROTECTED_PATHS.includes(pathname)) return true;
  if (pathname.startsWith('/product/')) return true;
  return false;
}
