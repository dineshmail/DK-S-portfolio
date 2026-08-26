import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Server, Database, FastForward } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Showcase
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
            <Server className="w-8 h-8 text-purple-400" /> Platform Topology
          </h1>
          <p className="text-slate-400 text-sm">
            Technical overview explaining how this application achieves dynamic server rendering, secure data queries, and high speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono font-bold text-sm">
              <FastForward className="w-5 h-5" /> Next.js App Router
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Pages are generated via Server Components (RSC) to serve pre-rendered HTML to browsers and search crawlers instantly.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
              <Database className="w-5 h-5" /> PostgreSQL & Supabase
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Structured database storage with Row-Level Security (RLS) guaranteeing protected admin operations and fast public reads.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}