import React, { useState } from 'react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

export const BlogsPage = ({ blogs, onSelectBlog }) => {
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'Houseboat', 'Alleppey', 'Munnar', 'Tea Gardens', 'Luxury'];

  const filtered = selectedTag === 'ALL'
    ? blogs
    : blogs.filter(b => (b.tags || '').toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
          The Kerala Dispatches
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-forest-900">
          Travel Stories, Field Guides & Lore
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          Insider essays written by resident naturalists, backwater skippers, and culinary historians from across Kerala.
        </p>

        {/* Tag Filters */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedTag === t
                  ? 'bg-forest-800 text-ivory shadow-sm'
                  : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200 border border-sand-200'
              }`}
            >
              {t === 'ALL' ? 'All Stories' : `#${t}`}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectBlog(b)}
            className="group bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="aspect-[16/10] overflow-hidden bg-sand-200">
                <img
                  src={b.featuredImageUrl}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 pt-2 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-charcoal-400">
                  <span className="uppercase font-bold tracking-wider text-gold-600">
                    {b.category?.name || 'Kerala Story'}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{b.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors leading-snug">
                  {b.title}
                </h3>

                <p className="text-xs text-charcoal-500 line-clamp-3 leading-relaxed">
                  {b.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-forest-800 group-hover:text-gold-600 transition-colors">
              <span>Read Full Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
