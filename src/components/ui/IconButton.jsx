import { motion } from 'framer-motion';
import { tapScale } from '../../constants/motion';

export default function IconButton({
  children,
  label,
  className = '',
  badge,
  variant = 'default',
  ...props
}) {
  const isHeader = variant === 'header';

  return (
    <motion.button
      type="button"
      aria-label={label}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isHeader
          ? 'header-icon-btn'
          : 'text-muted hover:bg-surface-muted hover:text-ink'
      } ${className}`}
      {...tapScale}
      {...props}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </motion.button>
  );
}
