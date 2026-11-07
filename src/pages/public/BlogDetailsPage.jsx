import React from 'react';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Compass } from 'lucide-react';
import { PackageCard } from '../../components/PackageCard';

export const BlogDetailsPage = ({ blog, allPackages, onBack, onSelectPackage, onOpenEnquiry }) => {
  if (!blog) return null;

  const relatedPackage = blog.relatedPackage || (allPackages.length > 0 ? allPackages[0] : null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Stories</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-xs text-charcoal-500">
          <span className="uppercase font-bold tracking-widest text-gold-600 bg-gold-100/70 px-3 py-1 rounded-full">
            {blog.category?.name || 'Kerala Story'}
          </span>
          <span>&bull;</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTimeMinutes} min read</span>
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-forest-900 leading-tight">
          {blog.title}
        </h1>

        <p className="text-sm sm:text-base text-charcoal-600 italic font-light leading-relaxed">
          {blog.summary}
        </p>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-luxury">
        <img
          src={blog.featuredImageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Markdown/HTML Body */}
      <div className="prose max-w-none text-charcoal-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-light">
        {blog.content}
      </div>

      {/* Tags */}
      {blog.tags && (
        <div className="pt-6 border-t border-sand-300 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-charcoal-400">Filed under:</span>
          {blog.tags.split(',').map((t, i) => (
            <span key={i} className="text-xs bg-sand-100 text-forest-900 px-3 py-1 rounded-full border border-sand-200">
              #{t.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Related Tour Package Feature */}
      {relatedPackage && (
        <div className="pt-10 border-t border-sand-300 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-600">
            <Compass className="w-4 h-4" />
            <span>Experience This Story In Person</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-forest-900">
            Recommended Journey
          </h3>
          <div className="max-w-md">
            <PackageCard
              pkg={relatedPackage}
              onSelect={onSelectPackage}
              onEnquire={onOpenEnquiry}
            />
          </div>
        </div>
      )}
    </div>
  );
};
