import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  parseFiltersFromSearchParams,
  buildSearchParamsFromFilters,
  validatePriceRange,
  formatCategoryLabel,
} from '../utils/filters';

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlFilters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const priceError = useMemo(
    () => validatePriceRange(urlFilters.minPrice, urlFilters.maxPrice),
    [urlFilters.minPrice, urlFilters.maxPrice],
  );

  const updateParams = useCallback(
    (updates, { resetPage = false } = {}) => {
      const next = {
        ...urlFilters,
        ...updates,
        page: resetPage ? 1 : (updates.page ?? urlFilters.page),
      };
      setSearchParams(buildSearchParamsFromFilters(next), { replace: true });
    },
    [urlFilters, setSearchParams],
  );

  const setCategory = useCallback(
    (category) => {
      updateParams({ category }, { resetPage: true });
      toast.success('Filter applied', {
        description: category ? formatCategoryLabel(category) : 'All categories',
      });
    },
    [updateParams],
  );

  const toggleBrand = useCallback(
    (brand) => {
      const brands = urlFilters.brands.includes(brand)
        ? urlFilters.brands.filter((b) => b !== brand)
        : [...urlFilters.brands, brand];
      updateParams({ brands }, { resetPage: true });
    },
    [urlFilters.brands, updateParams],
  );

  const commitPrices = useCallback(
    (minPrice, maxPrice) => {
      if (validatePriceRange(minPrice, maxPrice)) return;
      updateParams({ minPrice, maxPrice }, { resetPage: true });
    },
    [updateParams],
  );

  const setSearch = useCallback(
    (search) => updateParams({ search }, { resetPage: true }),
    [updateParams],
  );

  const setPage = useCallback(
    (page) => updateParams({ page }),
    [updateParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
    toast.success('Filters cleared');
  }, [setSearchParams]);

  const removeFilter = useCallback(
    (key, value) => {
      if (key === 'category') updateParams({ category: '' }, { resetPage: true });
      if (key === 'brand') {
        updateParams({ brands: urlFilters.brands.filter((b) => b !== value) }, { resetPage: true });
      }
      if (key === 'minPrice') updateParams({ minPrice: '' }, { resetPage: true });
      if (key === 'maxPrice') updateParams({ maxPrice: '' }, { resetPage: true });
      if (key === 'search') updateParams({ search: '' }, { resetPage: true });
    },
    [updateParams, urlFilters.brands],
  );

  return {
    ...urlFilters,
    priceError,
    priceInputKey: `${urlFilters.minPrice}|${urlFilters.maxPrice}`,
    setCategory,
    toggleBrand,
    commitPrices,
    setSearch,
    setPage,
    resetFilters,
    removeFilter,
  };
}
