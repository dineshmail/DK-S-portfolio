'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Showcase', href: '/#content' },
    { name: 'About', href: '/about' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono font-bold text-white text-sm">
          <Terminal className="w-5 h-5 text-sky-400" />
          <span>DK<span className="text-sky-400">.sys</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  isActive ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-md border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white transition"
          >
            Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}