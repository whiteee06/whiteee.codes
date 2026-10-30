import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { Save, Check, Settings, ShieldAlert } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({
    brandName: personalInfo.brandName || 'WHITEe.CODES',
    brandTagline: personalInfo.brandTagline || 'LEARN • BUILD • CREATE',
    title: personalInfo.title || '',
    tagline: personalInfo.tagline || '',
    logoUrl: personalInfo.logoUrl || '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updatePersonalInfo(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Website Settings & SEO Metadata</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure site title, metadata, brand logos, theme styling, and global parameters.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved Settings!' : 'Save Website Settings'}
        </button>
      </div>

      <div className="space-y-6 bg-[#0f0f18] p-6 border border-slate-800/80 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name / Navbar Logo Title</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Tagline</label>
            <input
              type="text"
              value={formData.brandTagline}
              onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Logo / Profile Image Asset Path</label>
          <input
            type="text"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 font-mono text-xs"
          />
        </div>

        <div className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl flex items-start gap-3">
          <Settings className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-white">Security & Environment Information</p>
            <p className="text-slate-400">
              Database Provider: <span className="text-violet-300">Firebase Firestore Enterprise</span>
            </p>
            <p className="text-slate-400">
              Authentication Provider: <span className="text-violet-300">Firebase Authentication (Google & Email)</span>
            </p>
            <p className="text-slate-400">
              Security Model: <span className="text-emerald-400 font-medium">Role-Based Access Control (RBAC) with Firestore Security Rules</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
