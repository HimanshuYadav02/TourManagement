import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Tag, Clock } from 'lucide-react';

export const BlogList = ({ blogs, onCreate, onEdit, onDelete, onPreview }) => {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = blogs.filter(b => {
    if (filterStatus !== 'ALL' && b.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-sand-300 shadow-sm">
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50"
          >
            <option value="ALL">All Editorial Posts ({blogs.length})</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
          </select>
        </div>

        <button
          onClick={onCreate}
          className="bg-forest-800 hover:bg-forest-900 text-ivory px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 shrink-0 border border-forest-700"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-sand-200">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category & Tags</th>
                <th className="p-4">Read Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 text-charcoal-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-sand-50/70 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3 max-w-sm">
                      <img
                        src={b.featuredImageUrl}
                        alt={b.title}
                        className="w-14 h-10 object-cover rounded-lg shrink-0 border border-sand-200"
                      />
                      <div className="overflow-hidden">
                        <p className="font-bold text-forest-900 text-xs truncate">{b.title}</p>
                        <p className="text-[10px] text-charcoal-400 truncate">{b.summary}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-charcoal-700">{b.category?.name || 'General'}</span>
                      <span className="block text-[10px] text-charcoal-400 truncate max-w-xs">{b.tags || 'None'}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-charcoal-600 font-mono">{b.readTimeMinutes} min</span>
                  </td>

                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      b.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex items-center space-x-2">
                      <button
                        onClick={() => onPreview(b)}
                        title="Preview Article"
                        className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onEdit(b)}
                        title="Edit Article"
                        className="p-1.5 rounded-lg bg-sand-100 text-forest-800 hover:bg-forest-800 hover:text-ivory transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(b.id)}
                        title="Delete Article"
                        className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
