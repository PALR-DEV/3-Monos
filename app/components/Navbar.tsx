'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight hover:scale-105 transition-transform duration-200">
          3 Monos
        </Link>

        <button
          className="sm:hidden p-2 rounded-md hover:bg-white/10 transition-all duration-200 relative z-10"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative">
            <span className={`absolute top-1 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`absolute top-3 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute top-5 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className="hidden sm:flex gap-6 items-center">
          <Link href="/" className="hover:text-gray-300 transition-colors duration-200 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/menu" className="hover:text-gray-300 transition-colors duration-200 relative group">
            Menu
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors duration-200 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/20 border-t border-white/5">
          <div className="px-4 py-3 flex flex-col">
            <Link 
              href="/" 
              className="block py-3 px-2 rounded-md hover:bg-white/5 transition-all duration-200 transform hover:translate-x-2"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/menu" 
              className="block py-3 px-2 rounded-md hover:bg-white/5 transition-all duration-200 transform hover:translate-x-2"
              onClick={() => setOpen(false)}
            >
              Menu
            </Link>
            <Link 
              href="/contact" 
              className="block py-3 px-2 rounded-md hover:bg-white/5 transition-all duration-200 transform hover:translate-x-2"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}