import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { SkillItem } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, Check, X, Sparkles, Brain, Code2, Zap, Terminal } from 'lucide-react';

export const SkillsTab: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolioData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<SkillItem, 'id'>>({
    name: '',
    category: 'dev',
    description: '',
    icon: 'Code2',
    badge: 'Core Skill',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    try {
      await addSkill(form);
      setShowAddModal(false);
      setForm({ name: '', category: 'dev', description: '', icon: 'Code2', badge: 'Core Skill' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, updated: Partial<SkillItem>) => {
    try {
      await updateSkill(id, updated);
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Skills & Tech Stack</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, edit, or remove technical skills across AI, web development, and vibe coding workflows.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f18] border border-violet-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Add New Skill Entry</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js, PyTorch, LangChain"
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  >
                    <option value="ai">AI & Machine Learning</option>
                    <option value="dev">Full-Stack Development</option>
                    <option value="workflow">Vibe Coding Workflow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="Core Focus, Cutting Edge"
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your mastery or how you apply this skill in projects..."
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium shadow-lg shadow-violet-600/20"
                >
                  Create Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl relative group hover:border-violet-500/30 transition-all"
          >
            {editingId === skill.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  className="w-full bg-[#161622] border border-violet-500 rounded-lg px-3 py-1.5 text-sm text-white font-semibold"
                />
                <textarea
                  value={skill.description}
                  rows={2}
                  onChange={(e) => updateSkill(skill.id, { description: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <span className="text-[10px] text-violet-400 uppercase tracking-wider font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingId(skill.id)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(skill.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/60"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2">{skill.description}</p>

                {skill.badge && (
                  <span className="inline-block mt-3 px-2.5 py-0.5 bg-violet-500/10 border border-violet-500/20 text-[10px] text-violet-300 rounded-md font-medium">
                    {skill.badge}
                  </span>
                )}
              </div>
            )}

            {/* Confirm Delete Dialog */}
            {deleteConfirmId === skill.id && (
              <div className="absolute inset-0 bg-[#0f0f18]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center z-10 border border-red-500/30">
                <p className="text-xs font-semibold text-white">Delete "{skill.name}"?</p>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">This action cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-medium"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
