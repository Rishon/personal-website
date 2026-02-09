import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
      <div className="animate-section">
        <h1 className="text-6xl sm:text-8xl font-bold text-[var(--text-secondary)] mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--paragraph-color)] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-medium transition-all duration-200 hover:translate-y-[-2px]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
