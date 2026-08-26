import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
// Replace line 7 with this:
import { ArrowLeft, ExternalLink, Cpu, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';
import { Project } from '@/types/database';

export const revalidate = 60;

async function getProject(slug: string): Promise<Project | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; }
      }
    }
  );

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  return (data as Project) || null;
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link 
          href="/#content" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Showcase
        </Link>

        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-950 text-sky-400 border border-sky-800/50">
              {project.category}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
              Repo: {project.repository_visibility}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-mono text-white">
            {project.title}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed">
            {project.short_description}
          </p>

          <div className="flex gap-4 pt-4 font-mono text-xs">
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition"
              >
                <ExternalLink className="w-4 h-4" /> Live System
              </a>
            )}
            {project.source_url && (
  <a 
    href={project.source_url} 
    target="_blank" 
    rel="noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg transition"
  >
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
    Source Code
  </a>
)}
          </div>
        </div>

        {project.hero_image_url || project.thumbnail_url ? (
          <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-slate-800">
            <Image 
              src={project.hero_image_url || project.thumbnail_url} 
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {project.problem_statement && (
              <section className="space-y-3">
                <h2 className="text-lg font-bold font-mono text-sky-400 flex items-center gap-2">
                  <Terminal className="w-5 h-5" /> Problem Statement
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {project.problem_statement}
                </p>
              </section>
            )}

            {project.solution_statement && (
              <section className="space-y-3">
                <h2 className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Implemented Solution
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {project.solution_statement}
                </p>
              </section>
            )}

            {project.outcome_statement && (
              <section className="space-y-3">
                <h2 className="text-lg font-bold font-mono text-purple-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" /> Measured Outcome
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {project.outcome_statement}
                </p>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" /> System Specs
              </h3>
              {project.architecture_overview && (
                <div>
                  <p className="text-xs text-slate-500 font-mono">Architecture</p>
                  <p className="text-sm text-slate-200 mt-1">{project.architecture_overview}</p>
                </div>
              )}
              {project.challenges_lessons && (
                <div>
                  <p className="text-xs text-slate-500 font-mono">Challenges & Lessons</p>
                  <p className="text-sm text-slate-200 mt-1">{project.challenges_lessons}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}