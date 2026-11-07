import React, { useState } from 'react';
import { MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';
import { DestinationCard } from '../../components/DestinationCard';

export const DestinationsPage = ({ destinations, onSelectDestination, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const regions = ['ALL', 'Central Kerala', 'South Kerala', 'North Kerala', 'Tamil Nadu & Kerala Border'];

  const filtered = selectedRegion === 'ALL'
    ? destinations
    : destinations.filter(d => d.region === selectedRegion);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
          Geographic Enclaves
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-forest-900">
          Explore South India's Premier Destinations
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          From the cloud-piercing tea ranges of the Western Ghats to the mirror-smooth backwater labyrinths and ancient Dravidian temple kingdoms.
        </p>

        {/* Region Filter Tabs */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedRegion === reg
                  ? 'bg-forest-800 text-ivory shadow-md'
                  : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200 border border-sand-200'
              }`}
            >
              {reg === 'ALL' ? 'All Regions' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={onSelectDestination}
          />
        ))}
      </div>
    </div>
  );
};
