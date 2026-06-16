import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';
import { useProducts } from '../hooks/useProducts';
import { ProductContext } from './productContext';

export function ProductProvider() {
  const filters = useFilters();
  const catalog = useProducts(filters);

  const value = useMemo(() => ({ filters, catalog }), [filters, catalog]);

  return (
    <ProductContext.Provider value={value}>
      <Outlet />
    </ProductContext.Provider>
  );
}
