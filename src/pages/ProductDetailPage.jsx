import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getProductById, getProductsByCategory, resolveApiError } from '../services/productService';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReview';
import ProductSpecifications from '../components/product/ProductSpecifications';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductDetailSkeleton from '../components/loaders/ProductDetailSkeleton';
import ErrorState from '../components/shared/ErrorState';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);
  useDocumentTitle(product?.title || 'Product Details');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!id || Number.isNaN(Number(id))) {
        setError('Invalid product ID.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) {
          setError(resolveApiError(err));
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [id, retryToken]);

  useEffect(() => {
    if (!product?.category) return;
    let cancelled = false;

    (async () => {
      setRelatedLoading(true);
      try {
        const data = await getProductsByCategory(product.category, { limit: 12 });
        if (cancelled) return;
        const others = (data.products || []).filter((p) => p.id !== product.id);
        setRelated(others.slice(0, 4));
        setSimilar(others.slice(4, 8));
      } catch {
        if (!cancelled) {
          setRelated([]);
          setSimilar([]);
        }
      } finally {
        if (!cancelled) setRelatedLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [product?.id, product?.category]);

  const images = useMemo(() => {
    if (!product) return [];
    return [product.thumbnail, ...(product.images || [])].filter(
      (img, i, arr) => arr.indexOf(img) === i,
    );
  }, [product]);

  const goBack = () => navigate(location.state?.from || '/products');

  return (
    <PageContainer className="pb-12">
      <motion.button
        type="button"
        onClick={goBack}
        whileTap={{ scale: 0.97 }}
        className="mb-8 inline-flex items-center gap-2 rounded-xl bg-surface-muted px-3 py-2 text-sm font-medium text-secondary transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </motion.button>

      {loading && <ProductDetailSkeleton />}

      {error && !loading && (
        <ErrorState
          title="Couldn't load product"
          message={error}
          onRetry={() => setRetryToken((t) => t + 1)}
        />
      )}

      {product && !loading && !error && (
        <>
          <article className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <ProductGallery images={images} title={product.title} />
            <ProductInfo product={product} />
          </article>
          <ProductSpecifications product={product} />
          <ProductReviews rating={product.rating} />
          <RelatedProducts
            related={related}
            similar={similar}
            category={product.category}
            loading={relatedLoading}
          />
        </>
      )}
    </PageContainer>
  );
}
