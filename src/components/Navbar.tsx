import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Code, Terminal, ShieldCheck } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenAdmin }) => {
  const { personalInfo } = usePortfolioData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#08080c]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl p-1"
            aria-label="Nithiarasu G. Home"
          >
            <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 transition-transform duration-300 group-hover:scale-105 shadow-md shadow-violet-600/30">
              <img
                src={personalInfo.logoUrl}
                alt="WHITEe.CODES Logo"
                className="w-full h-full rounded-full object-cover bg-black"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5 group-hover:text-violet-300 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{personalInfo.brandName}</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-violet-300">Vibe Coder</span>
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/80 to-indigo-600/80 text-white shadow-lg shadow-violet-900/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
                else window.location.hash = '#admin';
              }}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/40 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-md shadow-violet-600/20 hover:shadow-violet-600/40 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              <span>Let's Connect</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c0d14]/95 backdrop-blur-2xl px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-violet-600/20 text-cyan-300 border border-violet-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                </button>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmin) onOpenAdmin();
                  else window.location.hash = '#admin';
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-violet-300 bg-violet-950/40 border border-violet-500/30"
              >
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span>Admin Dashboard Login</span>
              </button>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-600/30"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
