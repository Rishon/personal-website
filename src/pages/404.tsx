import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import WordSettle from "@/components/WordSettle";

export default function NotFound() {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center">
      <p className="mb-2 font-editorial text-6xl font-extralight italic leading-none text-accent md:text-7xl">
        404
      </p>

      <h1 className="mb-1 text-title">
        <WordSettle delay={0.05}>This page isn&apos;t here.</WordSettle>
      </h1>

      <p className="mb-v-md max-w-prose text-lede">
        <WordSettle delay={0.14}>
          It either moved, or it never existed in the first place.
        </WordSettle>
      </p>

      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium leading-none text-ink shadow-hairline transition-colors duration-200 hover:bg-ink-hover"
        >
          <LuArrowLeft className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </div>
    </div>
  );
}
