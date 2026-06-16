import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProductContext } from '../hooks/useProductContext';
import FilterSidebar from '../components/filters/FilterSidebar';
import { FilterDrawer } from '../components/filters/FilterDrawer';
import FilterChips from '../components/filters/FilterChips';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/navigation/Pagination';
import Button from '../components/ui/Button';
import { formatCategoryLabel, countActiveFilters } from '../utils/filters';
import { tapScale } from '../constants/motion';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'title', label: 'Name A–Z' },
];

function sortProducts(products, sort) {
  const list = [...products];
  switch (sort) {
    case 'price-asc': return list.sort((a, b) => a.price - b.price);
    case 'price-desc': return list.sort((a, b) => b.price - a.price);
    case 'rating': return list.sort((a, b) => b.rating - a.rating);
    case 'title': return list.sort((a, b) => a.title.localeCompare(b.title));
    default: return list;
  }
}

export default function ProductsPage() {
  useDocumentTitle('Products');
  const { filters, catalog } = useProductContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState('default');

  const filterActions = useMemo(() => ({
    setCategory: filters.setCategory,
    toggleBrand: filters.toggleBrand,
    commitPrices: filters.commitPrices,
  }), [filters.setCategory, filters.toggleBrand, filters.commitPrices]);

  const activeCount = countActiveFilters(filters);
  const sortedProducts = useMemo(
    () => sortProducts(catalog.products, sort),
    [catalog.products, sort],
  );

  const heading = filters.category
    ? formatCategoryLabel(filters.category)
    : filters.search?.trim()
      ? `Results for "${filters.search}"`
      : 'All products';

  return (
    <div className="flex h-[calc(100dvh-var(--header-height)-var(--bottom-nav-height))] flex-col overflow-hidden lg:h-[calc(100dvh-var(--header-height))]">
      {/* Fixed product toolbar */}
      <div className="shrink-0 border-b border-default bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-xs mb-2">Catalog</p>
            <h1 className="heading-lg sm:text-3xl">{heading}</h1>
            {!catalog.loading && !catalog.error && (
              <p className="mt-2 text-sm text-muted">
                {catalog.totalProducts} products available
              </p>
            )}
          </motion.div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field h-10 appearance-none rounded-xl py-0 pl-9 pr-8 text-sm"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <motion.div {...tapScale} className="lg:hidden">
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-on-primary">
                    {activeCount}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-4">
          <FilterChips filters={filters} onRemove={filters.removeFilter} onClear={filters.resetFilters} />
        </div>
      </div>

      {/* Fixed filters + scrollable grid */}
      <div className="flex min-h-0 flex-1 gap-6 px-4 pb-4 pt-4 sm:px-6 lg:px-8">
        <FilterSidebar filters={filters} catalog={catalog} actions={filterActions} />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {filters.priceError && (
            <p className="mb-4 shrink-0 rounded-xl bg-warning-soft px-4 py-3 text-sm text-warning" role="alert">
              {filters.priceError}
            </p>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin lg:pr-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              <ProductGrid
                products={sortedProducts}
                loading={catalog.loading}
                error={catalog.error}
                onRetry={catalog.retry}
                onReset={filters.resetFilters}
              />
            </div>

            <Pagination
              currentPage={filters.page}
              totalPages={catalog.totalPages}
              onPageChange={filters.setPage}
              loading={catalog.loading}
            />
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        catalog={catalog}
        actions={filterActions}
      />
    </div>
  );
}
