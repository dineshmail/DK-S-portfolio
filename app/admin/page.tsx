import React from 'react';
import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Plus, Eye, ShieldCheck } from 'lucide-react';
import { Project } from '@/types/database';

export const revalidate = 0;

async function getAdminData() {
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

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return { projects: (projects as Project[]) || [], user: session.user };
}

export default async function AdminDashboardPage() {
  const { projects, user } = await getAdminData();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-sky-400" /> CMS Management Console
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">Authenticated as: {user.email}</p>
          </div>

          <div className="flex gap-3 font-mono text-xs">
            <Link 
              href="/admin/projects/new" 
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Project
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900 rounded-lg text-slate-300 transition"
            >
              View Live App →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
            <span className="text-xs text-slate-500">Total Projects</span>
            <p className="text-2xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
            <span className="text-xs text-slate-500">Published Status</span>
            <p className="text-2xl font-bold text-emerald-400">
              {projects.filter(p => p.status === 'published').length}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
            <span className="text-xs text-slate-500">Database Connection</span>
            <p className="text-2xl font-bold text-sky-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Active RLS
            </p>
          </div>
        </div>

        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30">
          <div className="p-4 border-b border-slate-800 font-mono text-xs uppercase text-slate-400 flex justify-between items-center">
            <span>Portfolio Entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 font-mono text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-medium text-white">{project.title}</td>
                    <td className="p-4 font-mono text-xs text-slate-400">{project.category}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${
                        project.status === 'published' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                          : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}