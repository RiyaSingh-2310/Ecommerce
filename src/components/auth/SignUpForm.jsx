import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { EMAIL_REGEX, isPasswordStrong } from '../../utils/validation';
import FloatingInput from './FloatingInput';
import PasswordStrengthChecklist from './PasswordStrengthChecklist';
import { APP_NAME } from '../../constants/brand';
import Button from '../ui/Button';

export default function SignUpForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  const nameError = touched.name && !name.trim() ? 'Full name is required' : '';
  const emailError = touched.email && !email
    ? 'Email is required'
    : touched.email && !EMAIL_REGEX.test(email)
      ? 'Enter a valid email'
      : '';
  const passwordError = touched.password && !password
    ? 'Password is required'
    : touched.password && !isPasswordStrong(password)
      ? 'Password does not meet requirements'
      : '';
  const confirmError = touched.confirm && !confirm
    ? 'Please confirm your password'
    : touched.confirm && confirm !== password
      ? 'Passwords do not match'
      : '';
  const confirmSuccess = touched.confirm && confirm && confirm === password;

  const canSubmit = name.trim()
    && EMAIL_REGEX.test(email)
    && isPasswordStrong(password)
    && confirm === password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!canSubmit) return;

    setLoading(true);
    const result = await signup(name.trim(), email, password);
    setLoading(false);

    if (result.ok) navigate('/login', { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-3xl border border-default bg-surface-elevated p-8 shadow-elevated"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Create account</h1>
        <p className="mt-2 text-sm text-muted">Join {APP_NAME} and start shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FloatingInput
          id="name"
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="Jane Doe"
          error={nameError}
          success={touched.name && name.trim().length > 1}
          autoComplete="name"
        />

        <FloatingInput
          id="signup-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="you@example.com"
          error={emailError}
          success={touched.email && EMAIL_REGEX.test(email)}
          autoComplete="email"
        />

        <div className="space-y-2">
          <FloatingInput
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="Create a strong password"
            error={passwordError}
            autoComplete="new-password"
          />
          <PasswordStrengthChecklist password={password} />
        </div>

        <FloatingInput
          id="confirm-password"
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
          placeholder="Repeat your password"
          error={confirmError}
          success={confirmSuccess}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
