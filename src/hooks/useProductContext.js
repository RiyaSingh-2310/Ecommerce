import { useContext } from 'react';
import { ProductContext } from '../context/productContext';

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProductContext requires ProductProvider');
  return ctx;
}
