import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <motion.div
        className="relative aspect-square overflow-hidden rounded-3xl bg-surface-muted"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={title}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: zoomed ? 1.08 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-contain p-8"
        />
      </motion.div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-colors ${
                active === i ? 'border-accent' : 'border-line hover:border-ink/20'
              }`}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
