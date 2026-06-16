export default function PageContainer({
  children,
  className = '',
  fullHeight = false,
}) {
  return (
    <div
      className={[
        'page-container w-full px-4 py-6 sm:px-6 lg:px-8',
        fullHeight && 'lg:flex lg:min-h-[calc(100dvh-var(--header-height))] lg:flex-col lg:overflow-hidden',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
