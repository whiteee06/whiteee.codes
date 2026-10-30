import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { ProjectItem } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, ExternalLink, X, FolderGit2, CheckCircle, Sparkles } from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    tagline: '',
    description: '',
    status: 'Live Demo',
    liveUrl: '',
    githubUrl: '',
    isUpcoming: false,
    tags: ['React', 'AI', 'Tailwind CSS'],
    keyFeatures: ['Interactive dashboard', 'Responsive design'],
    techStack: ['React', 'Python', 'Tailwind CSS'],
  });

  const [tagInput, setTagInput] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    try {
      await addProject(form);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      await updateProject(editingProject.id, editingProject);
      setEditingProject(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      tagline: '',
      description: '',
      status: 'Live Demo',
      liveUrl: '',
      githubUrl: '',
      isUpcoming: false,
      tags: ['React', 'AI'],
      keyFeatures: [],
      techStack: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your featured projects, live demos, PocketSmart AI assistant link, and lab experiments.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f18] border border-violet-500/30 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Add Portfolio Project</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="PocketSmart AI"
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Live Demo">Live Demo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="AI-Powered Budget & Smart Recommendation Assistant"
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Comprehensive description of the application features and impact..."
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL (Demo / App)</label>
                  <input
                    type="url"
                    value={form.liveUrl || ''}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://fintracker-expenseve-tracker.lovable.app/dashboard"
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={form.githubUrl || ''}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isUpcoming"
                  checked={form.isUpcoming || false}
                  onChange={(e) => setForm({ ...form, isUpcoming: e.target.checked })}
                  className="w-4 h-4 accent-violet-600 rounded"
                />
                <label htmlFor="isUpcoming" className="text-xs text-slate-300">
                  Mark as "In The Lab / Upcoming" section
                </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl relative group hover:border-violet-500/30 transition-all flex flex-col md:flex-row items-start justify-between gap-4"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-violet-500/10 rounded-xl text-violet-400">
                  <FolderGit2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {project.title}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        project.status === 'Live Demo'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {project.status}
                    </span>
                  </h3>
                  <p className="text-xs text-violet-400 font-medium">{project.tagline}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{project.description}</p>

              {project.liveUrl && (
                <div className="pt-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo URL: {project.liveUrl}
                  </a>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags?.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#161622] text-slate-400 border border-slate-800 text-[10px] rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEditingProject(project)}
                className="p-2 text-slate-400 hover:text-white bg-[#141422] rounded-xl hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1 text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(project.id)}
                className="p-2 text-slate-400 hover:text-red-400 bg-[#141422] rounded-xl hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>

            {/* Confirm Delete Overlay */}
            {deleteConfirmId === project.id && (
              <div className="absolute inset-0 bg-[#0f0f18]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center z-10 border border-red-500/30">
                <p className="text-xs font-semibold text-white">Delete project "{project.title}"?</p>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">
                  This will remove the project from the public website showcase.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f18] border border-violet-500/30 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Edit Portfolio Project</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Live Demo">Live Demo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
