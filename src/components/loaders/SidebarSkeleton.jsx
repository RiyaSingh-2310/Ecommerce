import Shimmer from './Shimmer';

export default function SidebarSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading filters">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="space-y-3">
          <Shimmer className="h-4 w-24" />
          {Array.from({ length: 4 }, (_, j) => (
            <Shimmer key={j} className="h-9 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
