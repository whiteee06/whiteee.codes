import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { Save, Check, User, MapPin, Mail, Phone, Globe, Image as ImageIcon } from 'lucide-react';

export const HeroTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({ ...personalInfo });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          <h2 className="text-xl font-bold text-white tracking-tight">Hero & Introduction Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Update your main headline, personal branding, status, and profile details.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved Successfully!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0f0f18] p-6 border border-slate-800/80 rounded-2xl">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Name / Display Name</label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Tagline</label>
          <input
            type="text"
            name="brandTagline"
            value={formData.brandTagline || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Punchline / Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Biography</label>
          <textarea
            name="shortBio"
            rows={4}
            value={formData.shortBio || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Current Work Status Badge</label>
          <input
            type="text"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Logo / Profile Avatar Path or URL</label>
          <div className="relative">
            <ImageIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl || ''}
              onChange={handleChange}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
