import { SETTINGS_STORAGE_KEY } from '../constants/brand';

const DEFAULTS = {
  emailNotifications: true,
  orderUpdates: true,
  promotions: false,
  productRecommendations: true,
  wishlistAlerts: true,
  profileVisible: true,
  saveSearchHistory: true,
  showPricesWithTax: false,
  compactLayout: false,
  analyticsEnabled: true,
};

export function readSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const data = JSON.parse(raw);
    return { ...DEFAULTS, ...data };
  } catch {
    return { ...DEFAULTS };
  }
}

export function persistSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

export { DEFAULTS as DEFAULT_SETTINGS };
