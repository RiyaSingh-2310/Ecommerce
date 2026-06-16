import { motion } from 'framer-motion';
import { Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../constants/auth';
import Button from '../ui/Button';
import { tapScale } from '../../constants/motion';

async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard', { description: label });
  } catch {
    toast.error('Copy failed');
  }
}

function CopyRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate text-sm font-medium text-ink">{value}</p>
      </div>
      <motion.button
        type="button"
        onClick={() => copyText(value, label)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-accent/30 hover:text-accent"
        aria-label={`Copy ${label}`}
        {...tapScale}
      >
        <Copy className="h-3.5 w-3.5" />
      </motion.button>
    </div>
  );
}

export default function DemoCredentials({ onFill }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-2xl border border-default bg-gradient-to-br from-primary-soft to-surface p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold text-ink">Demo account</span>
      </div>

      <div className="space-y-2">
        <CopyRow label="Email" value={DEMO_EMAIL} />
        <CopyRow label="Password" value={DEMO_PASSWORD} />
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="mt-3 w-full"
        onClick={onFill}
      >
        Fill credentials
      </Button>
    </motion.div>
  );
}
