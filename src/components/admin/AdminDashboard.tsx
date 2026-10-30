import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { OverviewTab } from './tabs/OverviewTab';
import { HeroTab } from './tabs/HeroTab';
import { AboutTab } from './tabs/AboutTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ContactTab } from './tabs/ContactTab';
import { SettingsTab } from './tabs/SettingsTab';
import {
  LayoutDashboard,
  User,
  Info,
  Sparkles,
  FolderGit2,
  Wrench,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  onReturnToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToSite }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard },
    { id: 'hero', label: 'Home / Hero', icon: User },
    { id: 'about', label: 'About & Bio', icon: Info },
    { id: 'skills', label: 'Skills & Tech', icon: Sparkles },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2 },
    { id: 'services', label: 'Services Offered', icon: Wrench },
    { id: 'contact', label: 'Contact & Messages', icon: Mail },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Nav Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0d0d15] border-b border-slate-800/80 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">
            WHITEe<span className="text-violet-400">.CODES</span> Admin
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#141422]"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0c0c14] border-r border-slate-800/80 p-5 flex flex-col justify-between z-40 transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-white text-sm tracking-tight">
                  WHITEe<span className="text-violet-400">.CODES</span>
                </h1>
                <p className="text-[10px] text-slate-400">Admin Control Center</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/15 border border-violet-500/30 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141422]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-violet-400" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Session & Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 bg-[#12121f] rounded-xl border border-slate-800/60 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-300 font-bold text-xs flex items-center justify-center shrink-0">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user?.email}</p>
              <p className="text-[10px] text-emerald-400 font-medium">Administrator</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onReturnToSite}
              className="px-3 py-2 bg-[#141422] hover:bg-[#1c1c30] text-slate-300 hover:text-white rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-1 border border-slate-800"
            >
              <ExternalLink className="w-3 h-3 text-cyan-400" /> Public Site
            </button>
            <button
              onClick={() => logout()}
              className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-1 border border-red-500/20"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full min-h-screen">
        {activeTab === 'overview' && <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />}
        {activeTab === 'hero' && <HeroTab />}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'contact' && <ContactTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
};
