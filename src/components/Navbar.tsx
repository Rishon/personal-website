"use client";

// Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { FaSpotify } from "react-icons/fa";

export default function Navbar() {
  const currentPage = usePathname();

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full max-w-4xl px-4 sm:px-0 mx-auto mt-16 flex flex-col sm:flex-row items-center">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <p
              className={`text-2xl ${
                currentPage === link.path
                  ? "text-white-500 cursor-pointer"
                  : "hover:text-white text-gray-700 cursor-pointer"
              }`}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Listening to */}
      <div className="bg-gray-700 bg-opacity-20 p-2 rounded-lg ml-auto">
        <div className="text-white flex items-center text-green-500">
          <span className="mr-2">Not listening to anything</span>
          <FaSpotify className="text-xl mt-1" />
        </div>
      </div>
    </header>
  );
}
