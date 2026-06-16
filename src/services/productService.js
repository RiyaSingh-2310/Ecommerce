import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from '../constants/api';
import { normalizeCategorySlug } from '../utils/filters';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export async function getProducts({ limit = 12, skip = 0, category = null } = {}) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : '/products';
  const { data } = await client.get(path, { params: { limit, skip } });
  return data;
}

export async function getAllProducts(category = null) {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : '/products';

  const limit = 100;
  let skip = 0;
  let total = Infinity;
  const products = [];

  while (skip < total) {
    const { data } = await client.get(path, { params: { limit, skip } });
    products.push(...data.products);
    total = data.total;
    skip += limit;
  }

  return products;
}

export async function getCategories() {
  const { data } = await client.get('/products/categories');
  if (!Array.isArray(data)) return [];
  return data.map((item) => normalizeCategorySlug(item)).filter(Boolean);
}

export async function getProductById(id) {
  const { data } = await client.get(`/products/${id}`);
  return data;
}

export async function getProductsByCategory(category, { limit = 12, skip = 0 } = {}) {
  const { data } = await client.get(
    `/products/category/${encodeURIComponent(category)}`,
    { params: { limit, skip } },
  );
  return data;
}

export function resolveApiError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) return 'Product not found.';
    if (error.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
    if (!error.response) return 'Network error. Check your connection.';
    return error.response.data?.message || 'Something went wrong.';
  }
  return 'An unexpected error occurred.';
}
