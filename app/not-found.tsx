import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full space-y-6 text-center bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
        <div className="inline-flex p-3 bg-slate-800 text-rose-400 rounded-full">
          <Terminal className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">404</h1>
          <p className="text-xs text-rose-400">ERR_ROUTE_NOT_FOUND</p>
          <p className="text-slate-400 text-xs font-sans mt-2">
            The requested route does not exist.
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    </main>
  );
}