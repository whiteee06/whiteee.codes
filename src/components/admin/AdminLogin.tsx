import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, User, KeyRound, AlertCircle, ArrowLeft, Sparkles, Mail, Info } from 'lucide-react';

interface AdminLoginProps {
  onClose?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [opNotAllowedHelp, setOpNotAllowedHelp] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setOpNotAllowedHelp(false);
    setLoading(true);
    try {
      await signInWithGoogle();
      if (onClose) onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setOpNotAllowedHelp(false);

    if (!identifier || !password) {
      setError('Please enter your admin username or email address and password.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(identifier, password);
        setSuccess('Administrator account configured and authenticated!');
      } else {
        await signInWithEmail(identifier, password);
      }
      if (onClose) onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setOpNotAllowedHelp(true);
        setError('Email/Password provider is not enabled in Firebase Console. Use Google Sign-In below for instant 1-click admin access.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please verify your admin password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Account already exists. Try logging in.');
      } else {
        setError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!identifier) {
      setError('Please enter your admin username or email address.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(identifier);
      setSuccess('Password reset link dispatched! Check your email inbox.');
      setShowReset(false);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setOpNotAllowedHelp(true);
        setError('Email/Password authentication is disabled in Firebase. Use Google Sign-In above.');
      } else {
        setError(err.message || 'Failed to send password reset email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0f0f18]/90 border border-violet-500/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </button>
        )}

        <div className="text-center mt-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-3 text-violet-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            WHITEe<span className="text-violet-400">.CODES</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Admin Control Dashboard Sign-In</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-red-200">{error}</p>
              {opNotAllowedHelp && (
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  💡 <strong>Tip:</strong> Click the <strong>Continue with Authorized Google Account</strong> button below to sign in instantly with <code>nithiarasu248@gmail.com</code>.
                </p>
              )}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {showReset ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your registered admin username or email below to receive reset instructions.
            </p>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username or Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="whiteee06 or nithiarasu248@gmail.com"
                  required
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50 text-sm"
            >
              {loading ? 'Sending Reset Link...' : 'Send Password Reset Email'}
            </button>

            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="w-full text-xs text-slate-400 hover:text-white py-1"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Primary Google Auth Action Button */}
            <div className="p-1 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-[#12121e] hover:bg-[#1a1a2e] text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm disabled:opacity-50 cursor-pointer shadow-xl"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Account</span>
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f0f18] px-2 text-slate-500">Or password authentication</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Username or Email</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="nithiarasu248@gmail.com"
                    required
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="text-[11px] text-violet-400 hover:text-violet-300"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1b1b2a] hover:bg-[#25253b] border border-slate-700/80 text-white font-medium py-2.5 rounded-xl transition-all text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-violet-400" />
                {loading
                  ? 'Authenticating...'
                  : isSignUp
                  ? 'Configure Password Auth'
                  : 'Sign In with Password'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  {isSignUp
                    ? 'Already configured? Sign in instead'
                    : 'First time setup? Configure password authentication'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
