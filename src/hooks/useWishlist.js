import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistContext';

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist requires WishlistProvider');
  return ctx;
}
