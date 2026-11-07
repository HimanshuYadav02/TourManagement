import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export const BlogEditorModal = ({ isOpen, onClose, blogToEdit, packages, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    featuredImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    categoryId: 1,
    status: 'PUBLISHED',
    seoTitle: '',
    metaDescription: '',
    tags: 'Houseboat, Alleppey, Luxury',
    relatedPackageId: packages[0]?.id || 1,
    readTimeMinutes: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title || '',
        slug: blogToEdit.slug || '',
        summary: blogToEdit.summary || '',
        content: blogToEdit.content || '',
        featuredImageUrl: blogToEdit.featuredImageUrl || '',
        categoryId: blogToEdit.category?.id || 1,
        status: blogToEdit.status || 'DRAFT',
        seoTitle: blogToEdit.seoTitle || '',
        metaDescription: blogToEdit.metaDescription || '',
        tags: blogToEdit.tags || '',
        relatedPackageId: blogToEdit.relatedPackage?.id || packages[0]?.id || 1,
        readTimeMinutes: blogToEdit.readTimeMinutes || 5,
      });
    }
  }, [blogToEdit, packages]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSaveSuccess(formData, blogToEdit?.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-sand-300 space-y-6 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-sand-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">Editorial Studio</span>
            <h2 className="font-editorial text-2xl font-bold text-forest-900">
              {blogToEdit ? `Edit Article: ${blogToEdit.title}` : 'Write New Travel Story'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-sand-200 text-charcoal-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                placeholder="e.g. Navigating the Silent Waters of Alleppey"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                placeholder="Auto-generated if blank"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Summary / Lead Paragraph</label>
            <textarea
              rows="2"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Featured Photography URL</label>
            <input
              type="text"
              value={formData.featuredImageUrl}
              onChange={(e) => setFormData({ ...formData, featuredImageUrl: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Article Content (Markdown Supported) *</label>
            <textarea
              rows="8"
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 leading-relaxed font-mono"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                placeholder="Houseboat, Munnar, Luxury"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Linked Tour Package</label>
              <select
                value={formData.relatedPackageId}
                onChange={(e) => setFormData({ ...formData, relatedPackageId: parseInt(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
              >
                {packages.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-charcoal-500 hover:text-charcoal-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-forest-800 hover:bg-forest-900 text-ivory px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Save & Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
