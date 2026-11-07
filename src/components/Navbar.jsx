import React, { useState } from 'react';
import { Compass, Menu, X, PhoneCall, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenEnquiry, currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'blogs', label: 'Travel Stories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Crest */}
          <button onClick={() => handleNav('home')} className="flex items-center space-x-3 group text-left">
            <div className="w-11 h-11 rounded-full bg-forest-800 flex items-center justify-center text-gold-500 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <span className="block font-editorial text-xl sm:text-2xl font-bold tracking-tight text-forest-900 group-hover:text-forest-700 transition-colors">
                KERALA LUXURY
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-600">
                Escapes &bull; Kochi
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 py-1 border-b-2 ${
                  currentTab === link.id
                    ? 'text-forest-800 border-gold-500 font-semibold'
                    : 'text-charcoal-700 border-transparent hover:text-forest-800 hover:border-sand-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA & Admin Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-forest-800 bg-sand-100 px-3.5 py-2 rounded-full hover:bg-sand-200 transition-colors border border-sand-200"
              >
                <UserCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Dashboard ({user?.username})</span>
              </button>
            ) : (
              <button
                onClick={() => handleNav('admin-login')}
                className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 hover:text-forest-800 transition-colors px-3 py-1.5"
              >
                Staff Portal
              </button>
            )}

            <button
              onClick={onOpenEnquiry}
              className="flex items-center space-x-2 bg-forest-800 text-ivory px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-luxury hover:bg-forest-900 hover:shadow-luxury-hover transition-all duration-300 group border border-forest-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-12 transition-transform" />
              <span>Plan Your Journey</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenEnquiry}
              className="bg-forest-800 text-ivory px-3 py-1.5 rounded-full text-xs font-medium"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-forest-900 p-2 rounded-lg hover:bg-sand-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-sand-200 px-6 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentTab === link.id ? 'text-forest-800 font-semibold' : 'text-charcoal-700'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-sand-200 flex flex-col space-y-3">
            <button
              onClick={() => handleNav(isAuthenticated ? 'admin' : 'admin-login')}
              className="text-left text-sm font-medium text-forest-800"
            >
              {isAuthenticated ? 'Enter Admin Dashboard' : 'Consultant / Staff Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
