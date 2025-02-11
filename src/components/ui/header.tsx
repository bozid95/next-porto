import { ModeToggle } from "@/components/ui/darkmode";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="w-full max-w-5xl mx-auto px-6 py-4  bg-white
      dark:bg-black shadow-md 
      sticky top-0 z-20 transition-all duration-300 ease-in-out 
      flex justify-between items-center "
    >
      {/* Logo atau Judul */}
      <h1 className="text-lg md:text-xl font-semibold tracking-tight">
        <Link
          href="/"
          className="inline-block  text-blue-900 dark:text-blue-400 "
        >
          My Portfolio
        </Link>
      </h1>

      {/* Toggle Mode */}
      <ModeToggle />
    </header>
  );
}
