import { APP_NAME } from '../../constants/brand';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hidden border-t border-default bg-surface py-8 lg:block">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
        <p className="text-sm text-muted">
          © {year} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-sm text-secondary">
          Premium e-commerce experience
        </p>
      </div>
    </footer>
  );
}
