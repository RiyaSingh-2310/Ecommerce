import { Loader2 } from 'lucide-react';
import { APP_NAME } from '../../constants/brand';

export default function AuthLoadingScreen() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background text-ink"
      role="status"
      aria-live="polite"
      aria-label="Loading application"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-on-primary">
        L
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">{APP_NAME}</p>
      <Loader2 className="mt-6 h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-2 text-xs text-muted">Preparing your session…</p>
    </div>
  );
}
