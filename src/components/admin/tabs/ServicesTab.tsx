import React, { useState } from 'react';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { ServiceItem } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, X, Wrench, Clock, CheckCircle2 } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { services, addService, updateService, deleteService } = usePortfolioData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    description: '',
    icon: 'Store',
    timeline: '1 Week',
    highlights: ['Responsive layout', 'SEO optimized'],
  });

  const [highlightInput, setHighlightInput] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    try {
      await addService(form);
      setShowAddModal(false);
      setForm({
        title: '',
        description: '',
        icon: 'Store',
        timeline: '1 Week',
        highlights: ['Responsive layout', 'SEO optimized'],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      await updateService(editingService.id, editingService);
      setEditingService(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Services Offered</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, update or remove services provided to clients (Small Business, Portfolios, Landing Pages, UI Design).
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-violet-600/20 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f18] border border-violet-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Add New Service</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Small Business Website Development"
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Timeline / Delivery</label>
                <input
                  type="text"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  placeholder="1 - 2 Weeks"
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
                  placeholder="Detail what this service provides..."
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium shadow-lg shadow-violet-600/20"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-5 bg-[#0f0f18] border border-slate-800/80 rounded-2xl relative group hover:border-violet-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-violet-500/10 rounded-xl text-violet-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{service.title}</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" /> Timeline: {service.timeline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(service.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{service.description}</p>

              {service.highlights && service.highlights.length > 0 && (
                <ul className="space-y-1 pt-2 border-t border-slate-800/80">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-violet-400 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Confirm Delete Overlay */}
            {deleteConfirmId === service.id && (
              <div className="absolute inset-0 bg-[#0f0f18]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center z-10 border border-red-500/30">
                <p className="text-xs font-semibold text-white">Delete "{service.title}"?</p>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">This action cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f18] border border-violet-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Edit Service</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Timeline</label>
                <input
                  type="text"
                  value={editingService.timeline}
                  onChange={(e) => setEditingService({ ...editingService, timeline: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-[#161622] border border-slate-700/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
