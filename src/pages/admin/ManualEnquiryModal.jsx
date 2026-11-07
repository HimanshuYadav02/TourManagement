import React, { useState } from 'react';
import { X, Plus, Phone, MessageSquare, Mail, Sparkles } from 'lucide-react';

export const ManualEnquiryModal = ({ isOpen, onClose, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destinationInterest: 'Kerala',
    preferredTravelDate: '',
    adultsCount: 2,
    childrenCount: 0,
    budget: '',
    source: 'MANUAL_WHATSAPP',
    rawCustomerMessage: '',
    specialRequirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
      };
      await onSaveSuccess(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save manual enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sand-300 space-y-5 animate-fadeIn">
        
        <div className="flex items-center justify-between pb-3 border-b border-sand-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">Offline Lead Recording</span>
            <h2 className="font-editorial text-2xl font-bold text-forest-900">
              Manual Enquiry Entry
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
          
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Lead Channel / Source *</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-sand-300 font-medium"
            >
              <option value="MANUAL_WHATSAPP">WhatsApp Lead (+91 98470 12345)</option>
              <option value="MANUAL_PHONE">Telephone Inquiry</option>
              <option value="MANUAL_EMAIL">Direct Email Received</option>
              <option value="WALK_IN">Fort Kochi Office Walk-in</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Customer Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vikram Malhotra"
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98200 45678"
                className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="customer@example.com"
              className="w-full text-xs p-2.5 rounded-xl border border-sand-300"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Adults</label>
              <input
                type="number"
                min="1"
                value={formData.adultsCount}
                onChange={(e) => setFormData({ ...formData, adultsCount: parseInt(e.target.value) || 1 })}
                className="w-full text-xs p-2 rounded-xl border border-sand-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Children</label>
              <input
                type="number"
                min="0"
                value={formData.childrenCount}
                onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 0 })}
                className="w-full text-xs p-2 rounded-xl border border-sand-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Budget (₹)</label>
              <input
                type="number"
                placeholder="120000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full text-xs p-2 rounded-xl border border-sand-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">
              Raw Customer Message (for AI Processing)
            </label>
            <textarea
              rows="3"
              value={formData.rawCustomerMessage}
              onChange={(e) => setFormData({ ...formData, rawCustomerMessage: e.target.value, specialRequirements: e.target.value })}
              placeholder="e.g. Hello, I want to visit Kerala in December for 6 days with my wife and child. My budget is 1.2 lakh."
              className="w-full text-xs p-3 rounded-xl border border-sand-300 leading-relaxed font-mono"
            ></textarea>
            <span className="text-[10px] text-charcoal-400">
              The AI Assistant will automatically extract party size, dates, and budget from this text.
            </span>
          </div>

          <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
            <button type="button" onClick={onClose} className="text-xs text-charcoal-500 hover:text-charcoal-800">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-forest-800 hover:bg-forest-900 text-ivory px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Logging Lead...' : 'Register Lead & Trigger AI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
