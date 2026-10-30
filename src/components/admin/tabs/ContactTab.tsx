import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { Mail, Phone, MessageSquare, Trash2, CheckCircle2, Clock, Inbox, Save, Check } from 'lucide-react';

export const ContactTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo, messages, deleteMessage, toggleMessageRead } = usePortfolioData();
  const [formData, setFormData] = useState({
    email: personalInfo.email || '',
    phone: personalInfo.phone || '',
    phoneFormatted: personalInfo.phoneFormatted || '',
    whatsappUrl: personalInfo.whatsappUrl || '',
    githubPlaceholder: personalInfo.githubPlaceholder || '',
    linkedinPlaceholder: personalInfo.linkedinPlaceholder || '',
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
    <div className="space-y-8">
      {/* Direct Contact Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Direct Contact & Channels</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update phone numbers, WhatsApp, email, and social profiles displayed on the website.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Channels'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0f0f18] p-6 border border-slate-800/80 rounded-2xl">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Direct Chat Link</label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={formData.whatsappUrl}
                onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                className="w-full bg-[#161622] border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile Link</label>
            <input
              type="text"
              value={formData.githubPlaceholder}
              onChange={(e) => setFormData({ ...formData, githubPlaceholder: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile Link</label>
            <input
              type="text"
              value={formData.linkedinPlaceholder}
              onChange={(e) => setFormData({ ...formData, linkedinPlaceholder: e.target.value })}
              className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            />
          </div>
        </div>
      </form>

      {/* Visitor Inquiries / Messages Inbox */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Inbox className="w-5 h-5 text-violet-400" /> Visitor Inquiries Inbox ({messages.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Messages received via the website contact form securely stored in Firestore.
            </p>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 bg-[#0f0f18] border border-slate-800/80 rounded-2xl text-center">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No inquiries yet</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Messages sent by visitors via Option A mailto form will appear here if synced.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border transition-all ${
                  msg.read
                    ? 'bg-[#0f0f18]/60 border-slate-800/60 opacity-80'
                    : 'bg-[#121220] border-violet-500/40 shadow-lg shadow-violet-900/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => toggleMessageRead(msg.id, !!msg.read)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                      title={msg.read ? 'Mark Unread' : 'Mark Read'}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${msg.read ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </button>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {msg.service && (
                  <span className="inline-block px-2.5 py-0.5 bg-violet-500/10 text-violet-300 text-[10px] rounded-md mb-2 font-medium">
                    Requested Service: {msg.service}
                  </span>
                )}

                <p className="text-xs text-slate-200 leading-relaxed bg-[#0a0a10] p-3 rounded-xl border border-slate-800/80">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
