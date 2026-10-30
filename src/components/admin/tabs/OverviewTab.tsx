import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { FolderGit2, Wrench, Sparkles, Mail, Database, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { personalInfo, skills, projects, services, messages, seedInitialData } = usePortfolioData();
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleSeed = async () => {
    setSeeding(true);
    setSeedSuccess(false);
    try {
      await seedInitialData();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-violet-900/30 via-[#121220] to-cyan-900/20 border border-violet-500/20 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 font-medium mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" /> Authorized Admin Session Active
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {personalInfo.shortName || 'Nithiarasu'}!
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Manage all content across <span className="text-violet-300 font-semibold">{personalInfo.brandName}</span> in real time. Changes saved here instantly update your live public portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 bg-[#1a1a2e] hover:bg-[#252542] border border-violet-500/30 text-violet-300 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-sm"
            >
              <Database className="w-4 h-4 text-violet-400" />
              {seeding ? 'Syncing Schema...' : 'Seed / Sync Database'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-lg shadow-violet-600/20"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Site
            </a>
          </div>
        </div>

        {seedSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Database successfully synced with initial portfolio blueprint!</span>
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl hover:border-violet-500/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">COLLECTION</span>
          </div>
          <p className="text-2xl font-bold text-white">{projects.length}</p>
          <p className="text-xs text-slate-400 mt-1">Total Projects Published</p>
        </div>

        <div
          onClick={() => onNavigateTab('skills')}
          className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">SKILLS</span>
          </div>
          <p className="text-2xl font-bold text-white">{skills.length}</p>
          <p className="text-xs text-slate-400 mt-1">Tech & Vibe Coding Skills</p>
        </div>

        <div
          onClick={() => onNavigateTab('services')}
          className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">SERVICES</span>
          </div>
          <p className="text-2xl font-bold text-white">{services.length}</p>
          <p className="text-xs text-slate-400 mt-1">Services Offered</p>
        </div>

        <div
          onClick={() => onNavigateTab('contact')}
          className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 animate-pulse">
                {unreadCount} NEW
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-white">{messages.length}</p>
          <p className="text-xs text-slate-400 mt-1">Inquiries Received</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-6 bg-[#0f0f18] border border-slate-800/80 rounded-2xl">
        <h3 className="text-sm font-semibold text-white mb-4">Quick Management Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateTab('projects')}
            className="p-4 bg-[#141422] hover:bg-[#1a1a2e] border border-slate-800 rounded-xl text-left transition-all hover:border-violet-500/30"
          >
            <p className="text-xs font-semibold text-violet-300">+ Add New Project</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Publish live demos or upcoming lab projects</p>
          </button>

          <button
            onClick={() => onNavigateTab('skills')}
            className="p-4 bg-[#141422] hover:bg-[#1a1a2e] border border-slate-800 rounded-xl text-left transition-all hover:border-cyan-500/30"
          >
            <p className="text-xs font-semibold text-cyan-300">+ Add New Skill</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Categorize AI, dev or workflow skills</p>
          </button>

          <button
            onClick={() => onNavigateTab('hero')}
            className="p-4 bg-[#141422] hover:bg-[#1a1a2e] border border-slate-800 rounded-xl text-left transition-all hover:border-violet-500/30"
          >
            <p className="text-xs font-semibold text-slate-200">Edit Hero & Headline</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Update introduction and tagline</p>
          </button>
        </div>
      </div>
    </div>
  );
};
