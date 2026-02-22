export default function Loading() {
  return (
    <div className="w-full animate-pulse">

      {/* Welcome section skeleton */}
      <div className="pt-2 pb-10 mb-10 border-b border-border space-y-3">
        <div className="h-2.5 w-20 bg-muted rounded-full" />
        <div className="h-8 w-56 bg-muted rounded-lg" />
        <div className="h-4 w-80 bg-muted rounded-full" />
      </div>

      {/* Action buttons skeleton */}
      <div className="flex gap-4 mb-10">
        <div className="h-24 w-44 bg-muted rounded-xl" />
        <div className="h-24 w-44 bg-muted rounded-xl" />
      </div>

      {/* KPI strip skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Chart + feed skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-64 bg-muted rounded-xl" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>

    </div>
  );
}
