import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const techStack = [
    { category: "Frontend Core", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React / Next.js", "Tailwind CSS"] },
    { category: "Backend & DB", items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"] },
    { category: "DevOps & Tools", items: ["Vercel", "Git / GitHub", "SEO & Performance Optimization"] }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Showcase
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-8">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-950 text-sky-400 border border-sky-800/50">
            Web & Systems Developer
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-mono text-white">
            High-Performance Web Solutions & Architecture
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Specializing in building ultra-fast, responsive, and SEO-optimized digital platforms with modern web standards.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-mono font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-400" /> Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-4 font-mono">
            {techStack.map((stack) => (
              <div key={stack.category} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
                <h3 className="text-xs uppercase text-slate-400 tracking-wider font-bold">{stack.category}</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-mono font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" /> Principles
          </h2>
          <div className="border-l-2 border-slate-800 pl-6 space-y-8 font-mono text-sm">
            <div className="space-y-1">
              <span className="text-xs text-sky-400">01. Zero-Lag UI</span>
              <h3 className="text-white font-bold">Fast Load Times & Smooth Rendering</h3>
              <p className="text-slate-400 text-xs font-sans">
                Optimized asset delivery, lightweight DOM footprints, and continuous Core Web Vitals checks.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-emerald-400">02. Search Engine Visibility</span>
              <h3 className="text-white font-bold">SEO & Semantic HTML</h3>
              <p className="text-slate-400 text-xs font-sans">
                Clean semantic markup, dynamic sitemaps, structured data, and high accessibility standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}