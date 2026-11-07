import React from 'react';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export const DestinationCard = ({ destination, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(destination)}
      className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-sand-200 cursor-pointer shadow-luxury hover:shadow-luxury-hover transition-all duration-500"
    >
      {/* Background Image */}
      <img
        src={destination.heroImageUrl}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-900/30 to-transparent" />
      <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors" />

      {/* Region Tag */}
      <div className="absolute top-4 left-4">
        <span className="bg-white/20 backdrop-blur-md text-ivory text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
          {destination.region || 'Kerala'}
        </span>
      </div>

      {/* Floating Action Circle */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-ivory group-hover:bg-gold-500 group-hover:text-forest-900 transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Bottom Text Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-ivory">
        <h3 className="font-editorial text-2xl font-bold leading-tight group-hover:text-gold-300 transition-colors">
          {destination.name}
        </h3>

        <p className="text-xs text-sand-200 line-clamp-2 leading-relaxed opacity-90">
          {destination.tagline || destination.description}
        </p>

        {destination.bestTimeToVisit && (
          <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-gold-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Best Season: {destination.bestTimeToVisit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
