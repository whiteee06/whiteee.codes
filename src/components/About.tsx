import React from 'react';
import { Brain, Code2, Sparkles, Compass, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Brain,
      title: 'Artificial Intelligence & Data Science',
      description:
        'Driven by curiosity in intelligent algorithms, machine learning concepts, data patterns, and modern generative AI models. Focused on transforming theoretical understanding into real, working software solutions.',
      accent: 'from-violet-500 to-indigo-600',
      badge: 'Academic Discipline',
    },
    {
      icon: Sparkles,
      title: 'AI-Assisted "Vibe Coding"',
      description:
        'Embracing the modern vibe coder paradigm—utilizing AI tools and prompt engineering to accelerate development cycles, iterate fluidly on code, and turn conceptual sketches into functional prototypes at remarkable speed.',
      accent: 'from-cyan-400 to-blue-600',
      badge: 'Development Style',
    },
    {
      icon: Code2,
      title: 'Modern Web Craft & Problem-Solving',
      description:
        'Building responsive, fast, and accessible digital web experiences. Believing that software should not just compute correctly, but feel great, solve tangible problems, and remain simple to navigate.',
      accent: 'from-fuchsia-500 to-violet-600',
      badge: 'Product Craft',
    },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Understand & Brainstorm',
      desc: 'Clarify core user goals, constraints, and creative direction.',
    },
    {
      num: '02',
      title: 'AI-Augmented Architecture',
      desc: 'Use generative tools & prompt workflows to outline components & logic.',
    },
    {
      num: '03',
      title: 'Hands-On Code & Refine',
      desc: 'Write clean React/TypeScript code, enforce responsiveness, and test edge cases.',
    },
    {
      num: '04',
      title: 'Ship Digital Experiences',
      desc: 'Deliver modern, elegant web solutions ready for real users.',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0a0a10] border-t border-white/[0.05]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            An AI &amp; Data Science Student Building with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">
              Modern AI &amp; Code
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            I am an Artificial Intelligence &amp; Data Science student dedicated to learning how 
            data and intelligent models can be synthesized with modern web engineering. As a vibe coder, 
            I love creative problem-solving and building useful digital products with AI-assisted development.
          </p>
        </div>

        {/* Narrative & Focus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Narrative Story (5 Cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent pointer-events-none"></div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>Core Mindset</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              Turning Concepts into Functional Reality
            </h3>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                My focus lies in understanding machine learning foundations, Python programming, 
                and web technologies—then connecting them to build intuitive digital tools.
              </p>
              <p>
                Rather than treating AI as just theory or code as just syntax, I practice{' '}
                <strong className="text-white font-medium">vibe coding</strong>: leveraging 
                prompt engineering, LLM workbench tools like Google AI Studio, and modern frontend 
                frameworks to build, iterate, and deploy without friction.
              </p>
              <p>
                Whether it is building budgeting assistants like{' '}
                <span className="text-cyan-300 font-medium">PocketSmart AI</span>, crafting 
                clean websites for small businesses, or experimenting with generative workflows, 
                I enjoy finding creative, elegant solutions to everyday challenges.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="text-slate-400">Current Focus:</span>
              <span className="text-violet-300 font-medium">AI Web Apps &bull; Responsive UI</span>
            </div>
          </div>

          {/* 3 Core Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#11121d]/70 border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#141525]/80 transition-all duration-300 group shadow-lg shadow-black/20"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-tr ${pillar.accent} text-white shadow-md shadow-violet-900/30 group-hover:scale-105 transition-transform duration-200 shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <h4 className="text-base font-semibold text-white group-hover:text-violet-200 transition-colors">
                          {pillar.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                          {pillar.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Workflow / Vibe Coding Timeline Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-violet-950/40 via-[#101221] to-cyan-950/30 border border-violet-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Development Methodology
              </span>
              <h4 className="text-lg font-bold text-white mt-1">
                How I Build: The Vibe Coding Workflow
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-violet-300 bg-violet-900/30 px-3 py-1 rounded-full border border-violet-700/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fast Iteration Cycle</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 transition-all duration-200"
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-2">
                  {step.num}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {step.title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
