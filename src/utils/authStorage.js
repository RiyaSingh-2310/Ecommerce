import {
  AUTH_STORAGE_KEY,
  USERS_STORAGE_KEY,
  DEMO_EMAIL,
  DEMO_PASSWORD,
} from '../constants/auth';
import { getInitials } from '../utils/validation';

export function readSession() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    if (!data.isAuthenticated || !data.user) return null;
    return data;
  } catch {
    return null;
  }
}

export function persistSession(data) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function persistUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
}

export function buildUserSession({ name, email }) {
  return {
    isAuthenticated: true,
    user: {
      name,
      email,
      initials: getInitials(name),
      country: 'United States',
    },
  };
}

export function authenticateCredentials(email, password) {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return buildUserSession({ name: 'Demo User', email: DEMO_EMAIL });
  }

  const registered = readUsers().find(
    (u) => u.email === email && u.password === password,
  );

  if (registered) {
    return buildUserSession({ name: registered.name, email: registered.email });
  }

  return null;
}

export function emailExists(email) {
  if (email === DEMO_EMAIL) return true;
  return readUsers().some((u) => u.email === email);
}
