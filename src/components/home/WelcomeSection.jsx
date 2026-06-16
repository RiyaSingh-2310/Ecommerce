import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export default function WelcomeSection() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="label-xs mb-2">Dashboard</p>
      <h1 className="heading-lg sm:text-3xl">
        Welcome back, {firstName}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Here&apos;s what&apos;s happening in your store today.
      </p>
    </motion.div>
  );
}
