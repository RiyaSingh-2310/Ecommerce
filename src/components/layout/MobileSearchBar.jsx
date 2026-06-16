import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function MobileSearchBar({
  open,
  value,
  onChange,
  onClose,
  onSearch,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = useCallback((e) => {
    e?.preventDefault();
    onSearch(value);
  }, [onSearch, value]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-overlay-light/40 backdrop-blur-[2px] md:hidden"
            onClick={onClose}
            aria-label="Close search overlay"
          />
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-search-bar fixed inset-x-0 z-50 border-b border-header px-4 py-3 md:hidden"
            style={{ top: 'var(--header-height)' }}
            role="search"
          >
            <form onSubmit={submit} className="relative mx-auto max-w-[1600px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="h-11 w-full rounded-xl border border-default/50 bg-surface-elevated/90 pl-10 pr-11 text-sm text-ink shadow-sm outline-none ring-2 ring-primary/15 backdrop-blur-md placeholder:text-muted focus:ring-primary/35"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
