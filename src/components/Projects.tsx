import React, { useState } from 'react';
import { ExternalLink, Sparkles, FolderGit2, Info, TrendingUp, Cpu } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-24 bg-[#08080f] border-t border-white/[0.05]">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>03 // FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Featured Projects &amp; Experiments
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real implementations combining modern UI engineering with AI-driven intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-[#11121e]/80 border border-white/[0.08] hover:border-violet-500/50 hover:bg-[#141526]/90 transition-all duration-300 shadow-2xl shadow-black/40 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-56 sm:h-64 bg-gradient-to-br from-[#121426] via-[#161932] to-[#0d0e19] border-b border-white/[0.06] p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-600/20 rounded-full blur-[70px] pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ${
                      project.status === 'Live Demo'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status === 'Live Demo' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'
                      }`}
                    ></span>
                    {project.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                    {project.isUpcoming ? 'In The Lab' : 'Featured App'}
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-center py-2">
                  <div className="w-full max-w-sm p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {project.isUpcoming ? (
                          <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                        )}
                        <span className="text-xs font-mono font-semibold text-white">{project.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-violet-300 px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30">
                        WHITEe.CODES
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>Architecture</span>
                        <span className="text-cyan-300">Modern React &amp; AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>{project.title}</span>
                  <span>{project.liveUrl || 'Portfolio Experiment'}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-violet-300/90 mb-3">{project.tagline}</p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 group-hover:border-violet-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-violet-500/40 hover:text-white transition-all cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-violet-400" />
                    <span>View Architecture</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
