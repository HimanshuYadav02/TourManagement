import React from 'react';
import { Compass, ShieldCheck, Heart, Award, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const AboutUsPage = ({ onOpenEnquiry, onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero */}
      <section className="relative py-20 bg-forest-950 text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80"
            alt="Munnar Hills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Our Heritage & Ethos</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold">
            Born in Fort Kochi. Rooted in Kerala.
          </h1>
          <p className="text-sm text-sand-200 font-light leading-relaxed">
            Founded with a singular commitment: to restore intimacy, slow luxury, and authentic cultural immersion to South Indian journeys.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-charcoal-700 text-sm leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">The Operator's Journey</span>
          <h2 className="font-editorial text-3xl font-bold text-forest-900 leading-snug">
            Crafting Unrushed Journeys Across God's Own Country
          </h2>
          <p>
            Headquartered in the historic Fort Kochi spice quarter, Kerala Luxury Escapes was created in response to the standardized mass-bus tourism that has overshadowed South India's serene landscape.
          </p>
          <p>
            We believe true luxury is not gold leaf or generic hotel chains—it is the whisper of dawn over Vembanad Lake while your private Kettuvallam drifts without another boat in sight; the crisp mountain air of a boutique tea bungalow where planters have dried orthodox leaves for four generations; and the peace of mind knowing your chauffeur is a courteous local specialist who knows every secluded waterfall.
          </p>
          <div className="pt-2 flex items-center space-x-4 text-xs font-semibold text-forest-800">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Full DPDP Act 2023 Compliance</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-gold-600" />
              <span>Kerala Tourism Gold Partner</span>
            </span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
            alt="Kerala Houseboat"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-sand-100 py-16 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Our Commitments</span>
            <h3 className="font-editorial text-3xl font-bold text-forest-900">The Four Pillars</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sand-200 space-y-2">
              <h4 className="font-editorial text-base font-bold text-forest-900">Zero Commercial Detours</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                We never take our guests to forced roadside gift shops or commercial commission traps. Your journey is purely your own.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sand-200 space-y-2">
              <h4 className="font-editorial text-base font-bold text-forest-900">Verified Direct Rates</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Direct seasonal contracting with Kerala's top boutique resorts allows us to offer transparent, verified pricing with full GST clarity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sand-200 space-y-2">
              <h4 className="font-editorial text-base font-bold text-forest-900">Responsible Tourism</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Our houseboats utilize solar energy and bio-degradable waste systems, employing village skippers and local culinary talents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sand-200 space-y-2">
              <h4 className="font-editorial text-base font-bold text-forest-900">Intelligent Fast Response</h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Our bespoke AI assistant and experienced Fort Kochi concierges respond with customized PDF quotations within hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-2xl mx-auto px-4 space-y-4">
        <h3 className="font-editorial text-3xl font-bold text-forest-900">Begin Your Journey With Us</h3>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          Let our senior concierges craft an itinerary around your dream dates, tastes, and travel company.
        </p>
        <button
          onClick={onOpenEnquiry}
          className="bg-forest-800 text-ivory px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-900 transition-colors shadow-md"
        >
          Plan Your Escape
        </button>
      </section>
    </div>
  );
};
