import { motion } from 'framer-motion';
import { tapScale } from '../../constants/motion';

const variants = {
  primary: 'bg-primary text-on-primary hover:opacity-90 shadow-sm',
  secondary: 'bg-surface text-ink border border-default hover:bg-surface-secondary',
  ghost: 'text-ink hover:bg-surface-muted',
  dark: 'bg-secondary text-on-primary hover:opacity-90',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <motion.button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...tapScale}
      {...props}
    >
      {children}
    </motion.button>
  );
}
