import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import AppSidebar from '../components/layout/AppSidebar';
import BottomNav from '../components/layout/BottomNav';
import Footer from '../components/layout/Footer';
import RouteFallback from '../components/shared/RouteFallback';
import ScrollToTop from '../components/shared/ScrollToTop';

export default function MainLayout() {
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  return (
    <div className="app-shell flex flex-col overflow-hidden bg-background text-ink">
      <Header />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <main
            id="main-scroll"
            className={`main-scroll flex min-h-0 flex-1 flex-col overscroll-contain ${
              isProductsPage
                ? 'overflow-hidden'
                : 'overflow-y-auto pb-[calc(var(--bottom-nav-height)+0.5rem)] lg:pb-0'
            }`}
          >
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
            {!isProductsPage && <Footer />}
          </main>
        </div>
      </div>
      <BottomNav />
      <ScrollToTop />
    </div>
  );
}
