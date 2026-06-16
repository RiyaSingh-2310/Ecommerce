import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function ExpandableSearch({
  defaultQuery = '',
  onSearch,
}) {
  const [open, setOpen] = useState(Boolean(defaultQuery));
  const [value, setValue] = useState(defaultQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = useCallback((e) => {
    e?.preventDefault();
    onSearch(value);
  }, [onSearch, value]);

  const closeDesktop = () => {
    setOpen(false);
    setValue(defaultQuery);
  };

  return (
    <div className="relative hidden h-10 min-w-0 flex-1 md:flex md:justify-center">
      <div className="relative h-10 w-full max-w-[480px]">
        <AnimatePresence initial={false} mode="wait">
          {!open ? (
            <motion.button
              key="icon"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(true)}
              className="header-icon-btn absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </motion.button>
          ) : (
            <motion.form
              key="search"
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.85 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={submit}
              style={{ transformOrigin: 'right center' }}
              className="absolute inset-0 h-10 w-full"
            >
              <div className="relative h-full">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="h-10 w-full rounded-xl border-0 bg-surface-elevated pl-11 pr-10 text-sm text-ink shadow-md outline-none ring-2 ring-primary/20 focus:ring-primary/40"
                />
                <button
                  type="button"
                  onClick={closeDesktop}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted transition-colors hover:text-ink"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
