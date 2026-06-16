export function toCartItem(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    brand: product.brand || '',
    quantity: Math.max(1, quantity),
  };
}

export function toWishlistItem(product) {
  return {
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    brand: product.brand || '',
    category: product.category || '',
    rating: product.rating || 0,
    discountPercentage: product.discountPercentage || 0,
  };
}

export function cartSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartTax(subtotal, rate = 0.08) {
  return subtotal * rate;
}

export function cartTotal(subtotal, tax) {
  return subtotal + tax;
}
