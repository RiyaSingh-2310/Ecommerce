import { SlidersHorizontal } from 'lucide-react';
import FilterPanel from './FilterPanel';

export default function FilterSidebar({ filters, catalog, actions }) {
  return (
    <aside className="hidden h-full w-72 shrink-0 lg:flex lg:flex-col" aria-label="Filters">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-default bg-surface shadow-card">
        <div className="shrink-0 border-b border-default p-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="heading-md text-base">Filters</h2>
              <p className="text-xs text-muted">Refine your search</p>
            </div>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6 pt-4 scrollbar-thin">
          <FilterPanel
            categories={catalog.categories}
            categoriesLoading={catalog.categoriesLoading}
            availableBrands={catalog.availableBrands}
            filters={filters}
            actions={actions}
          />
        </div>
      </div>
    </aside>
  );
}
