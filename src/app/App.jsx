import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeProvider';
import { AuthProvider } from '../context/AuthProvider';
import { CartProvider } from '../context/CartProvider';
import { WishlistProvider } from '../context/WishlistProvider';
import { NotificationsProvider } from '../context/NotificationsProvider';
import { SettingsProvider } from '../context/SettingsProvider';
import AppToaster from '../components/shared/AppToaster';
import AuthBootstrap from '../components/shared/AuthBootstrap';
import AppRoutes from '../routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <NotificationsProvider>
                <SettingsProvider>
                  <AuthBootstrap>
                    <AppToaster />
                    <AppRoutes />
                  </AuthBootstrap>
                </SettingsProvider>
              </NotificationsProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
