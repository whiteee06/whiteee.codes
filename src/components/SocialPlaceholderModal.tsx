import React from 'react';
import { X, ExternalLink, Info, Copy, Check } from 'lucide-react';

interface SocialPlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    url: string;
    hint: string;
  } | null;
}

export const SocialPlaceholderModal: React.FC<SocialPlaceholderModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="social-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#10111e] border border-violet-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-violet-950/80">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Placeholder Profile
            </span>
            <span className="text-xs font-mono text-slate-400">{data.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <h3 id="social-modal-title" className="text-lg font-bold text-white mb-2">
          {data.name} Profile Link
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
          {data.hint}
        </p>

        {/* URL box */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 mb-6 font-mono text-xs text-slate-300">
          <span className="truncate">{data.url}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors shrink-0"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
