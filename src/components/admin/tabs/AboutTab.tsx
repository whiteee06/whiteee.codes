import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { Save, Check, UserCheck, BookOpen, Lightbulb } from 'lucide-react';

export const AboutTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({
    shortBio: personalInfo.shortBio || '',
    status: personalInfo.status || '',
    location: personalInfo.location || '',
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
          <h2 className="text-xl font-bold text-white tracking-tight">About Me & Philosophy</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Update your biography, student background, and core vibe coding methodology.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Bio'}
        </button>
      </div>

      <div className="space-y-4 bg-[#0f0f18] p-6 border border-slate-800/80 rounded-2xl">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Biography & Story</label>
          <textarea
            rows={6}
            value={formData.shortBio}
            onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Status Badge Text</label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Timezone</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
