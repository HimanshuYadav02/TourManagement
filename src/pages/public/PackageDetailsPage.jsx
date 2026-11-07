import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, Shield, Check, X, ArrowLeft, ArrowRight, Calendar, DollarSign, BedDouble, Utensils } from 'lucide-react';
import { PackageCard } from '../../components/PackageCard';

export const PackageDetailsPage = ({ pkg, allPackages, onBack, onOpenEnquiry, onSelectPackage }) => {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'hotels', 'pricing', 'inclusions'

  if (!pkg) return null;

  const primaryImg = pkg.images?.find(i => i.primary)?.imageUrl || pkg.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80';
  const additionalImages = pkg.images?.slice(1) || [];

  const peakPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson;
  const monsoonPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'MONSOON')?.pricePerPerson;
  const offSeasonPrice = pkg.seasonalPrices?.find(s => s.seasonType === 'OFF_SEASON')?.pricePerPerson;

  const relatedPackages = allPackages
    .filter(p => p.id !== pkg.id && p.status === 'PUBLISHED')
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Packages</span>
      </button>

      {/* Hero Header & Gallery Grid */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-forest-800 text-ivory text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {pkg.durationDays} Days / {pkg.durationNights} Nights
              </span>
              {pkg.destination && (
                <span className="bg-sand-200 text-forest-900 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>{pkg.destination.name}</span>
                </span>
              )}
              {pkg.theme && (
                <span className="bg-gold-100 text-gold-800 border border-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
                  {pkg.theme}
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-forest-900 leading-tight">
              {pkg.title}
            </h1>

            {pkg.subtitle && (
              <p className="text-sm sm:text-base text-charcoal-500 font-light leading-relaxed">
                {pkg.subtitle}
              </p>
            )}
          </div>

          {/* Quick Rate & CTA card */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-luxury shrink-0 lg:w-80 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider">Starting Rate (Peak Season)</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-editorial text-3xl font-bold text-forest-900">
                  {peakPrice ? `₹${peakPrice.toLocaleString()}` : 'Custom Quote'}
                </span>
                <span className="text-xs text-charcoal-500">/ adult</span>
              </div>
              <p className="text-[11px] text-charcoal-400">+ 5% GST &bull; Private Chauffeur & Stays</p>
            </div>

            <button
              onClick={() => onOpenEnquiry(pkg)}
              className="w-full bg-forest-800 hover:bg-forest-900 text-ivory py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Inquire For This Package</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden aspect-[16/8] max-h-[500px]">
          <div className="md:col-span-2 h-full">
            <img
              src={primaryImg}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {additionalImages.length > 0 ? (
              additionalImages.slice(0, 2).map((img, i) => (
                <div key={i} className="flex-1 overflow-hidden">
                  <img src={img.imageUrl} alt={img.caption || pkg.title} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="flex-1 overflow-hidden bg-sand-200">
                <img
                  src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
                  alt="Kerala Landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Details Grid: Left Content (2 cols) & Right Floating Info (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-forest-900">Journey Overview</h2>
            <p className="text-sm text-charcoal-700 leading-relaxed font-normal whitespace-pre-line">
              {pkg.overview}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-sand-300 flex space-x-6">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'itinerary' ? 'border-forest-800 text-forest-800' : 'border-transparent text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              Day-Wise Itinerary ({pkg.itineraries?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'hotels' ? 'border-forest-800 text-forest-800' : 'border-transparent text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              Accommodations
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'pricing' ? 'border-forest-800 text-forest-800' : 'border-transparent text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              Seasonal Pricing
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'inclusions' ? 'border-forest-800 text-forest-800' : 'border-transparent text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              Inclusions & Exclusions
            </button>
          </div>

          {/* Tab 1: Day-Wise Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {pkg.itineraries && pkg.itineraries.length > 0 ? (
                pkg.itineraries.map((it) => (
                  <div key={it.id || it.dayNumber} className="relative pl-8 pb-8 border-l border-sand-300 last:border-l-0 last:pb-0">
                    {/* Circle badge on timeline */}
                    <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-forest-800 text-ivory flex items-center justify-center text-xs font-bold font-mono">
                      {it.dayNumber}
                    </div>

                    <div className="space-y-2 bg-white p-5 rounded-xl border border-sand-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-editorial text-lg font-bold text-forest-900">
                          {it.title}
                        </h3>
                        {it.stayLocation && (
                          <span className="text-[11px] font-semibold text-gold-600 bg-gold-100/60 px-2.5 py-0.5 rounded-full self-start">
                            Overnight: {it.stayLocation}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-charcoal-600 leading-relaxed whitespace-pre-line">
                        {it.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-charcoal-500 border-t border-sand-100">
                        {it.mealsIncluded && (
                          <span className="flex items-center space-x-1">
                            <Utensils className="w-3.5 h-3.5 text-forest-700" />
                            <span>Meals: {it.mealsIncluded}</span>
                          </span>
                        )}
                        {it.activities && (
                          <span className="flex items-center space-x-1">
                            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                            <span>Key highlights: {it.activities}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-charcoal-500">Day-by-day itinerary will be customized to your flight timings.</p>
              )}
            </div>
          )}

          {/* Tab 2: Accommodations & Hotel Information */}
          {activeTab === 'hotels' && (
            <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-4">
              <h3 className="font-editorial text-xl font-bold text-forest-900">Handpicked Stays & Resorts</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed whitespace-pre-line">
                {pkg.hotelInformation || 'Heritage 5-star mountain villas, organic spice plantation retreats, and private luxury houseboats.'}
              </p>
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-sand-50 rounded-xl border border-sand-200 space-y-2">
                  <div className="flex items-center space-x-2 text-forest-800 font-semibold text-xs">
                    <BedDouble className="w-4 h-4 text-gold-600" />
                    <span>Private Luxury Houseboats</span>
                  </div>
                  <p className="text-[11px] text-charcoal-500 leading-relaxed">
                    Air-conditioned master suites with private sun deck, dining salon, and dedicated 3-member crew (captain, engine driver, personal chef).
                  </p>
                </div>
                <div className="p-4 bg-sand-50 rounded-xl border border-sand-200 space-y-2">
                  <div className="flex items-center space-x-2 text-forest-800 font-semibold text-xs">
                    <Shield className="w-4 h-4 text-gold-600" />
                    <span>5-Star Valley & Lake Resorts</span>
                  </div>
                  <p className="text-[11px] text-charcoal-500 leading-relaxed">
                    Signature luxury resorts such as Fragrant Nature Munnar, Cardamom County Thekkady, and Kumarakom Lake Resort.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Seasonal Pricing Breakdown */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-4">
                <h3 className="font-editorial text-xl font-bold text-forest-900">Seasonal Rate Breakdown (INR)</h3>
                <p className="text-xs text-charcoal-500">
                  All rates are per adult on twin-sharing basis with chauffeur-driven vehicle and daily gourmet breakfast.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-sand-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Season Tier</th>
                        <th className="p-3">Months</th>
                        <th className="p-3">Per Person (Adult)</th>
                        <th className="p-3">Child Rate (with bed)</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-200 text-charcoal-700">
                      <tr className="bg-amber-50/40">
                        <td className="p-3 font-semibold text-forest-900">Peak Season</td>
                        <td className="p-3">October &ndash; March</td>
                        <td className="p-3 font-bold text-forest-900">
                          {peakPrice ? `₹${peakPrice.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="p-3">
                          {pkg.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.childPricePerPerson ? `₹${pkg.seasonalPrices.find(s => s.seasonType === 'PEAK').childPricePerPerson.toLocaleString()}` : '₹14,500'}
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Available</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3 font-semibold text-forest-900">Monsoon Season</td>
                        <td className="p-3">June &ndash; September</td>
                        <td className="p-3 font-bold text-forest-900">
                          {monsoonPrice ? `₹${monsoonPrice.toLocaleString()}` : '₹24,900'}
                        </td>
                        <td className="p-3">
                          {pkg.seasonalPrices?.find(s => s.seasonType === 'MONSOON')?.childPricePerPerson ? `₹${pkg.seasonalPrices.find(s => s.seasonType === 'MONSOON').childPricePerPerson.toLocaleString()}` : '₹11,000'}
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">Lush & Rejuvenating</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3 font-semibold text-forest-900">Off-Season</td>
                        <td className="p-3">April &ndash; May</td>
                        <td className="p-3 font-bold text-forest-900">
                          {offSeasonPrice ? `₹${offSeasonPrice.toLocaleString()}` : '₹21,500'}
                        </td>
                        <td className="p-3">
                          {pkg.seasonalPrices?.find(s => s.seasonType === 'OFF_SEASON')?.childPricePerPerson ? `₹${pkg.seasonalPrices.find(s => s.seasonType === 'OFF_SEASON').childPricePerPerson.toLocaleString()}` : '₹9,500'}
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] bg-sand-200 text-charcoal-700 px-2 py-0.5 rounded-full font-medium">Summer Value</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-[11px] text-charcoal-500 space-y-1">
                  <p>&bull; 5% GST will be applied on the final total calculation.</p>
                  <p>&bull; Infant travellers below 5 years are hosted complimentary.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Inclusions & Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-forest-800 font-bold text-sm">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Package Inclusions</span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed whitespace-pre-line">
                  {pkg.inclusions || 'Private vehicle, 5-star accommodations, gourmet breakfast, sightseeing, boat tickets.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-red-800 font-bold text-sm">
                  <X className="w-5 h-5 text-red-500" />
                  <span>Package Exclusions</span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed whitespace-pre-line">
                  {pkg.exclusions || 'Airfare or train tickets, personal expenses, camera fees, 5% GST.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Quick Inquiry & Guarantee */}
        <div className="space-y-6">
          <div className="bg-sand-100/90 p-6 rounded-2xl border border-sand-300 space-y-4">
            <h3 className="font-editorial text-lg font-bold text-forest-900">
              Request Customized Itinerary
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Have specific travel dates or custom hotel choices? Our Fort Kochi concierges will create an official PDF quotation matching your preferences.
            </p>
            <button
              onClick={() => onOpenEnquiry(pkg)}
              className="w-full bg-forest-800 hover:bg-forest-900 text-ivory py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              Inquire With Our Concierge
            </button>
            <div className="pt-2 text-[11px] text-charcoal-500 space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                <span>Zero Price Hallucination Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                <span>Official PDF quotation within 4 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Packages Carousel */}
      {relatedPackages.length > 0 && (
        <div className="pt-12 border-t border-sand-300 space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-900">
            You May Also Enjoy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map(r => (
              <PackageCard
                key={r.id}
                pkg={r}
                onSelect={onSelectPackage}
                onEnquire={onOpenEnquiry}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
