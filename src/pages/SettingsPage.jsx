import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSettings } from '../hooks/useSettings';
import { useTheme } from '../hooks/useTheme';
import Toggle from '../components/ui/Toggle';

function SettingsSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-default bg-surface p-6 shadow-card">
      <h2 className="heading-md">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-default pb-5 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  useDocumentTitle('Settings');
  const { settings, updateSetting, isLoading } = useSettings();
  const { theme, setTheme } = useTheme();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-48 shimmer rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your preferences and privacy</p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SettingsSection title="Appearance" description="Customize how Leegality looks">
          <SettingsRow label="Dark mode" description="Use dark theme across the app">
            <Toggle
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
          </SettingsRow>
          <SettingsRow label="Compact layout" description="Reduce spacing in product grids">
            <Toggle
              checked={settings.compactLayout}
              onChange={(v) => updateSetting('compactLayout', v)}
              aria-label="Toggle compact layout"
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Notification preferences" description="Choose what you want to hear about">
          <SettingsRow label="Order updates" description="Shipping and delivery alerts">
            <Toggle
              checked={settings.orderUpdates}
              onChange={(v) => updateSetting('orderUpdates', v)}
              aria-label="Order notifications"
            />
          </SettingsRow>
          <SettingsRow label="Promotions" description="Sales and new product announcements">
            <Toggle
              checked={settings.promotions}
              onChange={(v) => updateSetting('promotions', v)}
              aria-label="Promo notifications"
            />
          </SettingsRow>
          <SettingsRow label="Wishlist alerts" description="Price drops on saved items">
            <Toggle
              checked={settings.wishlistAlerts}
              onChange={(v) => updateSetting('wishlistAlerts', v)}
              aria-label="Wishlist notifications"
            />
          </SettingsRow>
          <SettingsRow label="Email notifications" description="Receive updates via email">
            <Toggle
              checked={settings.emailNotifications}
              onChange={(v) => updateSetting('emailNotifications', v)}
              aria-label="Email notifications"
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Account preferences">
          <SettingsRow label="Product recommendations" description="Personalized suggestions on home">
            <Toggle
              checked={settings.productRecommendations}
              onChange={(v) => updateSetting('productRecommendations', v)}
              aria-label="Product recommendations"
            />
          </SettingsRow>
          <SettingsRow label="Save search history" description="Remember recent product searches">
            <Toggle
              checked={settings.saveSearchHistory}
              onChange={(v) => updateSetting('saveSearchHistory', v)}
              aria-label="Save search history"
            />
          </SettingsRow>
          <SettingsRow label="Show prices with tax" description="Display estimated tax in listings">
            <Toggle
              checked={settings.showPricesWithTax}
              onChange={(v) => updateSetting('showPricesWithTax', v)}
              aria-label="Show prices with tax"
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Privacy settings" description="Control your data and visibility">
          <SettingsRow label="Profile visibility" description="Show profile in order confirmations">
            <Toggle
              checked={settings.profileVisible}
              onChange={(v) => updateSetting('profileVisible', v)}
              aria-label="Profile visibility"
            />
          </SettingsRow>
          <SettingsRow label="Analytics" description="Help improve Leegality with usage data">
            <Toggle
              checked={settings.analyticsEnabled}
              onChange={(v) => updateSetting('analyticsEnabled', v)}
              aria-label="Analytics"
            />
          </SettingsRow>
        </SettingsSection>
      </div>
    </PageContainer>
  );
}
