'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-sky-400" /> Contact Engineering
          </h1>
          <p className="text-slate-400 text-sm">
            Interested in collaboration, architecture consulting, or high-performance web solutions? Drop a line below.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Message Transmitted
            </div>
            <p className="text-xs text-emerald-400/80">
              Thank you for reaching out. I will respond promptly.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-mono underline text-emerald-300 hover:text-white"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400">Project Details / Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, technical scope, or timeline..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded border border-rose-500/20">
                <AlertCircle className="w-4 h-4" /> Failed to send message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-sm font-bold uppercase rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Transmitting...' : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}