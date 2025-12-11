import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-teal-700 text-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3 flex-1 min-w-0">
            <Image
              src="/Coat_of_arms_of_Malawi.svg"
              alt="Malawi"
              width={48}
              height={48}
              className="rounded-sm flex-shrink-0"
            />
            <div className="hidden sm:block truncate">
              <h1 className="text-xl font-bold leading-tight">MaHIS Mini</h1>
              <p className="text-xs opacity-90 leading-none">Maternal & Child Health</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold">MaHIS Mini</h1>
            </div>
          </Link>

          {/* Desktop Info */}
          <div className="hidden lg:flex items-center text-right text-xs">
            <div>
              <p className="opacity-80">Presidential Initiative</p>
              <p className="font-semibold">Digital Health Division</p>
            </div>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}