import { Toaster } from 'sonner';
import { useTheme } from '../../hooks/useTheme';

export default function AppToaster() {
  const { isDark } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={isDark ? 'dark' : 'light'}
      richColors
      closeButton
      visibleToasts={4}
      toastOptions={{
        className: 'font-sans',
        style: {
          borderRadius: '14px',
        },
      }}
    />
  );
}
