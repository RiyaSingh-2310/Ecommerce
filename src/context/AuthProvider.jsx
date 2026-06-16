import { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { AuthContext } from './authContext';
import { isPasswordStrong } from '../utils/validation';
import {
  readSession,
  persistSession,
  clearSession,
  readUsers,
  persistUsers,
  authenticateCredentials,
  emailExists,
} from '../utils/authStorage';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const hydrate = () => {
      try {
        const stored = readSession();
        if (!cancelled) setSession(stored);
      } catch {
        if (!cancelled) setSession(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));

    const auth = authenticateCredentials(email, password);
    if (auth) {
      persistSession(auth);
      setSession(auth);
      toast.success('Login successful', { description: `Welcome back, ${auth.user.name}` });
      return { ok: true };
    }

    toast.error('Login failed', { description: 'Invalid email or password.' });
    return { ok: false, error: 'Invalid email or password.' };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 700));

    if (!isPasswordStrong(password)) {
      toast.error('Sign up failed', { description: 'Password does not meet requirements.' });
      return { ok: false, error: 'Password does not meet requirements.' };
    }

    if (emailExists(email)) {
      toast.error('Sign up failed', { description: 'An account with this email already exists.' });
      return { ok: false, error: 'Email already registered.' };
    }

    const users = readUsers();
    users.push({ name, email, password });
    persistUsers(users);

    toast.success('Account created', { description: 'Please sign in with your new account.' });
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    toast.success('Logout successful');
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated: Boolean(session?.isAuthenticated),
      user: session?.user ?? null,
      login,
      signup,
      logout,
    }),
    [isLoading, session, login, signup, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
