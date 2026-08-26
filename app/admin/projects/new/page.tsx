'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowLeft, PlusCircle, AlertCircle } from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Full Stack',
    short_description: '',
    problem_statement: '',
    solution_statement: '',
    outcome_statement: '',
    live_url: '',
    source_url: '',
    repository_visibility: 'public',
    status: 'published'
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from('projects').insert([form]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return to Dashboard
        </Link>

        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-sky-400" /> Create New Showcase Project
          </h1>
        </div>

        {error && (
          <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400">Project Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ 
                  ...form, 
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                })}
                placeholder="High-Speed E-Commerce Engine"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-sky-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400">URL Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-300 focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Short Summary</label>
            <input
              type="text"
              required
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              placeholder="A fast web application built with Next.js and Supabase."
              className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-sky-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Problem Statement</label>
            <textarea
              rows={3}
              value={form.problem_statement}
              onChange={(e) => setForm({ ...form, problem_statement: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-sky-500 outline-none font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Solution Statement</label>
            <textarea
              rows={3}
              value={form.solution_statement}
              onChange={(e) => setForm({ ...form, solution_statement: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-sky-500 outline-none font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold uppercase rounded transition disabled:opacity-50 mt-4"
          >
            {loading ? 'Publishing...' : 'Publish Project Record'}
          </button>
        </form>
      </div>
    </main>
  );
}