import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { tapScale } from '../../constants/motion';

function Pagination({ currentPage, totalPages, onPageChange, loading }) {
  const pages = useMemo(() => {
    const max = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + max - 1);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const go = useCallback((page) => {
    if (loading || page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, totalPages, onPageChange, loading]);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
      aria-label="Pagination"
    >
      <p className="text-sm text-muted">
        Page <span className="font-semibold text-ink">{currentPage}</span> of{' '}
        <span className="font-semibold text-ink">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1 rounded-2xl bg-surface p-1.5 shadow-card">
        <motion.button
          type="button"
          onClick={() => go(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-muted disabled:opacity-40"
          aria-label="Previous page"
          {...tapScale}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>

        {pages.map((page) => (
          <motion.button
            key={page}
            type="button"
            onClick={() => go(page)}
            disabled={loading}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition-colors ${
              page === currentPage
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:bg-surface-muted hover:text-ink'
            }`}
            {...tapScale}
          >
            {page}
          </motion.button>
        ))}

        <motion.button
          type="button"
          onClick={() => go(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-muted disabled:opacity-40"
          aria-label="Next page"
          {...tapScale}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </nav>
  );
}

export default memo(Pagination);
