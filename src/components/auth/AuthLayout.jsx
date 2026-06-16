import { Link } from 'react-router-dom';
import BrandLogo from '../layout/BrandLogo';
import LoginHero from './LoginHero';
import ThemeToggle from '../layout/ThemeToggle';
import { APP_NAME } from '../../constants/brand';

export default function AuthLayout({ children, footer }) {
  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="grid w-full lg:grid-cols-2">
        <LoginHero />

        <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-12">
          <div className="mb-8 text-center lg:hidden">
            <BrandLogo to={null} className="justify-center" />
            <p className="mt-2 text-sm text-muted">Premium shopping with {APP_NAME}</p>
          </div>

          {children}

          {footer && (
            <p className="mt-6 text-center text-sm text-muted">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AuthFooterLink({ text, linkText, to }) {
  return (
    <>
      {text}{' '}
      <Link to={to} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </>
  );
}
