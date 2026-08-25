'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const WorkspaceCanvas: React.FC = () => {
  const router = useRouter();
  const [trainPos, setTrainPos] = useState<number>(0);
  const [isEngaged, setIsEngaged] = useState<boolean>(false);
  const [skipIntro, setSkipIntro] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('portfolio_intro_seen') === 'true') {
      setSkipIntro(true);
    }
  }, []);

  const handleStart = () => {
    setIsEngaged(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setTrainPos(current);
      if (current >= 100) {
        clearInterval(interval);
        localStorage.setItem('portfolio_intro_seen', 'true');
        router.push('/#content');
      }
    }, 20);
  };

  const handleSkip = () => {
    localStorage.setItem('portfolio_intro_seen', 'true');
    router.push('/#content');
  };

  if (skipIntro) return null;

  return (
    <section className="relative w-full h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8">
      <div className="flex justify-between items-center z-10">
        <span className="font-mono text-xs text-slate-400">DEV // WORKSTATION</span>
        <button onClick={handleSkip} className="font-mono text-xs px-3 py-1 border border-slate-700 hover:border-slate-400 rounded">
          Skip Intro →
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto text-center space-y-4">
        <div className="relative w-full h-3 bg-slate-800 rounded-full border border-slate-700 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-600 -translate-y-1/2" />
          <div 
            className="absolute top-0 bottom-0 w-8 bg-sky-500 rounded shadow-[0_0_12px_#0ea5e9]"
            style={{ left: `calc(${trainPos}% - ${trainPos * 0.32}px)` }}
          />
        </div>
        <button
          onClick={handleStart}
          disabled={isEngaged}
          className="px-6 py-2.5 bg-slate-100 hover:bg-white text-slate-950 font-mono text-xs uppercase font-bold rounded"
        >
          {isEngaged ? 'Initializing System...' : 'Start The Journey'}
        </button>
      </div>
    </section>
  );
};