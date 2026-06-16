import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import Button from '../ui/Button';

export default function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-default bg-surface px-6 py-16 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-secondary">
        <SearchX className="h-8 w-8 text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-ink">No products found</h3>
      <p className="mt-2 max-w-xs text-sm text-muted">
        Try adjusting your filters or explore a different category.
      </p>
      {onReset && (
        <Button onClick={onReset} variant="secondary" className="mt-6">
          Reset filters
        </Button>
      )}
    </motion.div>
  );
}
