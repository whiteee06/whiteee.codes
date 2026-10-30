import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08080c] px-4 py-16 relative overflow-hidden">
      {/* Glow ambient background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center relative z-10 p-8 rounded-3xl bg-[#10111e]/90 border border-violet-500/30 backdrop-blur-xl shadow-2xl shadow-violet-950/60"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
          className="inline-flex p-4 rounded-2xl bg-violet-600/20 text-cyan-300 border border-violet-500/30 mb-6 shadow-inner"
        >
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </motion.div>

        <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 font-bold">
          Error 404
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The requested page or route doesn&apos;t exist. You might have clicked a broken link or navigated to an unmapped path.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReturnHome}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-violet-600/30 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
