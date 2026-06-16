import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../constants/auth';
import { EMAIL_REGEX } from '../../utils/validation';
import FloatingInput from './FloatingInput';
import DemoCredentials from './DemoCredentials';
import Button from '../ui/Button';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = touched.email && !email
    ? 'Email is required'
    : touched.email && !EMAIL_REGEX.test(email)
      ? 'Enter a valid email'
      : '';

  const passwordError = touched.password && !password ? 'Password is required' : '';
  const emailSuccess = touched.email && email && EMAIL_REGEX.test(email);
  const canSubmit = email && password && !emailError && !passwordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.ok) navigate('/', { replace: true });
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setTouched({ email: true, password: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-3xl border border-default bg-surface-elevated p-8 shadow-elevated"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in to continue shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FloatingInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="demo.user@theexample.com"
          error={emailError}
          success={emailSuccess}
          autoComplete="email"
        />

        <FloatingInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          placeholder="demoUser@the123"
          error={passwordError}
          autoComplete="current-password"
        />

        <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-6">
        <DemoCredentials onFill={fillDemo} />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-medium text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
