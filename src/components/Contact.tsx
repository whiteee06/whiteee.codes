import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ExternalLink,
  Sparkles,
  Phone
} from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ContactFormData, FormValidationErrors } from '../types/portfolio';
import { validateContactForm, sanitizeInput, createMailtoUrl } from '../utils/validation';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService = '' }) => {
  const { personalInfo, services, submitContactMessage } = usePortfolioData();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: preselectedService || 'Small Business Website Development',
    message: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedPrepared, setCopiedPrepared] = useState(false);
  const [isPreparedForEmail, setIsPreparedForEmail] = useState(false);
  const [demoMessageRecord, setDemoMessageRecord] = useState<ContactFormData | null>(null);
  const confirmationRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  React.useEffect(() => {
    if (isPreparedForEmail && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isPreparedForEmail]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyPreparedText = () => {
    if (!demoMessageRecord) return;
    const text = [
      `To: ${personalInfo.email}`,
      'Subject: Portfolio Inquiry - WHITEe.CODES',
      '',
      `Visitor Name: ${demoMessageRecord.name}`,
      `Visitor Email: ${demoMessageRecord.email}`,
      `Selected Service: ${demoMessageRecord.service}`,
      '',
      'Visitor Message:',
      demoMessageRecord.message,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopiedPrepared(true);
    setTimeout(() => setCopiedPrepared(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      service: formData.service || 'Small Business Website Development',
      message: sanitizeInput(formData.message),
    };

    const validation = validateContactForm(sanitizedData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setDemoMessageRecord(sanitizedData);
    setIsPreparedForEmail(true);

    // Persist to Firestore inbox
    try {
      await submitContactMessage(sanitizedData);
    } catch (err) {
      console.warn('Message sync error:', err);
    }

    const mailtoUrl = createMailtoUrl(sanitizedData, personalInfo.email || 'nithiarasu248@gmail.com');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 450);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Small Business Website Development',
      message: '',
    });
    setErrors({});
    setIsPreparedForEmail(false);
    setDemoMessageRecord(null);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#08080d] border-t border-white/[0.05]">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Contact &amp; Connect
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in starting a project or exploring a collaboration? Reach out through the direct channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl bg-[#11121e]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Direct Phone</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        Active Call
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-100 mt-0.5 block">
                      {personalInfo.phoneFormatted || personalInfo.phone}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Copy phone number"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-slate-400">Voice &amp; SMS</span>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Call Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#11121e]/80 border border-white/[0.08] hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">WhatsApp</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        Direct Chat
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-100 mt-0.5 block">
                      {personalInfo.phoneFormatted || personalInfo.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#11121e]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Primary Email</span>
                    <span className="text-sm font-bold text-white">{personalInfo.email}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Inbox
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Mail App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#11121e]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/10">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">GitHub</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-0.5 block truncate max-w-[200px]">
                      {personalInfo.githubPlaceholder}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#11121e]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">LinkedIn</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-0.5 block truncate max-w-[200px]">
                      {personalInfo.linkedinPlaceholder}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#10111e]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">
                Send an Inquiry
              </h3>
              <p className="text-xs text-slate-400">
                Fill out the form below to get in touch or discuss a project.
              </p>
            </div>

            {isPreparedForEmail && demoMessageRecord ? (
              <div ref={confirmationRef} className="p-6 rounded-2xl bg-[#141528] border border-cyan-500/40 text-left animate-fade-in shadow-2xl">
                <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/50 mb-5 flex items-start gap-3 shadow-lg">
                  <Sparkles className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                  <div className="text-sm font-semibold text-cyan-100 leading-relaxed">
                    Your email application will open with your message prepared. Please press Send to complete your inquiry.
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed mb-4 p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                  <span className="text-amber-300 font-semibold font-mono block mb-1">
                    ⚠️ Next Step:
                  </span>
                  Your inquiry has not been sent automatically. It has been prepared and opened in your email app.
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 mb-6 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
                    <span>Prepared Message Summary</span>
                    <span className="text-slate-400">To: {personalInfo.email}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Subject:</strong>{' '}
                    <span className="text-white">Portfolio Inquiry - WHITEe.CODES</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Visitor Name:</strong>{' '}
                    <span className="text-slate-200">{demoMessageRecord.name}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Visitor Email:</strong>{' '}
                    <span className="text-slate-200">{demoMessageRecord.email}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Selected Service:</strong>{' '}
                    <span className="text-cyan-300">{demoMessageRecord.service}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <strong className="text-slate-400 block mb-1">Visitor Message:</strong>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-200 whitespace-pre-wrap">
                      {demoMessageRecord.message}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={createMailtoUrl(demoMessageRecord, personalInfo.email || 'nithiarasu248@gmail.com')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-md shadow-violet-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Email App Again</span>
                  </a>

                  <button
                    onClick={handleCopyPreparedText}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                  >
                    {copiedPrepared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrepared ? 'Copied to Clipboard' : 'Copy Prepared Message'}</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-colors cursor-pointer"
                  >
                    Edit / New Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alex Johnson"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Service / Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#141525] border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or questions..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 active:scale-98 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
