import { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { WishlistContext } from './wishlistContext';
import { readWishlist, persistWishlist } from '../utils/wishlistStorage';
import { toWishlistItem } from '../utils/commerce';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => readWishlist());
  const isLoading = false;

  useEffect(() => {
    persistWishlist(items);
  }, [items]);

  const addItem = useCallback((product, options = {}) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) return prev;
      return [...prev, toWishlistItem(product)];
    });
    if (!options.silent) {
      toast.success('Added to wishlist', { description: product.title });
    }
  }, []);

  const removeItem = useCallback((productId, options = {}) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    if (!options.silent) {
      toast.success('Removed from wishlist');
    }
  }, []);

  const toggleItem = useCallback((product, options = {}) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        if (!options.silent) toast.success('Removed from wishlist');
        return prev.filter((i) => i.id !== product.id);
      }
      if (!options.silent) toast.success('Added to wishlist', { description: product.title });
      return [...prev, toWishlistItem(product)];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => items.some((i) => i.id === productId),
    [items],
  );

  const value = useMemo(() => ({
    items,
    isLoading,
    count: items.length,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
  }), [items, isLoading, addItem, removeItem, toggleItem, isInWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
