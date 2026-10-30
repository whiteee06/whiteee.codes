import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { SOCIAL_LINKS } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSocialPlaceholder: (name: string, url: string, hint: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSocialPlaceholder, onOpenAdmin }) => {
  const { personalInfo } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060609] border-t border-white/[0.08] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400">
                <img
                  src={personalInfo.logoUrl}
                  alt="WHITEe.CODES Logo"
                  className="w-full h-full rounded-full object-cover bg-black"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">
                  {personalInfo.name}
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  {personalInfo.brandName} &bull; {personalInfo.brandTagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{personalInfo.status}</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About Me' },
                { id: 'skills', label: 'Skills & Tech' },
                { id: 'projects', label: 'Featured Projects' },
                { id: 'services', label: 'Services' },
                { id: 'contact', label: 'Contact Me' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Connect &amp; Inquiries
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {SOCIAL_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onOpenSocialPlaceholder(link.name, link.url, link.placeholderHint)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-400">
              <div>
                Phone / WhatsApp:{' '}
                <a href={`tel:${personalInfo.phone}`} className="text-cyan-300 hover:underline">
                  {personalInfo.phoneFormatted || personalInfo.phone}
                </a>
              </div>
              <div>
                Direct Email:{' '}
                <a href={`mailto:${personalInfo.email}`} className="text-slate-300 hover:underline">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
                else window.location.hash = '#admin';
              }}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-violet-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>Admin Control</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
