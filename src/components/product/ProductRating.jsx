import { Star } from 'lucide-react';

export default function ProductRating({ rating, showValue = true, size = 'sm' }) {
  const full = Math.floor(rating);
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';

  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < full ? 'fill-accent text-accent' : 'fill-line text-line'}`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-muted">{rating}</span>
      )}
    </div>
  );
}
