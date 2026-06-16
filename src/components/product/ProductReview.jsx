import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ProductRating from './ProductRating';

function ReviewCard({ rating, title, body, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl bg-surface-muted p-5"
    >
      <ProductRating rating={rating} size="sm" />
      <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-secondary">{body}</p>
    </motion.div>
  );
}

export default function ProductReviews({ rating }) {
  const reviews = [
    {
      rating: Math.min(5, rating),
      title: 'Great quality',
      body: 'Exactly as described. Fast delivery and solid build quality for the price point.',
    },
    {
      rating: Math.max(3, rating - 0.5),
      title: 'Would recommend',
      body: 'Clean design and comfortable to use daily. Would buy again.',
    },
  ];

  return (
    <section className="mt-12 border-t border-default pt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="heading-md">Customer reviews</h2>
          <p className="mt-1 text-sm text-muted">Based on marketplace ratings</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-surface-muted px-3 py-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-bold text-ink">{rating}</span>
          <span className="text-sm text-muted">/ 5</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <ReviewCard key={r.title} {...r} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
