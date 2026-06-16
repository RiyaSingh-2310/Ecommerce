import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/productService';

export function useHomeData() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [productData, cats] = await Promise.all([
          getProducts({ limit: 24, skip: 0 }),
          getCategories(),
        ]);
        if (cancelled) return;

        const all = productData.products || [];
        const byRating = [...all].sort((a, b) => b.rating - a.rating);

        setFeatured(all.slice(0, 4));
        setTrending(byRating.slice(0, 8));
        setRecommended(all.slice(4, 12));
        setCategories(cats);
        setTotalProducts(productData.total ?? all.length);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load home data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return {
    featured, trending, recommended, categories, totalProducts, loading, error,
  };
}
