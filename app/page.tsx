import React from 'react';
import Image from 'next/image';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { WorkspaceCanvas } from '@/components/intro/WorkspaceCanvas';
import { ArrowUpRight, Code2, Cpu, Database, Server, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { Project } from '@/types/database';

export const revalidate = 60; // Revalidate dynamic projects every 60 seconds

async function getProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { 
          return cookieStore.get(name)?.value; 
        }
      }
    }
  );

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (projects as Project[]) || [];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white font-sans">
      {/* Interactive Workstation Intro */}
      <WorkspaceCanvas />

      {/* Main Developer Portfolio */}
      <div id="content" className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        
        {/* Developer Hero Section */}
        <section className="space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Full-Stack Software Engineer
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight font-mono">
            Architecting Scalable, <br />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Lag-Free Web Systems
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            I engineer high-performance web applications, resilient backend microservices, and end-to-end database systems optimized for speed, SEO, and robust security.
          </p>

          <div className="flex items-center gap-4 pt-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Terminal className="w-4 h-4 text-sky-400" />
              TypeScript & HTML/CSS/JS
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Database className="w-4 h-4 text-emerald-400" />
              PostgreSQL & Supabase
            </div>
          </div>
        </section>

        {/* Technical Competencies Grid */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">Core Engineering Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Frontend Architecture', desc: 'Next.js 14+, React, HTML5/CSS3/JS', icon: Code2 },
              { title: 'Performance Optimization', desc: 'Sub-second load times & 100 Lighthouse score', icon: Zap },
              { title: 'Backend & APIs', desc: 'Node.js, REST, GraphQL, Serverless Edge', icon: Server },
              { title: 'Database & Auth', desc: 'Supabase PostgreSQL, RLS, Schema Design', icon: ShieldCheck },
            ].map((tech) => (
              <div key={tech.title} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition">
                <tech.icon className="w-6 h-6 text-sky-400 mb-3" />
                <h3 className="font-semibold text-slate-200">{tech.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Software Engineering Showcase */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Software Systems Showcase</h2>
              <p className="text-xs text-sky-400 font-mono mt-1">● Live Data Synced with Supabase</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group border border-slate-800 rounded-2xl p-6 bg-slate-900/30 hover:border-slate-700 transition">
                <div className="h-48 rounded-lg bg-slate-800 mb-4 overflow-hidden relative">
                  <Image 
                    src={project.thumbnail_url} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition" />
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  {project.short_description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800/50">
                    {project.repository_visibility}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}