import { motion } from 'framer-motion';
import BrandLogo from '../layout/BrandLogo';
import { APP_NAME } from '../../constants/brand';

const FLOATING_CARDS = [
  { title: 'Wireless Headphones', price: '$89', rotate: -8, x: -20, y: 0, delay: 0 },
  { title: 'Minimal Watch', price: '$249', rotate: 6, x: 40, y: 60, delay: 0.2 },
  { title: 'Leather Sneakers', price: '$129', rotate: -4, x: -30, y: 140, delay: 0.4 },
];

function FloatingCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: [card.y, card.y - 12, card.y],
        rotate: card.rotate,
      }}
      transition={{
        opacity: { duration: 0.6, delay: card.delay },
        y: { duration: 4 + card.delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ left: `${50 + card.x}%`, top: `${20 + card.y / 4}%` }}
      className="login-hero-card absolute w-44 -translate-x-1/2 rounded-2xl p-4"
    >
      <div className="login-hero-card-thumb mb-3 aspect-square" />
      <p className="text-sm font-medium text-hero">{card.title}</p>
      <p className="text-xs text-hero-muted">{card.price}</p>
    </motion.div>
  );
}

export default function LoginHero() {
  return (
    <div className="relative hidden h-full overflow-hidden lg:block">
      <div className="login-hero-bg animate-hero-gradient absolute inset-0" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGxPcGFjaXR5PSIwLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC04di0yaDR2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />

      <div className="relative z-10 flex h-full flex-col justify-between p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BrandLogo variant="hero" to={null} />
          <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed text-hero-muted">
            Curated products. Seamless checkout. A {APP_NAME} shopping experience worth remembering.
          </p>
        </motion.div>

        <div className="relative flex-1">
          {FLOATING_CARDS.map((card) => (
            <FloatingCard key={card.title} card={card} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-hero-subtle"
        >
          Trusted by thousands of shoppers worldwide
        </motion.p>
      </div>
    </div>
  );
}
