import { useState, useCallback, useMemo, useEffect } from 'react';
import { SettingsContext } from './settingsContext';
import { readSettings, persistSettings } from '../utils/settingsStorage';

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => readSettings());
  const isLoading = false;

  useEffect(() => {
    persistSettings(settings);
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(() => ({
    settings,
    isLoading,
    updateSetting,
  }), [settings, isLoading, updateSetting]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
