import React, { useState } from 'react';
import {
  Compass, LayoutDashboard, Package, FileText, Inbox,
  FileCheck, History, LogOut, ExternalLink, Menu, X, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = ({ activeTab, onTabChange, onExitToSite, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin, isEditor, isConsultant } = useAuth();

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, visible: true },
    { id: 'packages', label: 'Package Management CMS', icon: Package, visible: isEditor() },
    { id: 'blogs', label: 'Blog & Editorial CMS', icon: FileText, visible: isEditor() },
    { id: 'enquiries', label: 'Enquiry CRM & AI Hub', icon: Inbox, visible: isConsultant() },
    { id: 'quotations', label: 'Quotation Studio (PDF)', icon: FileCheck, visible: isConsultant() },
    { id: 'logs', label: 'Activity Audit Trail', icon: History, visible: isAdmin() },
  ];

  return (
    <div className="min-h-screen bg-sand-50 flex">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-forest-900 text-ivory border-r border-forest-800 shrink-0">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-forest-800 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-editorial text-lg font-bold tracking-tight text-ivory">
              KERALA LUXURY
            </span>
            <span className="block text-[9px] tracking-[0.25em] uppercase font-semibold text-gold-400">
              Operations Studio
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.filter(m => m.visible).map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all text-left ${
                  active
                    ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                    : 'text-sand-200 hover:bg-forest-850 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-forest-950' : 'text-gold-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-forest-800 space-y-3 bg-forest-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 border border-forest-700">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-ivory truncate">{user?.fullName || 'Staff User'}</p>
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-gold-400 bg-forest-800 px-2 py-0.5 rounded">
                {user?.roles?.[0]?.replace('ROLE_', '') || 'STAFF'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={onExitToSite}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-[11px] font-medium bg-forest-800 text-sand-200 hover:bg-forest-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 rounded-lg bg-red-900/30 text-red-300 hover:bg-red-900/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-sand-300 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-charcoal-700 p-1.5 rounded-lg hover:bg-sand-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-forest-900 uppercase tracking-wider">
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onExitToSite}
              className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-forest-800 hover:text-gold-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Public Website</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-charcoal-900/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-forest-900 text-ivory flex flex-col p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-forest-800">
              <span className="font-editorial text-lg font-bold">KERALA LUXURY</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 space-y-2">
              {menuItems.filter(m => m.visible).map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    activeTab === item.id ? 'bg-gold-500 text-forest-950 font-bold' : 'text-sand-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button onClick={logout} className="text-left text-xs text-red-300 py-2">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
