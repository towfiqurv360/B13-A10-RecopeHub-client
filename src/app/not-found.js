import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 shadow-lg shadow-orange-500/10">
          <FiAlertTriangle className="text-5xl" aria-hidden="true" />
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
          Error 404
        </p>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for does not exist or may have been moved.
          Let&apos;s get you back to RecipeHub.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-700 hover:to-amber-600"
          >
            <FiHome />
            Back Home
          </Link>

          <Link
            href="/recipes"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-700 transition-colors hover:border-orange-500 hover:text-orange-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400"
          >
            <FiArrowLeft />
            Browse Recipes
          </Link>
        </div>
      </div>
    </section>
  );
}
