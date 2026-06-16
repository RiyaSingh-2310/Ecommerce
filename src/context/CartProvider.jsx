import { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { CartContext } from './cartContext';
import { readCart, persistCart } from '../utils/cartStorage';
import { toCartItem, cartSubtotal, cartTax, cartTotal } from '../utils/commerce';
import { TAX_RATE } from '../constants/brand';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCart());
  const isLoading = false;

  useEffect(() => {
    persistCart(items);
  }, [items]);

  const addItem = useCallback((product, quantity = 1, options = {}) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ));
      }
      return [...prev, toCartItem(product, quantity)];
    });
    if (!options.silent) {
      toast.success('Added to cart', { description: product.title });
    }
  }, []);

  const removeItem = useCallback((productId, options = {}) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    if (!options.silent) {
      toast.success('Removed from cart');
    }
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (
      i.id === productId ? { ...i, quantity } : i
    )));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const tax = useMemo(() => cartTax(subtotal, TAX_RATE), [subtotal]);
  const total = useMemo(() => cartTotal(subtotal, tax), [subtotal, tax]);

  const isInCart = useCallback(
    (productId) => items.some((i) => i.id === productId),
    [items],
  );

  const value = useMemo(() => ({
    items,
    isLoading,
    itemCount,
    subtotal,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  }), [items, isLoading, itemCount, subtotal, tax, total, addItem, removeItem, updateQuantity, clearCart, isInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
