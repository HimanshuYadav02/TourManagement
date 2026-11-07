import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest-900 text-sand-100 pt-16 pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800/80">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-editorial text-2xl font-bold tracking-tight text-ivory">
                  KERALA LUXURY
                </span>
                <span className="block text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-400">
                  Escapes &bull; Kochi
                </span>
              </div>
            </div>

            <p className="text-sand-300 text-sm leading-relaxed max-w-sm">
              Kochi's premier experiential tour operator. We craft bespoke, private journeys through misty tea hills, untouched backwaters, and heritage sanctuaries across God's Own Country.
            </p>

            <div className="pt-2 text-xs text-sand-300 space-y-1">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>Fort Kochi Heritage Zone, Kochi, Kerala 682001</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>+91 484 221 8900 / +91 98470 12345</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>concierge@keralaluxuryescapes.com</span>
              </p>
            </div>
          </div>

          {/* Curated Destinaton Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Destinations</h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">Munnar High Ranges</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">Alleppey Backwaters</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">Thekkady Wild Periyar</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">Wayanad Rainforests</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">Varkala & Kovalam Cliffs</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-gold-300 transition-colors">South India Corridors</button></li>
            </ul>
          </div>

          {/* Quick Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Experiences</h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li><button onClick={() => onNavigate('packages')} className="hover:text-gold-300 transition-colors">Private Houseboat Charters</button></li>
              <li><button onClick={() => onNavigate('packages')} className="hover:text-gold-300 transition-colors">Plantation Heritage Stays</button></li>
              <li><button onClick={() => onNavigate('packages')} className="hover:text-gold-300 transition-colors">Ayurvedic Healing Journeys</button></li>
              <li><button onClick={() => onNavigate('blogs')} className="hover:text-gold-300 transition-colors">Travel Stories & Guides</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-gold-300 transition-colors">About Our Concierge</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-gold-300 transition-colors">Contact Fort Kochi Office</button></li>
            </ul>
          </div>

          {/* Newsletter / Seasonal Journal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">The Kerala Journal</h4>
            <p className="text-xs text-sand-300 leading-relaxed">
              Receive curated seasonal guides, spice harvest dispatches, and private retreat invitations.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-gold-400 bg-forest-800/80 p-3 rounded-lg border border-gold-500/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. You have been added to our private dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-forest-800 text-ivory text-xs px-3.5 py-2.5 rounded-lg border border-forest-700 focus:outline-none focus:border-gold-500 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2 bg-gold-500 text-forest-900 rounded flex items-center justify-center hover:bg-gold-400 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-sand-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>Compliant with DPDP Act 2023. Zero spam.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sand-400 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Kerala Luxury Escapes Pvt. Ltd. All rights reserved. GSTIN: 32AAACK1234M1Z5</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Government of Kerala Tourism Accredited</span>
            <span>&bull;</span>
            <button onClick={() => onNavigate('admin-login')} className="hover:text-gold-300 transition-colors">
              Employee Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
