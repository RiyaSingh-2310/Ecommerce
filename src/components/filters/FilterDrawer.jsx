import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import { spring } from '../../constants/motion';

export function FilterDrawer({ open, onClose, filters, catalog, actions }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={spring}
            className="fixed inset-y-0 left-0 z-50 w-[min(88vw,320px)] overflow-y-auto bg-surface p-5 shadow-2xl lg:hidden"
            aria-label="Filters"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Filters</h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-canvas"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel
              categories={catalog.categories}
              categoriesLoading={catalog.categoriesLoading}
              availableBrands={catalog.availableBrands}
              filters={filters}
              actions={actions}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
