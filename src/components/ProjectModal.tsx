import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-[#10111d] border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-violet-950/80 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/15 rounded-full blur-[90px] pointer-events-none"></div>

        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-900/50 text-cyan-300 border border-violet-500/40">
                {project.status}
              </span>
              <span className="text-xs font-mono text-slate-400">Featured Showcase</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Tagline */}
          <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-cyan-400 mb-4">
            {project.tagline}
          </p>

          {/* Main Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Features */}
          {project.keyFeatures && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Key Capabilities &amp; Highlights
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Tags */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Technologies &amp; Disciplines
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 flex-wrap">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
          >
            Close Overview
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-600/30 transition-all"
            >
              <span>Launch Live Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
