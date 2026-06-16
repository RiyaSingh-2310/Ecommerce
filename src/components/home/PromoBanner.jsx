import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Percent, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-default bg-gradient-to-br from-primary to-accent p-8 sm:p-10"
    >
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            <Percent className="h-3.5 w-3.5" />
            Limited time offer
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Save up to 30% on selected brands
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Premium deals on electronics, beauty, and home essentials. Shop before they are gone.
          </p>
        </div>
        <Link to="/products">
          <Button variant="secondary" className="border-white/20 bg-white text-primary hover:bg-white/90">
            Shop deals
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
