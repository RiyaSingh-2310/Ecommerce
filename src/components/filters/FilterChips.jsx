import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCategoryLabel } from '../../utils/filters';

export default function FilterChips({ filters, onRemove, onClear }) {
  const chips = [];

  if (filters.category) {
    chips.push({ key: 'category', label: formatCategoryLabel(filters.category) });
  }
  filters.brands.forEach((b) => chips.push({ key: 'brand', value: b, label: b }));
  if (filters.minPrice !== '') chips.push({ key: 'minPrice', label: `Min $${filters.minPrice}` });
  if (filters.maxPrice !== '') chips.push({ key: 'maxPrice', label: `Max $${filters.maxPrice}` });
  if (filters.search?.trim()) chips.push({ key: 'search', label: `"${filters.search}"` });

  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 rounded-2xl bg-surface-muted p-3"
    >
      <span className="label-xs mr-1">Active</span>
      {chips.map((chip) => (
        <motion.button
          key={`${chip.key}-${chip.value ?? chip.label}`}
          type="button"
          layout
          onClick={() => onRemove(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
        >
          {chip.label}
          <X className="h-3 w-3 opacity-60" />
        </motion.button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="ml-auto text-xs font-medium text-primary hover:underline"
      >
        Clear all
      </button>
    </motion.div>
  );
}
