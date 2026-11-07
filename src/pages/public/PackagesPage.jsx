import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Clock, DollarSign, RotateCcw } from 'lucide-react';
import { PackageCard } from '../../components/PackageCard';

export const PackagesPage = ({ packages, destinations, onSelectPackage, onOpenEnquiry }) => {
  const [search, setSearch] = useState('');
  const [selectedDest, setSelectedDest] = useState('ALL');
  const [durationFilter, setDurationFilter] = useState('ALL');
  const [budgetFilter, setBudgetFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('FEATURED');

  const publishedPackages = useMemo(() => {
    return packages.filter(p => p.status === 'PUBLISHED');
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return publishedPackages.filter(p => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesOverview = (p.overview || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesOverview) return false;
      }

      // Destination
      if (selectedDest !== 'ALL' && p.destination?.id !== parseInt(selectedDest)) {
        return false;
      }

      // Duration
      if (durationFilter === 'SHORT' && p.durationDays > 4) return false;
      if (durationFilter === 'MEDIUM' && (p.durationDays < 5 || p.durationDays > 6)) return false;
      if (durationFilter === 'LONG' && p.durationDays < 7) return false;

      // Budget (Peak Season basis)
      const peakPrice = p.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson || 0;
      if (budgetFilter === 'UNDER_20K' && peakPrice > 20000) return false;
      if (budgetFilter === '20K_35K' && (peakPrice < 20000 || peakPrice > 35000)) return false;
      if (budgetFilter === 'ABOVE_35K' && peakPrice < 35000) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson || 0;
      const priceB = b.seasonalPrices?.find(s => s.seasonType === 'PEAK')?.pricePerPerson || 0;

      if (sortBy === 'PRICE_ASC') return priceA - priceB;
      if (sortBy === 'PRICE_DESC') return priceB - priceA;
      if (sortBy === 'DURATION_ASC') return a.durationDays - b.durationDays;
      if (sortBy === 'DURATION_DESC') return b.durationDays - a.durationDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [publishedPackages, search, selectedDest, durationFilter, budgetFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedDest('ALL');
    setDurationFilter('ALL');
    setBudgetFilter('ALL');
    setSortBy('FEATURED');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
          The Bespoke Catalog
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-forest-900">
          Curated Kerala Holiday Packages
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          Explore private itineraries spanning misty tea hilltops, tranquil backwaters, spice plantations, and sacred temple corridors.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-luxury space-y-4">
        
        {/* Search & Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by package name or key highlights (e.g. Munnar, Houseboat)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50"
            />
          </div>

          <div>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50 text-charcoal-700 font-medium"
            >
              <option value="ALL">All Destinations</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50 text-charcoal-700 font-medium"
            >
              <option value="FEATURED">Sort: Signature Featured</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="DURATION_ASC">Duration: Short to Long</option>
              <option value="DURATION_DESC">Duration: Long to Short</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sand-200 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-charcoal-400 font-semibold mr-1 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </span>

            {/* Duration Pills */}
            <button
              onClick={() => setDurationFilter(durationFilter === 'SHORT' ? 'ALL' : 'SHORT')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                durationFilter === 'SHORT' ? 'bg-forest-800 text-ivory border-forest-800 font-semibold' : 'bg-sand-100 text-charcoal-700 border-sand-200 hover:bg-sand-200'
              }`}
            >
              Short (1-4 Days)
            </button>
            <button
              onClick={() => setDurationFilter(durationFilter === 'MEDIUM' ? 'ALL' : 'MEDIUM')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                durationFilter === 'MEDIUM' ? 'bg-forest-800 text-ivory border-forest-800 font-semibold' : 'bg-sand-100 text-charcoal-700 border-sand-200 hover:bg-sand-200'
              }`}
            >
              Classic (5-6 Days)
            </button>
            <button
              onClick={() => setDurationFilter(durationFilter === 'LONG' ? 'ALL' : 'LONG')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                durationFilter === 'LONG' ? 'bg-forest-800 text-ivory border-forest-800 font-semibold' : 'bg-sand-100 text-charcoal-700 border-sand-200 hover:bg-sand-200'
              }`}
            >
              Grand (7+ Days)
            </button>

            {/* Budget Pills */}
            <button
              onClick={() => setBudgetFilter(budgetFilter === 'UNDER_20K' ? 'ALL' : 'UNDER_20K')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                budgetFilter === 'UNDER_20K' ? 'bg-forest-800 text-ivory border-forest-800 font-semibold' : 'bg-sand-100 text-charcoal-700 border-sand-200 hover:bg-sand-200'
              }`}
            >
              Under ₹20,000
            </button>
            <button
              onClick={() => setBudgetFilter(budgetFilter === '20K_35K' ? 'ALL' : '20K_35K')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                budgetFilter === '20K_35K' ? 'bg-forest-800 text-ivory border-forest-800 font-semibold' : 'bg-sand-100 text-charcoal-700 border-sand-200 hover:bg-sand-200'
              }`}
            >
              ₹20,000 - ₹35,000
            </button>
          </div>

          {(search || selectedDest !== 'ALL' || durationFilter !== 'ALL' || budgetFilter !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="text-gold-600 hover:text-gold-700 font-semibold inline-flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Package Count indicator */}
      <div className="flex items-center justify-between text-xs text-charcoal-500 px-1">
        <span>Showing <strong className="text-forest-900">{filteredPackages.length}</strong> verified luxury packages</span>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectPackage}
              onEnquire={onOpenEnquiry}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-sand-200 space-y-4 max-w-md mx-auto">
          <p className="font-editorial text-xl font-bold text-forest-900">No Packages Match Your Filter</p>
          <p className="text-xs text-charcoal-500">
            Try adjusting your search criteria or reset filters to browse our complete collection.
          </p>
          <button
            onClick={resetFilters}
            className="bg-forest-800 text-ivory px-5 py-2 rounded-full text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
