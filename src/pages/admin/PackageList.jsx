import React, { useState } from 'react';
import {
  Plus, Edit, Copy, Trash2, History, Eye, Sparkles,
  MapPin, Clock, DollarSign, CheckCircle2, AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';

export const PackageList = ({ packages, destinations, onEdit, onCreate, onDuplicate, onDelete, onOpenVersions, onPreview }) => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = packages.filter(p => {
    if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !(p.subtitle || '').toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-sand-300 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search packages by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50 w-64"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50"
          >
            <option value="ALL">All Statuses ({packages.length})</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <button
          onClick={onCreate}
          className="bg-forest-800 hover:bg-forest-900 text-ivory px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 shrink-0 border border-forest-700"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-sand-200">
              <tr>
                <th className="p-4">Package</th>
                <th className="p-4">Duration & Destination</th>
                <th className="p-4">Seasonal Pricing</th>
                <th className="p-4">Version</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 text-charcoal-800">
              {filtered.map((pkg) => {
                const primaryImg = pkg.images?.find(i => i.primary)?.imageUrl || pkg.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&q=80';
                const peak = pkg.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson;
                const monsoon = pkg.seasonalPrices?.find(s => s.seasonType === 'MONSOON')?.pricePerPerson;

                return (
                  <tr key={pkg.id} className="hover:bg-sand-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3 max-w-xs">
                        <img
                          src={primaryImg}
                          alt={pkg.title}
                          className="w-14 h-10 object-cover rounded-lg shrink-0 border border-sand-200"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-forest-900 text-xs truncate">{pkg.title}</p>
                          <p className="text-[10px] text-charcoal-400 truncate">{pkg.subtitle || pkg.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-charcoal-700">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                        <span className="block text-[10px] text-charcoal-400">{pkg.destination?.name || 'Unassigned'}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5 text-[11px]">
                        <div>
                          <span className="text-charcoal-400">Peak: </span>
                          <span className="font-bold text-forest-900">{peak ? `₹${peak.toLocaleString()}` : 'N/A'}</span>
                        </div>
                        {monsoon && (
                          <div>
                            <span className="text-charcoal-400">Monsoon: </span>
                            <span className="font-medium text-emerald-800">₹{monsoon.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-4 font-mono text-xs">
                      v{pkg.currentVersion || 1}
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        pkg.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' :
                        pkg.status === 'DRAFT' ? 'bg-amber-100 text-amber-800' : 'bg-sand-200 text-charcoal-600'
                      }`}>
                        {pkg.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => onPreview(pkg)}
                          title="Preview Package"
                          className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEdit(pkg)}
                          title="Edit Package"
                          className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDuplicate(pkg)}
                          title="Duplicate Package"
                          className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenVersions(pkg)}
                          title="Version History & Rollback"
                          className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(pkg.id)}
                          title="Delete Package"
                          className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
