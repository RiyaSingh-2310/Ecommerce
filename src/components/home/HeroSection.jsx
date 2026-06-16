import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { APP_NAME } from '../../constants/brand';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="dashboard-hero relative overflow-hidden rounded-3xl p-8 sm:p-12">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-hero-badge mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Featured promotions · {APP_NAME}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="dashboard-hero-title text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Premium picks,<br />
          <span className="dashboard-hero-subtitle">curated just for you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-hero-subtitle mt-4 max-w-lg text-sm leading-relaxed sm:text-base"
        >
          Discover curated products, exclusive deals, and a seamless shopping experience built for modern commerce.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/products">
            <Button className="gap-2 shadow-md">
              Shop featured
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="ghost" className="dashboard-hero-btn-secondary gap-2 shadow-sm hover:opacity-90">
              Browse catalog
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
