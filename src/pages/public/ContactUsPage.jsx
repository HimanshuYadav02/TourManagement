import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const ContactUsPage = ({ onOpenEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitEnquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialRequirements: formData.message,
        source: 'WEBSITE_CONTACT',
        dpdpConsent: true,
      });
      setSent(true);
    } catch (e) {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">Get in Touch</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-forest-900">
          Connect with Our Fort Kochi Concierge
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          Whether you are planning months in advance or seeking a spontaneous weekend backwater cruise, our local specialists are here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Information & Map Info (1 col) */}
        <div className="bg-forest-900 text-ivory p-8 rounded-3xl space-y-8 shadow-luxury flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-editorial text-2xl font-bold text-gold-300">
              Fort Kochi Headquarters
            </h3>
            
            <div className="space-y-4 text-xs text-sand-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Principal Concierge Bureau</p>
                  <p>14/228 Princess Street, Fort Kochi Heritage Zone,</p>
                  <p>Kochi, Kerala 682001, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Direct Telephone</p>
                  <p>+91 484 221 8900 (Office lines)</p>
                  <p>+91 98470 12345 (24x7 WhatsApp Concierge)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Electronic Inquiries</p>
                  <p>concierge@keralaluxuryescapes.com</p>
                  <p>bookings@keralaluxuryescapes.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Concierge Hours</p>
                  <p>Monday &ndash; Saturday: 08:30 AM &ndash; 08:00 PM IST</p>
                  <p>Sunday: 10:00 AM &ndash; 05:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-forest-800 text-[11px] text-sand-400">
            <p>GSTIN: 32AAACK1234M1Z5</p>
            <p>Accredited by Department of Tourism, Govt of Kerala.</p>
          </div>
        </div>

        {/* Contact Form (2 cols) */}
        <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-sand-300 shadow-luxury">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-forest-50 border-2 border-forest-600 rounded-full flex items-center justify-center mx-auto text-forest-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-forest-900">Message Dispatched</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Thank you for reaching out. A senior travel specialist will contact you by phone or email within a few hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="bg-forest-800 text-ivory px-6 py-2.5 rounded-full text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-forest-900">Send an Inquiry</h3>
              <p className="text-xs text-charcoal-500">
                Leave your contact details and message, or use our specialized custom trip planner.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98470 12345"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul.sharma@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Your Message or Holiday Vision</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify your preferred month, number of travelers, destinations of interest, and budget..."
                  className="w-full text-xs p-3.5 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-forest-800 hover:bg-forest-900 text-ivory px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
                >
                  {loading ? 'Transmitting...' : 'Dispatch Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
