import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { getPasswordRules } from '../../utils/validation';

const RULES = [
  { key: 'minLength', label: 'Minimum 8 characters' },
  { key: 'uppercase', label: 'At least one uppercase letter' },
  { key: 'lowercase', label: 'At least one lowercase letter' },
  { key: 'number', label: 'At least one number' },
  { key: 'special', label: 'At least one special character' },
];

export default function PasswordStrengthChecklist({ password }) {
  const rules = getPasswordRules(password);
  const active = password.length > 0;

  if (!active) return null;

  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="space-y-2 rounded-xl bg-surface-muted p-3"
    >
      {RULES.map(({ key, label }) => {
        const met = rules[key];
        return (
          <motion.li
            key={key}
            initial={false}
            animate={{ opacity: met ? 1 : 0.55 }}
            className="flex items-center gap-2 text-xs"
          >
            <motion.span
              animate={{ scale: met ? 1 : 0.85 }}
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                met ? 'border-primary bg-primary text-on-primary' : 'border-default text-transparent'
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </motion.span>
            <span className={met ? 'font-medium text-ink' : 'text-muted'}>{label}</span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
