import React from 'react';
import { Clock, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const PackageCard = ({ pkg, onSelect, onEnquire }) => {
  const primaryImg = pkg.images?.find(i => i.primary)?.imageUrl || pkg.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';

  const peakPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson;
  const monsoonPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'MONSOON')?.pricePerPerson;
  const offSeasonPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'OFF_SEASON')?.pricePerPerson;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-sand-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
        <img
          src={primaryImg}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-forest-900/90 text-ivory text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm border border-forest-700/60 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </span>
          {pkg.featured && (
            <span className="bg-gold-500/95 text-forest-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Signature</span>
            </span>
          )}
        </div>

        {/* Destination Location Tag */}
        {pkg.destination && (
          <div className="absolute bottom-3 left-3 text-ivory text-xs font-medium flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span className="drop-shadow-sm">{pkg.destination.name}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3
            onClick={() => onSelect(pkg)}
            className="font-editorial text-xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {pkg.title}
          </h3>

          <p className="text-xs text-charcoal-500 line-clamp-2 leading-relaxed">
            {pkg.subtitle || pkg.overview}
          </p>
        </div>

        {/* Seasonal Pricing Breakdown */}
        <div className="bg-sand-50 p-3 rounded-xl border border-sand-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-charcoal-500">Peak Season (Oct - Mar):</span>
            <span className="font-semibold text-forest-900">
              {peakPrice ? `₹${peakPrice.toLocaleString()}` : 'On Request'}
              <span className="text-[10px] text-charcoal-500 font-normal"> / person</span>
            </span>
          </div>

          {monsoonPrice && (
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-sand-200/60">
              <span className="text-charcoal-500">Monsoon Season:</span>
              <span className="font-medium text-emerald-800">
                ₹{monsoonPrice.toLocaleString()}
                <span className="text-[10px] text-charcoal-500 font-normal"> / person</span>
              </span>
            </div>
          )}

          <div className="pt-1 flex items-center justify-between text-[10px] text-charcoal-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-gold-600" />
              <span>Chauffeur & 5-Star Stay Included</span>
            </span>
            <span>+ 5% GST</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => onSelect(pkg)}
            className="flex-1 bg-sand-100 hover:bg-sand-200 text-forest-900 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border border-sand-300 text-center"
          >
            Itinerary Details
          </button>
          
          <button
            onClick={() => onEnquire(pkg)}
            className="bg-forest-800 hover:bg-forest-900 text-ivory px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-1"
          >
            <span>Inquire</span>
            <ArrowRight className="w-3 h-3 text-gold-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
