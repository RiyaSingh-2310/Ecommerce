export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-surface-secondary text-muted',
    accent: 'bg-accent-soft text-accent',
    dark: 'bg-surface-secondary text-ink',
    count: 'bg-accent text-on-primary min-w-[18px] h-[18px] text-[10px] font-bold',
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
