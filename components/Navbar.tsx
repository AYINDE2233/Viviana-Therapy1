"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "CONTACT", path: "/contact" },
    { name: "CHECK GIFT CARD BALANCE", path: "/gift-card-balance" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Fixed top positioning ensures it stays visible while scrolling */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <nav className="flex items-center justify-between px-4 py-4 md:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-white text-lg md:text-xl font-bold"
          >
            <span className="w-8 h-8 rounded-full bg-[#ea7a24] flex items-center justify-center text-white text-sm shadow-md">
              🌿
            </span>
            <span className="font-serif text-2xl tracking-wide text-white drop-shadow-sm">
              Therapy by Vivianaspa
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition ${
                  isActive(link.path)
                    ? "text-[#ea7a24] font-bold"
                    : "text-stone-200 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Book Appointment Button (Desktop) */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="hidden md:block bg-[#ea7a24] hover:bg-[#d66a1a] text-white font-medium px-6 py-2 rounded-full transition text-sm shadow-md"
          >
            Book Appointment
          </button>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md p-6 flex flex-col space-y-3 md:hidden shadow-2xl rounded-b-2xl border-t border-zinc-800">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold py-3 transition text-sm tracking-wider w-full block rounded-xl px-4 ${
                    isActive(link.path)
                      ? "bg-zinc-800/80 text-[#ea7a24]"
                      : "text-white border-b border-zinc-800/60 hover:text-[#ea7a24]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="bg-[#ea7a24] hover:bg-[#d66a1a] text-white font-bold py-3.5 rounded-xl transition mt-4 text-sm w-full"
              >
                Book Appointment
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </>
  );
}