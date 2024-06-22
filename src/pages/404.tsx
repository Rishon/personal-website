// Components
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Main Container */}
      <div className="w-full max-w-4xl mt-4 space-y-4 text-center sm:text-left">
        {/* 404 - Error Message */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            404 - Page Not Found 👻
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            The page you{"'"}re looking for doesn{"'"}t exist. Go{" "}
            <Link href="/" className="text-red-500 underline">
              back
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
