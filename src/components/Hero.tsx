import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, MessageSquare, Mail, Github, Linkedin, ExternalLink, Code2, Zap, Phone } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { SOCIAL_LINKS } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onContactMe: () => void;
  onOpenSocialPlaceholder: (name: string, url: string, hint: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onContactMe,
  onOpenSocialPlaceholder,
}) => {
  const { personalInfo } = usePortfolioData();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle interactive generative background canvas (neural particles with connecting threads)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ['rgba(139, 92, 246, ', 'rgba(56, 189, 248, ', 'rgba(99, 102, 241, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.7)`;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-cyan-300" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/30 text-xs text-violet-200 mb-6 backdrop-blur-md shadow-sm">
              <img
                src={personalInfo.logoUrl}
                alt="WHITEe.CODES"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-mono font-bold text-cyan-300">
                {personalInfo.brandName}
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="font-mono font-medium tracking-wide text-slate-300">
                AI-Assisted Web Craft
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
              <span className="block">{personalInfo.name}</span>
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 mb-6 flex items-center flex-wrap gap-2">
              <span>{personalInfo.title}</span>
            </div>

            <blockquote className="border-l-2 border-violet-500/60 pl-4 py-1 text-base sm:text-lg text-slate-300 font-light italic mb-6">
              &ldquo;{personalInfo.tagline}&rdquo;
            </blockquote>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
              {personalInfo.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreWork}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-cyan-200" />
              </button>

              <button
                onClick={onContactMe}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-violet-500/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Contact Me</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-white/[0.08] w-full">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-violet-400" />
                  Connect &amp; Social Links:
                </span>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIAL_LINKS.map((link) => {
                  return (
                    <button
                      key={link.id}
                      onClick={() => onOpenSocialPlaceholder(link.name, link.url, link.placeholderHint)}
                      className="group relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/40 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                      title={`${link.name}: ${link.placeholderHint}`}
                      aria-label={`${link.name} ${link.isPlaceholder ? '(Placeholder Link)' : ''}`}
                    >
                      {getSocialIcon(link.id)}
                      {link.isPlaceholder && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-400 ring-2 ring-[#08080c]"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-[spin_40s_linear_infinite] flex items-center justify-center">
                <div className="absolute top-2 left-1/4 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]"></div>
                <div className="absolute bottom-4 right-1/4 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a855f7]"></div>
              </div>

              <div className="absolute inset-6 rounded-full border border-dashed border-cyan-500/20 animate-[spin_28s_linear_infinite_reverse]"></div>

              <div className="relative w-64 h-64 rounded-3xl bg-gradient-to-tr from-[#131322] via-[#1a1b32] to-[#161a2e] border border-violet-500/30 p-6 flex flex-col justify-between shadow-2xl shadow-violet-950/60 backdrop-blur-2xl group hover:border-cyan-400/40 transition-all duration-500">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                    NG.CORE // VIBE_MODE
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center my-1">
                  <div className="relative w-18 h-18 rounded-full p-[2px] bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-600/40 mb-2 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={personalInfo.logoUrl}
                      alt="WHITEe.CODES Logo"
                      className="w-full h-full rounded-full object-cover bg-black"
                    />
                  </div>
                  <span className="text-xs font-mono font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-violet-300">
                    {personalInfo.brandName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider mt-0.5">
                    {personalInfo.brandTagline}
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Workflow
                    </span>
                    <span className="text-cyan-300 font-medium">AI-Assisted Dev</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-violet-400" />
                      Project
                    </span>
                    <span className="text-violet-300 font-medium">PocketSmart AI</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-2 px-3 py-2 rounded-xl bg-[#141524]/90 border border-violet-500/40 shadow-xl backdrop-blur-md flex items-center gap-2 transform hover:scale-105 transition-transform duration-200">
                <span className="text-sm">⚡</span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Approach</div>
                  <div className="text-xs font-semibold text-white">Vibe Coder</div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 px-3.5 py-2 rounded-xl bg-[#141524]/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex items-center gap-2.5 transform hover:scale-105 transition-transform duration-200">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Discipline</div>
                  <div className="text-xs font-semibold text-white">AI &amp; Data Science</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
