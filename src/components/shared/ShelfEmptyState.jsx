import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function ShelfEmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel = 'Start shopping',
  ctaTo = '/',
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-soft to-surface shadow-lg"
        >
          <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </motion.div>
        <div className="absolute -inset-4 -z-10 rounded-full bg-primary-soft blur-2xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold tracking-tight text-ink"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mt-3 text-sm leading-relaxed text-muted"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="mt-8"
      >
        <Link to={ctaTo}>
          <Button>{ctaLabel}</Button>
        </Link>
      </motion.div>
    </div>
  );
}
