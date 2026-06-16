export default function AuthPageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md space-y-4">
        <div className="mx-auto h-10 w-32 shimmer rounded-xl" />
        <div className="h-64 w-full shimmer rounded-3xl" />
      </div>
    </div>
  );
}
