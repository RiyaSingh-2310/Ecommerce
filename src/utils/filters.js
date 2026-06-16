import { PAGE_SIZE } from '../constants/api';

export function hasClientSideFilters({ brands = [], minPrice, maxPrice, search = '' }) {
  if (search.trim()) return true;
  if (brands.length > 0) return true;
  const hasMin = minPrice !== '' && minPrice != null && !Number.isNaN(Number(minPrice));
  const hasMax = maxPrice !== '' && maxPrice != null && !Number.isNaN(Number(maxPrice));
  return hasMin || hasMax;
}

export function validatePriceRange(minPrice, maxPrice) {
  const min = minPrice === '' || minPrice == null ? null : Number(minPrice);
  const max = maxPrice === '' || maxPrice == null ? null : Number(maxPrice);

  if (min !== null && (Number.isNaN(min) || min < 0)) {
    return 'Minimum price must be a non-negative number.';
  }
  if (max !== null && (Number.isNaN(max) || max < 0)) {
    return 'Maximum price must be a non-negative number.';
  }
  if (min !== null && max !== null && min > max) {
    return 'Minimum cannot exceed maximum.';
  }
  return null;
}

export function applyClientFilters(products, { brands = [], minPrice, maxPrice, search = '' }) {
  let result = products;

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }

  if (brands.length > 0) {
    const set = new Set(brands.map((b) => b.toLowerCase()));
    result = result.filter((p) => p.brand && set.has(p.brand.toLowerCase()));
  }

  const min = minPrice === '' || minPrice == null ? null : Number(minPrice);
  const max = maxPrice === '' || maxPrice == null ? null : Number(maxPrice);

  if (min !== null && !Number.isNaN(min)) {
    result = result.filter((p) => p.price >= min);
  }
  if (max !== null && !Number.isNaN(max)) {
    result = result.filter((p) => p.price <= max);
  }

  return result;
}

export function extractBrands(products) {
  const brands = new Set();
  products.forEach((p) => {
    if (p.brand?.trim()) brands.add(p.brand);
  });
  return Array.from(brands).sort((a, b) => a.localeCompare(b));
}

export function parseFiltersFromSearchParams(searchParams) {
  const category = searchParams.get('category') || '';
  const brandsParam = searchParams.get('brands') || searchParams.get('brand') || '';
  const brands = brandsParam
    ? brandsParam.split(',').map((b) => b.trim()).filter(Boolean)
    : [];
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const search = searchParams.get('q') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  return { category, brands, minPrice, maxPrice, search, page };
}

export function buildSearchParamsFromFilters({
  category, brands, minPrice, maxPrice, search, page,
}) {
  const params = new URLSearchParams();

  if (category) params.set('category', category);
  if (brands.length > 0) params.set('brands', brands.join(','));
  if (minPrice !== '' && minPrice != null) params.set('minPrice', String(minPrice));
  if (maxPrice !== '' && maxPrice != null) params.set('maxPrice', String(maxPrice));
  if (search?.trim()) params.set('q', search.trim());
  if (page > 1) params.set('page', String(page));

  return params;
}

export function normalizeCategorySlug(category) {
  if (!category) return '';
  if (typeof category === 'string') return category;
  if (typeof category === 'object') {
    if (typeof category.slug === 'string') return category.slug;
    if (typeof category.name === 'string') return category.name;
  }
  return String(category);
}

export function formatCategoryLabel(slug) {
  const value = normalizeCategorySlug(slug);
  if (!value) return '';

  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getTotalPages(total, pageSize = PAGE_SIZE) {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export function countActiveFilters({ category, brands, minPrice, maxPrice, search }) {
  return (
    (category ? 1 : 0) +
    brands.length +
    (minPrice !== '' ? 1 : 0) +
    (maxPrice !== '' ? 1 : 0) +
    (search?.trim() ? 1 : 0)
  );
}
