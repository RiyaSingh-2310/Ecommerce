import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootRedirect from './RootRedirect';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/MainLayout';
import AppErrorBoundary from '../components/shared/AppErrorBoundary';
import AuthPageFallback from '../components/shared/AuthPageFallback';
import { ProductProvider } from '../context/ProductProvider';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const AccountPage = lazy(() => import('../pages/AccountPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

function Guard({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function AppRoutes() {
  return (
    <AppErrorBoundary>
      <Routes>
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <Suspense fallback={<AuthPageFallback />}>
                <LoginPage />
              </Suspense>
            </PublicRoute>
          )}
        />
        <Route
          path="/signup"
          element={(
            <PublicRoute>
              <Suspense fallback={<AuthPageFallback />}>
                <SignUpPage />
              </Suspense>
            </PublicRoute>
          )}
        />

        <Route element={<MainLayout />}>
          <Route element={<ProductProvider />}>
            <Route index element={<Guard><HomePage /></Guard>} />
            <Route path="products" element={<Guard><ProductsPage /></Guard>} />
            <Route path="product/:id" element={<Guard><ProductDetailPage /></Guard>} />
          </Route>

          <Route path="cart" element={<Guard><CartPage /></Guard>} />
          <Route path="wishlist" element={<Guard><WishlistPage /></Guard>} />
          <Route path="orders" element={<Guard><OrdersPage /></Guard>} />
          <Route path="notifications" element={<Guard><NotificationsPage /></Guard>} />
          <Route path="account" element={<Guard><AccountPage /></Guard>} />
          <Route path="settings" element={<Guard><SettingsPage /></Guard>} />
        </Route>

        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </AppErrorBoundary>
  );
}
