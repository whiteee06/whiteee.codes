import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Terminal,
  Zap,
  Code2,
  FileCode2,
  Layers,
  GitBranch,
  Cpu,
  Filter
} from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Skills: React.FC = () => {
  const { skills } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'dev' | 'workflow'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-violet-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-300" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-rose-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-violet-400" />;
    }
  };

  const filteredSkills = skills.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="skills" className="relative py-24 bg-[#090910] border-t border-white/[0.05]">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span>02 // TECH STACK &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Skills &amp; Technologies
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Curated stack spanning modern Artificial Intelligence, core web languages, and rapid vibe coding workflows.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1 mr-2" />
          {[
            { id: 'all', label: `All Stack (${skills.length})` },
            { id: 'ai', label: 'AI & Generative Tools' },
            { id: 'dev', label: 'Core Dev & Python' },
            { id: 'workflow', label: 'Vibe & Workflow' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-900/30'
                  : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative p-6 rounded-2xl bg-[#11121d]/80 border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#141525]/90 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent pointer-events-none rounded-tr-2xl"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-violet-500/30 group-hover:bg-violet-950/20 transition-colors">
                    {getIcon(skill.icon)}
                  </div>

                  {skill.badge && (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-violet-950/60 text-violet-300 border border-violet-500/30">
                      {skill.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 capitalize">
                  {skill.category === 'ai'
                    ? 'AI & Machine Learning'
                    : skill.category === 'dev'
                    ? 'Engineering & Web'
                    : 'Workflow & Prototyping'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
