import React from 'react';
import { Sparkles, Compass, Shield, Award, HeartHandshake, ArrowRight, Star, Calendar, Users, MapPin, ChevronRight } from 'lucide-react';
import { PackageCard } from '../../components/PackageCard';
import { DestinationCard } from '../../components/DestinationCard';

export const HomePage = ({ destinations, packages, blogs, onSelectPackage, onSelectDestination, onSelectBlog, onOpenEnquiry, onNavigate }) => {
  const signaturePackages = packages.filter(p => p.status === 'PUBLISHED').slice(0, 3);
  const featuredDestinations = destinations.slice(0, 4);
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Cinematic Full-Screen Kerala Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-forest-950 overflow-hidden">
        {/* Background Image with Parallax Vibe */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85"
            alt="Alleppey Backwaters Kerala"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-transparent to-forest-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-ivory py-24 space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-[0.2em] animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Kochi's Premier Experiential Luxury Operator</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-ivory drop-shadow-md">
            Where Mist Meets Water &bull; <br />
            <span className="italic font-normal text-gold-300 font-serif">And Time Stands Still</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-sand-100 font-light leading-relaxed">
            From the tea-carpeted ridges of Munnar to private wooden barges drifting across serene backwaters. Experience Kerala through handpicked sanctuaries, private chauffeurs, and bespoke itineraries.
          </p>

          {/* Quick Search & Explore Bar */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl border border-sand-300 flex flex-col sm:flex-row items-center gap-3 text-charcoal-900">
            
            <div className="flex-1 w-full flex items-center space-x-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-sand-200">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
              <div className="text-left w-full">
                <span className="block text-[10px] uppercase font-bold text-charcoal-500 tracking-wider">Destination</span>
                <span className="text-xs font-semibold text-forest-900">Munnar, Alleppey, Thekkady</span>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center space-x-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-sand-200">
              <Calendar className="w-4 h-4 text-gold-600 shrink-0" />
              <div className="text-left w-full">
                <span className="block text-[10px] uppercase font-bold text-charcoal-500 tracking-wider">Season</span>
                <span className="text-xs font-semibold text-forest-900">Peak (Oct - Mar) / Monsoon</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className="w-full sm:w-auto bg-forest-800 hover:bg-forest-900 text-ivory px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 shrink-0 border border-forest-700"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-sand-300">
            <span className="flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-gold-400" />
              <span>100% Private Chauffeur Fleet</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Government of Kerala Accredited</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>AI-Assisted Fast Quotations</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Popular Destinations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              <Compass className="w-4 h-4" />
              <span>Handpicked Enclaves</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest-900">
              Iconic South Indian Destinations
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-xl">
              Each landscape presents a distinct rhythm—from high mountain tea sanctuaries to silent palm-shaded waters.
            </p>
          </div>

          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} onSelect={onSelectDestination} />
          ))}
        </div>
      </section>

      {/* 3. Featured Signature Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              <Sparkles className="w-4 h-4" />
              <span>Curated Holiday Packages</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest-900">
              Signature Holiday Itineraries
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-xl">
              All packages feature private luxury sedan or SUV transfers, boutique accommodation, and verified seasonal rates.
            </p>
          </div>

          <button
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
          >
            <span>Browse All Packages ({packages.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signaturePackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectPackage}
              onEnquire={onOpenEnquiry}
            />
          ))}
        </div>
      </section>

      {/* 4. Why Travel With Us (The Kerala Luxury Standard) */}
      <section className="bg-sand-100/70 border-y border-sand-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
              The Bespoke Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest-900">
              Why Discerning Travellers Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
              We operate exclusively out of Fort Kochi, pairing local cultural depth with international hospitality rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-sm space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <Compass className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest-900">Authentic Curation</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Handpicked 5-star mountain villas, organic tea plantation estates, and private heritage houseboats personally vetted by our directors.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-sm space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <Shield className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest-900">Dedicated Fleet</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Chauffeur-driven private luxury sedans and SUVs with professional, English-speaking drivers trained in high-range mountain navigation.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-sm space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <Award className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest-900">Verified Pricing</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Complete transparency across Peak, Monsoon, and Off-Season tiers with detailed GST invoices and zero hidden surcharges.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-sm space-y-3 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <HeartHandshake className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest-900">24x7 Concierge Support</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                From airport welcome at Cochin International to custom dietary coordination aboard your houseboat, a dedicated consultant is always on call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Guest Reflections</span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest-900">
            Stories from Our Travellers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-sand-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-gold-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed">
                "The 6-day Munnar, Thekkady and Alleppey trip was flawless. The private houseboat in Alleppey was breathtaking—our onboard chef served the finest Karimeen Pollichathu we have ever tasted."
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-forest-900">Vikram & Sunita Malhotra</p>
              <p className="text-[11px] text-charcoal-500">Mumbai &bull; December Family Holiday</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-gold-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed">
                "Our driver was courteous and knowledgeable, navigating the ghat roads with total comfort. Staying in a treehouse sanctuary in Wayanad felt like living inside a fairy tale."
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-forest-900">David & Claire Harrison</p>
              <p className="text-[11px] text-charcoal-500">London, UK &bull; 10-Day South India Tour</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-gold-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed">
                "The speed of their quotation and transparent seasonal pricing won us over immediately. Not a single hidden charge, and the concierge was available 24x7 during our stay."
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-forest-900">Dr. Ananya & Rohit Sen</p>
              <p className="text-[11px] text-charcoal-500">Bangalore &bull; Honeymoon Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Travel Stories & Blog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              <Sparkles className="w-4 h-4" />
              <span>Cultural Journal</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest-900">
              Stories from God's Own Country
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-xl">
              Immerse yourself in essays exploring culinary traditions, tea culture, and backwater ecology.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
          >
            <span>Read All Stories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentBlogs.map((b) => (
            <div
              key={b.id}
              onClick={() => onSelectBlog(b)}
              className="group bg-white rounded-2xl overflow-hidden border border-sand-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 cursor-pointer flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden bg-sand-200">
                <img
                  src={b.featuredImageUrl}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">
                    {b.category?.name || 'Kerala Story'} &bull; {b.readTimeMinutes} min read
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-forest-900 group-hover:text-forest-700 transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 line-clamp-2 leading-relaxed">
                    {b.summary}
                  </p>
                </div>
                <div className="inline-flex items-center space-x-1 text-xs font-semibold text-forest-800 group-hover:text-gold-600 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-14 text-center text-ivory relative overflow-hidden shadow-2xl border border-forest-800 space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            <Compass className="w-4 h-4" />
            <span>Private Consultations</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Ready to Experience the Magic of God's Own Country?
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-sand-200 font-light leading-relaxed">
            Connect directly with our Fort Kochi concierge. We will design a personalized holiday itinerary and send you an official PDF quotation within hours.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto bg-gold-500 text-forest-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shadow-lg"
            >
              Start Custom Enquiry
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-forest-800 hover:bg-forest-700 text-ivory px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border border-forest-700"
            >
              Call Our Concierge
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
