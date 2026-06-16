import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { tapScale } from '../../constants/motion';

export default function Accordion({
  title,
  defaultOpen = true,
  children,
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line pb-4 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <motion.span {...tapScale}>
          <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
        </motion.span>
      </summary>
      <motion.div
        initial={false}
        className="pt-1"
      >
        {children}
      </motion.div>
    </details>
  );
}
