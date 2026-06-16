import { useState } from 'react';
import { getInitialOrders } from '../utils/ordersStorage';

export function useOrders() {
  const [orders] = useState(() => getInitialOrders());

  return { orders, isLoading: false };
}
