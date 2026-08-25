import React from 'react';
import { WorkspaceCanvas } from '@/components/intro/WorkspaceCanvas';
import { ArrowUpRight, Code2, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Interactive Workstation Intro */}
      <WorkspaceCanvas />

      {/* Main Portfolio Content */}
      <div id="content" className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        
        {/* Hero Section */}
        <section className="space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            SEO & Performance Optimized Engine
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            High-Performance Web Applications & <br />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Digital Product Solutions
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Specializing in high-speed, lag-free frontend architectures, robust database integrations, 
            and scalable web solutions built with modern standards.
          </p>
        </section>

        {/* Tech Stack Grid */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">Core Architecture Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Next.js / React', desc: 'Server Side Rendering & App Router', icon: Code2 },
              { title: 'Tailwind CSS', desc: 'Zero-runtime fast styling', icon: Zap },
              { title: 'TypeScript', desc: 'End-to-end type safety', icon: Cpu },
              { title: 'Supabase', desc: 'PostgreSQL & RLS Auth Security', icon: ShieldCheck },
            ].map((tech) => (
              <div key={tech.title} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition">
                <tech.icon className="w-6 h-6 text-sky-400 mb-3" />
                <h3 className="font-semibold text-slate-200">{tech.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Preview */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Featured Work</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Live database integration active</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group border border-slate-800 rounded-2xl p-6 bg-slate-900/30 hover:border-slate-700 transition">
              <div className="h-48 rounded-lg bg-slate-800 mb-4 flex items-center justify-center text-slate-600 font-mono text-sm">
                [ Dynamic Supabase Asset ]
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition">
                  High-Performance Enterprise Solution
                </h3>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition" />
              </div>
              <p className="text-slate-400 text-sm mt-2">
                Sub-second load times, dynamic data fetching, and customized UI/UX workflow built for global accessibility.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}