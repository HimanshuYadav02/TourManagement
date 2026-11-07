import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';

export const PackageEditorModal = ({ isOpen, onClose, packageToEdit, destinations, onSaveSuccess }) => {
  const [tab, setTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    overview: '',
    destinationId: destinations[0]?.id || 1,
    durationDays: 6,
    durationNights: 5,
    theme: 'Luxury Nature & Backwaters',
    status: 'PUBLISHED',
    featured: true,
    hotelInformation: '',
    inclusions: '',
    exclusions: '',
    termsAndConditions: '',
    changeSummary: 'Routine updates',
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', caption: 'Signature Cover', primary: true, displayOrder: 1 }
    ],
    seasonalPrices: [
      { seasonType: 'PEAK', pricePerPerson: 32500, childPricePerPerson: 14500, notes: 'October to March' },
      { seasonType: 'MONSOON', pricePerPerson: 24900, childPricePerPerson: 11000, notes: 'June to September' },
      { seasonType: 'OFF_SEASON', pricePerPerson: 21500, childPricePerPerson: 9500, notes: 'April to May' },
    ],
    itineraries: [
      { dayNumber: 1, title: 'Arrival & Welcome', description: 'Private chauffeur transfer to resort.', stayLocation: 'Munnar', mealsIncluded: 'Dinner', activities: 'Welcome reception' }
    ]
  });

  useEffect(() => {
    if (packageToEdit) {
      setFormData({
        title: packageToEdit.title || '',
        slug: packageToEdit.slug || '',
        subtitle: packageToEdit.subtitle || '',
        overview: packageToEdit.overview || '',
        destinationId: packageToEdit.destination?.id || destinations[0]?.id || 1,
        durationDays: packageToEdit.durationDays || 6,
        durationNights: packageToEdit.durationNights || 5,
        theme: packageToEdit.theme || '',
        status: packageToEdit.status || 'DRAFT',
        featured: !!packageToEdit.featured,
        hotelInformation: packageToEdit.hotelInformation || '',
        inclusions: packageToEdit.inclusions || '',
        exclusions: packageToEdit.exclusions || '',
        termsAndConditions: packageToEdit.termsAndConditions || '',
        changeSummary: 'Updated package specs',
        images: packageToEdit.images?.length > 0 ? packageToEdit.images : [
          { imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', caption: 'Cover', primary: true, displayOrder: 1 }
        ],
        seasonalPrices: packageToEdit.seasonalPrices?.length > 0 ? packageToEdit.seasonalPrices : [
          { seasonType: 'PEAK', pricePerPerson: 32500, childPricePerPerson: 14500, notes: 'October to March' },
          { seasonType: 'MONSOON', pricePerPerson: 24900, childPricePerPerson: 11000, notes: 'June to September' },
          { seasonType: 'OFF_SEASON', pricePerPerson: 21500, childPricePerPerson: 9500, notes: 'April to May' },
        ],
        itineraries: packageToEdit.itineraries?.length > 0 ? packageToEdit.itineraries : [
          { dayNumber: 1, title: 'Day 1', description: 'Itinerary details', stayLocation: 'Kochi', mealsIncluded: 'Breakfast', activities: 'Sightseeing' }
        ]
      });
    }
  }, [packageToEdit, destinations]);

  if (!isOpen) return null;

  const handleItineraryChange = (index, field, value) => {
    const updated = [...formData.itineraries];
    updated[index][field] = value;
    setFormData({ ...formData, itineraries: updated });
  };

  const addItineraryDay = () => {
    const nextDay = formData.itineraries.length + 1;
    setFormData({
      ...formData,
      itineraries: [
        ...formData.itineraries,
        { dayNumber: nextDay, title: `Day ${nextDay}`, description: '', stayLocation: '', mealsIncluded: 'Breakfast', activities: '' }
      ]
    });
  };

  const removeItineraryDay = (index) => {
    const updated = formData.itineraries.filter((_, i) => i !== index);
    // re-index
    updated.forEach((d, idx) => d.dayNumber = idx + 1);
    setFormData({ ...formData, itineraries: updated });
  };

  const handleSeasonalPriceChange = (seasonType, field, value) => {
    const updated = formData.seasonalPrices.map(sp => {
      if (sp.seasonType === seasonType) {
        return { ...sp, [field]: value };
      }
      return sp;
    });
    setFormData({ ...formData, seasonalPrices: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSaveSuccess(formData, packageToEdit?.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-sand-300 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sand-200 flex items-center justify-between shrink-0 bg-sand-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">Package Authoring Studio</span>
            <h2 className="font-editorial text-2xl font-bold text-forest-900">
              {packageToEdit ? `Edit: ${packageToEdit.title}` : 'Create New Luxury Tour Package'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-sand-200 text-charcoal-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-sand-200 flex space-x-6 text-xs font-semibold uppercase tracking-wider shrink-0 bg-white">
          {['basic', 'pricing', 'itinerary', 'hotels', 'inclusions'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3.5 border-b-2 transition-all ${
                tab === t ? 'border-forest-800 text-forest-800 font-bold' : 'border-transparent text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              {t === 'basic' ? 'Basic Info' :
               t === 'pricing' ? 'Seasonal Pricing' :
               t === 'itinerary' ? `Day-by-Day Itinerary (${formData.itineraries.length})` :
               t === 'hotels' ? 'Hotels & Stays' : 'Inclusions / Exclusions'}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Tab 1: Basic Info */}
          {tab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                    placeholder="e.g. Munnar, Thekkady and Alleppey Houseboat"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                    placeholder="Auto-generated if left blank"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Subtitle / Highlight Tagline</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                  placeholder="Misty Hills, Wildlife Sanctuary & Private Luxury Houseboat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Primary Destination</label>
                  <select
                    value={formData.destinationId}
                    onChange={(e) => setFormData({ ...formData, destinationId: parseInt(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Duration (Days / Nights)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="1"
                      value={formData.durationDays}
                      onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) || 1 })}
                      className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                      placeholder="Days"
                    />
                    <input
                      type="number"
                      min="0"
                      value={formData.durationNights}
                      onChange={(e) => setFormData({ ...formData, durationNights: parseInt(e.target.value) || 0 })}
                      className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                      placeholder="Nights"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Overview Description</label>
                <textarea
                  rows="3"
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featuredPkg"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-forest-800"
                />
                <label htmlFor="featuredPkg" className="font-semibold text-charcoal-700">
                  Feature as Signature Journey on Homepage
                </label>
              </div>
            </div>
          )}

          {/* Tab 2: Seasonal Pricing */}
          {tab === 'pricing' && (
            <div className="space-y-4">
              <p className="text-xs text-charcoal-500">
                Configure verified per-person pricing across the three seasons. Backend price calculations use these verified database figures.
              </p>

              {['PEAK', 'MONSOON', 'OFF_SEASON'].map((season) => {
                const sp = formData.seasonalPrices.find(s => s.seasonType === season) || {};
                const label = season === 'PEAK' ? 'Peak Season (Oct - Mar)' :
                              season === 'MONSOON' ? 'Monsoon Season (Jun - Sep)' : 'Off-Season (Apr - May)';
                return (
                  <div key={season} className="p-4 rounded-xl border border-sand-300 bg-sand-50/50 space-y-3">
                    <span className="font-bold text-forest-900 uppercase tracking-wider text-xs">{label}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Adult Rate (₹ / person) *</label>
                        <input
                          type="number"
                          value={sp.pricePerPerson || ''}
                          onChange={(e) => handleSeasonalPriceChange(season, 'pricePerPerson', parseFloat(e.target.value) || 0)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Child Rate (₹ / person)</label>
                        <input
                          type="number"
                          value={sp.childPricePerPerson || ''}
                          onChange={(e) => handleSeasonalPriceChange(season, 'childPricePerPerson', parseFloat(e.target.value) || 0)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Season Validity Notes</label>
                        <input
                          type="text"
                          value={sp.notes || ''}
                          onChange={(e) => handleSeasonalPriceChange(season, 'notes', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                          placeholder="e.g. Pristine weather"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Itinerary */}
          {tab === 'itinerary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-700">Day-Wise Schedule</span>
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="bg-sand-100 hover:bg-forest-800 hover:text-ivory text-forest-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 border border-sand-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Next Day</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.itineraries.map((itin, index) => (
                  <div key={index} className="p-4 rounded-xl border border-sand-300 bg-sand-50/50 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-forest-900 text-xs">Day {itin.dayNumber}</span>
                      {formData.itineraries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-0.5">Day Title *</label>
                        <input
                          type="text"
                          required
                          value={itin.title}
                          onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                          placeholder="e.g. Arrival in Kochi & Ascent to Munnar"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-0.5">Overnight Stay</label>
                        <input
                          type="text"
                          value={itin.stayLocation || ''}
                          onChange={(e) => handleItineraryChange(index, 'stayLocation', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                          placeholder="Munnar / Houseboat"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal-600 mb-0.5">Description</label>
                      <textarea
                        rows="2"
                        value={itin.description || ''}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-0.5">Meals Included</label>
                        <input
                          type="text"
                          value={itin.mealsIncluded || ''}
                          onChange={(e) => handleItineraryChange(index, 'mealsIncluded', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                          placeholder="Breakfast, Dinner"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal-600 mb-0.5">Key Activities</label>
                        <input
                          type="text"
                          value={itin.activities || ''}
                          onChange={(e) => handleItineraryChange(index, 'activities', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-sand-300 bg-white"
                          placeholder="Waterfall visit, boat cruise"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Hotels */}
          {tab === 'hotels' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Hotel & Resort Information</label>
                <textarea
                  rows="5"
                  value={formData.hotelInformation}
                  onChange={(e) => setFormData({ ...formData, hotelInformation: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                  placeholder="Munnar: Fragrant Nature / Amber Dale&#10;Alleppey: Luxury 1-Bedroom Private Houseboat"
                ></textarea>
              </div>
            </div>
          )}

          {/* Tab 5: Inclusions / Exclusions */}
          {tab === 'inclusions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Inclusions</label>
                  <textarea
                    rows="6"
                    value={formData.inclusions}
                    onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Exclusions</label>
                  <textarea
                    rows="6"
                    value={formData.exclusions}
                    onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Audit Change Summary (for Version History)</label>
                <input
                  type="text"
                  value={formData.changeSummary}
                  onChange={(e) => setFormData({ ...formData, changeSummary: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
                  placeholder="e.g. Updated peak season prices and added Kumarakom resort"
                />
              </div>
            </div>
          )}

          {/* Footer Submit */}
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
              {loading ? 'Saving Package...' : 'Save & Publish Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
