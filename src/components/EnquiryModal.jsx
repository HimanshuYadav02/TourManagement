import React, { useState } from 'react';
import { X, Sparkles, Shield, CheckCircle2, Calendar, Users, DollarSign, Send, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const EnquiryModal = ({ isOpen, onClose, preselectedPackage = null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destinationInterest: preselectedPackage ? preselectedPackage.destination?.name || preselectedPackage.title : 'Kerala',
    preferredTravelDate: '',
    adultsCount: 2,
    childrenCount: 0,
    budget: '',
    specialRequirements: preselectedPackage ? `Interested in booking: ${preselectedPackage.title}` : '',
    dpdpConsent: true,
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dpdpConsent) {
      setError('Please agree to data processing consent to proceed.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        rawCustomerMessage: formData.specialRequirements,
      };
      const res = await api.submitEnquiry(payload);
      setSuccessData(res);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccessData(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-ivory rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-sand-300 animate-fadeIn overflow-hidden">
        
        {/* Subtle decorative gold corner crest */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-gold-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-charcoal-500 hover:text-charcoal-900 bg-sand-100 hover:bg-sand-200 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-forest-50 border-2 border-forest-600 rounded-full flex items-center justify-center mx-auto text-forest-700">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest-900">
              Journey Request Received
            </h3>
            <div className="bg-sand-100 p-4 rounded-xl max-w-sm mx-auto text-xs text-charcoal-700 space-y-1 border border-sand-200">
              <p className="font-semibold text-forest-800">Reference Number</p>
              <p className="font-mono text-base font-bold text-gold-600 tracking-wider">
                {successData.referenceNo || 'ENQ-2026-CONFIRMED'}
              </p>
              <p className="text-[11px] text-charcoal-500 pt-1">
                Our senior concierge will review your travel details and connect within 4 business hours.
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="bg-forest-800 text-ivory px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-900 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-gold-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Concierge</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-900">
                Design Your Kerala Escape
              </h3>
              <p className="text-xs text-charcoal-500">
                Tell us your vision. Our destination concierges will curate an exclusive, verified itinerary tailored to your pace.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 45678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                />
              </div>
            </div>

            {/* Row 2: Email & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram.m@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Destination Focus</label>
                <select
                  value={formData.destinationInterest}
                  onChange={(e) => setFormData({ ...formData, destinationInterest: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                >
                  <option value="Kerala">All Kerala (Munnar & Backwaters)</option>
                  <option value="Munnar">Munnar High Ranges</option>
                  <option value="Alleppey">Alleppey Luxury Houseboat</option>
                  <option value="Thekkady">Thekkady & Periyar Wildlife</option>
                  <option value="Wayanad">Wayanad Rainforests</option>
                  <option value="South India Heritage">Madurai, Rameswaram & Kanyakumari</option>
                </select>
              </div>
            </div>

            {/* Row 3: Travel Date & Travellers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.preferredTravelDate}
                    onChange={(e) => setFormData({ ...formData, preferredTravelDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Adults</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.adultsCount}
                  onChange={(e) => setFormData({ ...formData, adultsCount: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Children (0-12 yrs)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.childrenCount}
                  onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
                />
              </div>
            </div>

            {/* Row 4: Budget */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Estimated Budget (INR)</label>
              <input
                type="number"
                placeholder="e.g. 120000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white"
              />
              <span className="text-[11px] text-charcoal-500">Mention total travel budget or leave blank for customized recommendations.</span>
            </div>

            {/* Special Requirements / Customer Message (AI processes this!) */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                Special Requirements & Preferences
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Hello, I want to visit Kerala in December for 6 days with my wife and child. My budget is 1.2 lakh. We prefer private luxury houseboats and valley view rooms."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700 bg-white leading-relaxed"
              ></textarea>
            </div>

            {/* DPDP Consent */}
            <div className="flex items-start space-x-2 pt-1">
              <input
                type="checkbox"
                id="dpdpConsent"
                checked={formData.dpdpConsent}
                onChange={(e) => setFormData({ ...formData, dpdpConsent: e.target.checked })}
                className="mt-0.5 rounded text-forest-800 focus:ring-forest-800"
              />
              <label htmlFor="dpdpConsent" className="text-[11px] text-charcoal-500 leading-tight">
                I authorize Kerala Luxury Escapes to process my personal data to generate personalized travel recommendations and quotations in compliance with the Digital Personal Data Protection (DPDP) Act 2023.
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest-800 text-ivory py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-900 transition-all shadow-luxury flex items-center justify-center space-x-2 border border-forest-700 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Your Request...</span>
                ) : (
                  <>
                    <span>Submit Journey Request</span>
                    <ArrowRight className="w-4 h-4 text-gold-400" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
