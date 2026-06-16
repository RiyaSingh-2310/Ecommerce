import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import {
  getProducts,
  getAllProducts,
  getCategories,
  resolveApiError,
} from '../services/productService';
import { PAGE_SIZE } from '../constants/api';
import {
  hasClientSideFilters,
  applyClientFilters,
  extractBrands,
  getTotalPages,
} from '../utils/filters';

export function useProducts(filters) {
  const { category, brands, minPrice, maxPrice, search, page, priceError } = filters;

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [brandSource, setBrandSource] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  const effectivePrice = useMemo(() => {
    if (priceError) return { minPrice: '', maxPrice: '' };
    return { minPrice, maxPrice };
  }, [minPrice, maxPrice, priceError]);

  const clientFilters = useMemo(
    () => ({ brands, search, ...effectivePrice }),
    [brands, search, effectivePrice],
  );

  const needsClientFilter = useMemo(
    () => hasClientSideFilters(clientFilters),
    [clientFilters],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setCategoriesLoading(true);
      try {
        const data = await getCategories();
        if (!cancelled) setCategories(data);
      } catch {
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getAllProducts(category || null);
        if (!cancelled) setBrandSource(data);
      } catch {
        if (!cancelled) setBrandSource([]);
      }
    })();

    return () => { cancelled = true; };
  }, [category]);

  const availableBrands = useMemo(() => extractBrands(brandSource), [brandSource]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        if (needsClientFilter) {
          const all = await getAllProducts(category || null);
          if (cancelled) return;
          const filtered = applyClientFilters(all, clientFilters);
          const total = filtered.length;
          const safePage = Math.min(page, getTotalPages(total, PAGE_SIZE));
          const skip = (safePage - 1) * PAGE_SIZE;

          setProducts(filtered.slice(skip, skip + PAGE_SIZE));
          setTotalProducts(total);
        } else {
          const skip = (page - 1) * PAGE_SIZE;
          const data = await getProducts({
            limit: PAGE_SIZE,
            skip,
            category: category || null,
          });
          if (cancelled) return;
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (err) {
        if (cancelled) return;
        setError(resolveApiError(err));
        setProducts([]);
        setTotalProducts(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [category, clientFilters, page, needsClientFilter, retryToken]);

  const totalPages = useMemo(
    () => getTotalPages(totalProducts, PAGE_SIZE),
    [totalProducts],
  );

  const retry = useCallback(() => setRetryToken((t) => t + 1), []);

  const prevError = useRef(null);
  useEffect(() => {
    if (error && error !== prevError.current) {
      toast.error('Network error', { description: error });
    }
    prevError.current = error;
  }, [error]);

  return {
    products,
    totalProducts,
    totalPages,
    categories,
    categoriesLoading,
    availableBrands,
    loading,
    error,
    retry,
  };
}
