import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCategoryLabel } from '../../utils/filters';

const ICONS = ['🛍️', '💄', '📱', '👗', '🏠', '⌚', '🎧', '👟'];

export default function CategoryGrid({ categories, loading }) {
  if (loading) {
    return (
      <section>
        <h2 className="heading-lg mb-6">Popular categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-24 shimmer rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const items = categories.slice(0, 8);

  return (
    <section>
      <h2 className="heading-lg mb-6">Popular categories</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-default bg-surface p-5 text-center shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="text-2xl" aria-hidden="true">{ICONS[i % ICONS.length]}</span>
              <span className="mt-2 text-sm font-semibold text-ink">{formatCategoryLabel(cat)}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
