import { formatCategoryLabel } from '../../utils/filters';

export default function CategoryFilter({ categories, selected, onSelect, loading }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-9 rounded-xl shimmer" />
        ))}
      </div>
    );
  }

  const items = ['', ...categories];

  return (
    <ul className="space-y-1" role="listbox" aria-label="Categories">
      {items.map((cat) => {
        const slug = cat || '';
        const active = selected === slug;
        return (
          <li key={slug || 'all'}>
            <button
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => onSelect(slug)}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                active
                  ? 'bg-primary font-medium text-on-primary shadow-sm'
                  : 'text-secondary hover:bg-surface-muted'
              }`}
            >
              {slug ? formatCategoryLabel(slug) : 'All categories'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
