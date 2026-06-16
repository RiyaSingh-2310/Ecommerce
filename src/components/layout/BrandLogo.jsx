import { Link } from 'react-router-dom';
import { APP_NAME, APP_NAME_UPPER } from '../../constants/brand';

export default function BrandLogo({
  variant = 'default',
  showText = true,
  to = '/',
  className = '',
}) {
  const isHeader = variant === 'header';
  const isHero = variant === 'hero';

  const monogram = (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg font-bold ${
        isHeader || isHero
          ? 'h-9 w-9 bg-primary text-sm text-on-primary'
          : 'h-8 w-8 bg-primary text-xs text-on-primary'
      }`}
      aria-hidden="true"
    >
      L
    </span>
  );

  const wordmark = showText && (
    <span
      className={`font-bold tracking-tight ${
        isHero
          ? 'text-3xl text-hero'
          : isHeader
            ? 'text-xs font-bold uppercase tracking-[0.18em] text-header sm:text-sm'
            : 'text-lg text-ink sm:text-xl'
      }`}
    >
      <span className={isHero ? 'text-hero' : isHeader ? 'text-header' : 'text-ink'}>
        {isHeader ? APP_NAME_UPPER : APP_NAME}
      </span>
    </span>
  );

  const compactUpper = variant === 'compact' && (
    <span className="text-sm font-bold tracking-[0.2em] text-ink">{APP_NAME_UPPER}</span>
  );

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {monogram}
      {compactUpper || wordmark}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label={`${APP_NAME} home`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
