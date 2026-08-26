import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-10 font-mono text-xs text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Software Systems Showcase. All rights reserved.</p>
        
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-slate-300 transition">About</Link>
          <Link href="/architecture" className="hover:text-slate-300 transition">Architecture</Link>
          <Link href="/contact" className="hover:text-slate-300 transition">Contact</Link>
          <Link href="/admin" className="hover:text-slate-300 transition">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}