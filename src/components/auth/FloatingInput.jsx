import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

const FloatingInput = forwardRef(function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  success,
  placeholder,
  autoComplete,
}, ref) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent)'
            : '0 0 0 0px transparent',
        }}
        className={`relative overflow-hidden rounded-xl border bg-surface-input transition-colors ${
          error
            ? 'border-error'
            : success
              ? 'border-success'
              : focused
                ? 'border-primary'
                : 'border-default hover:border-secondary'
        }`}
      >
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 transition-token-fast ${
            floated
              ? 'top-2 text-[10px] font-semibold uppercase tracking-wider text-muted'
              : 'top-1/2 -translate-y-1/2 text-sm text-muted'
          }`}
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder={floated ? placeholder : ''}
          autoComplete={autoComplete}
          className={`w-full bg-transparent px-4 pb-3 pt-7 text-sm text-ink outline-none placeholder:text-muted/50 ${
            isPassword ? 'pr-12' : error || success ? 'pr-10' : ''
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-ink"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}

        {!isPassword && success && (
          <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-success" />
        )}
        {!isPassword && error && (
          <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-error" />
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-error"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

export default FloatingInput;
