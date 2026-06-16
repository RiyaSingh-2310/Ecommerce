import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useHomeData } from '../hooks/useHomeData';
import PageContainer from '../components/layout/PageContainer';
import WelcomeSection from '../components/home/WelcomeSection';
import DashboardStats from '../components/home/DashboardStats';
import HeroSection from '../components/home/HeroSection';
import ProductSection from '../components/home/ProductSection';
import CategoryGrid from '../components/home/CategoryGrid';
import TrendingCarousel from '../components/home/TrendingCarousel';
import PromoBanner from '../components/home/PromoBanner';
import ErrorState from '../components/shared/ErrorState';

export default function HomePage() {
  useDocumentTitle('Home');
  const {
    featured, trending, recommended, categories, totalProducts, loading, error,
  } = useHomeData();

  if (error) {
    return (
      <PageContainer>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-10 sm:space-y-12"
      >
        <WelcomeSection />
        <DashboardStats totalProducts={totalProducts} loading={loading} />
        <HeroSection />
        <ProductSection
          title="Featured products"
          subtitle="Hand-picked favorites for you"
          products={featured}
          loading={loading}
        />
        <CategoryGrid categories={categories} loading={loading} />
        <TrendingCarousel products={trending} loading={loading} />
        <PromoBanner />
        <ProductSection
          title="Recommended for you"
          subtitle="Based on trending items"
          products={recommended}
          loading={loading}
        />
      </motion.div>
    </PageContainer>
  );
}
