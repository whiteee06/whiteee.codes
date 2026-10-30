import React from 'react';
import { Store, UserCheck, LayoutTemplate, Bot, Palette, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = usePortfolioData();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-6 h-6 text-cyan-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-violet-400" />;
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-6 h-6 text-indigo-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-fuchsia-400" />;
      default:
        return <LayoutTemplate className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#0a0a12] border-t border-white/[0.05]">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Palette className="w-3.5 h-3.5 text-violet-400" />
            <span>04 // OFFERINGS &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Services I Offer
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Delivering clean, responsive, and performance-minded web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="group relative p-7 rounded-3xl bg-[#11121f]/75 border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#151628]/90 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none rounded-tr-3xl"></div>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-violet-500/40 group-hover:bg-violet-950/20 transition-colors">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {service.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {service.highlights && service.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-violet-600/20 border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer group/btn"
                  >
                    <span>Request this service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-violet-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-violet-950/60 via-[#131428] to-cyan-950/50 border border-violet-500/30 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-l from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>

          <div className="max-w-xl text-left">
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block mb-2">
              Ready to build something impactful?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Let&apos;s Work Together
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Have an idea, project, or website you need built? Let&apos;s connect to discuss how AI-assisted development and modern design can bring it to life.
            </p>
          </div>

          <button
            onClick={() => onSelectService('General Collaboration / Web Project')}
            className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowRight className="w-4 h-4 text-cyan-200" />
          </button>
        </div>

      </div>
    </section>
  );
};
