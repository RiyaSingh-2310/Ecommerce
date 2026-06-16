import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-3xl border border-error bg-error-soft px-6 py-14 text-center"
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-error-soft">
        <AlertCircle className="h-7 w-7 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-6" variant="dark">
          Try again
        </Button>
      )}
    </motion.div>
  );
}
