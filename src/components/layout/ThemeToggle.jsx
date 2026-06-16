import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { tapScale } from '../../constants/motion';

export default function ThemeToggle({ className = '', variant = 'default' }) {
  const { isDark, toggleTheme } = useTheme();
  const isHeader = variant === 'header';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isHeader
          ? 'header-icon-btn'
          : 'border border-default bg-surface-elevated text-ink shadow-sm hover:bg-surface-muted'
      } ${className}`}
      {...tapScale}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.9 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
