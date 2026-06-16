import { useContext } from 'react';
import { SettingsContext } from '../context/settingsContext';

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings requires SettingsProvider');
  return ctx;
}
