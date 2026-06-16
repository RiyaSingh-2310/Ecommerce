import Accordion from '../ui/Accordion';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import SidebarSkeleton from '../loaders/SidebarSkeleton';

export default function FilterPanel({
  categories,
  categoriesLoading,
  availableBrands,
  filters,
  actions,
}) {
  const { category, brands, minPrice, maxPrice, priceInputKey, priceError } = filters;
  const { setCategory, toggleBrand, commitPrices } = actions;

  if (categoriesLoading && categories.length === 0) {
    return <SidebarSkeleton />;
  }

  return (
    <div className="space-y-1">
      <Accordion title="Categories" defaultOpen>
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
          loading={categoriesLoading}
        />
      </Accordion>

      <Accordion title="Brands" defaultOpen>
        <BrandFilter
          brands={availableBrands}
          selected={brands}
          onToggle={toggleBrand}
        />
      </Accordion>

      <Accordion title="Price" defaultOpen>
        <PriceFilter
          key={priceInputKey}
          initialMin={minPrice}
          initialMax={maxPrice}
          onCommit={commitPrices}
          error={priceError}
        />
      </Accordion>
    </div>
  );
}
