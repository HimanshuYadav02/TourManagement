import React, { useState, useEffect } from 'react';
import {
  Inbox, Package, CheckCircle2, TrendingUp, Sparkles, Clock,
  ArrowRight, FileText, ShieldAlert, User, Compass
} from 'lucide-react';
import { api } from '../../services/api';

export const DashboardOverview = ({ onNavigateTab, onReviewEnquiry }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="p-8 text-center text-xs text-charcoal-500">
        Loading analytics dashboard...
      </div>
    );
  }

  const statusCards = [
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'New / Actionable', value: stats.newEnquiries, icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Confirmed Bookings', value: stats.confirmedBookings, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Published Packages', value: stats.publishedPackages, sub: `${stats.draftPackages} Drafts`, icon: Package, color: 'text-forest-700', bg: 'bg-forest-50', border: 'border-forest-200' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Greeting */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-2xl p-6 sm:p-8 text-ivory shadow-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Kochi Operations Hub</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Welcome to the Executive Travel Studio
          </h2>
          <p className="text-xs text-sand-300 font-light">
            Monitor real-time customer holiday inquiries, AI match recommendations, and seasonal catalog performance.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-1.5"
          >
            <Inbox className="w-4 h-4" />
            <span>Open CRM Inbox</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statusCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={`p-6 rounded-2xl bg-white border ${c.border} shadow-sm space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">{c.label}</span>
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="font-editorial text-3xl font-bold text-forest-900">{c.value}</p>
                {c.sub && <p className="text-[11px] text-charcoal-400 mt-0.5">{c.sub}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid: Enquiry Pipeline Funnel & Quick AI Assistant Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Enquiry Funnel Status Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-sand-300 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-lg font-bold text-forest-900">Enquiry Pipeline Stages</h3>
            <span className="text-xs font-semibold text-charcoal-500">Live Stage Counts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.enquiriesByStatus && Object.entries(stats.enquiriesByStatus).map(([statusKey, count]) => (
              <div key={statusKey} className="p-3.5 bg-sand-50 rounded-xl border border-sand-200 space-y-1">
                <span className="block text-[10px] font-bold text-charcoal-500 uppercase tracking-wider">
                  {statusKey.replace('_', ' ')}
                </span>
                <span className="font-editorial text-2xl font-bold text-forest-900">{count}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-charcoal-500 border-t border-sand-200">
            <span>Customer privacy monitored under DPDP Act 2023.</span>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="font-semibold text-forest-800 hover:text-gold-600 inline-flex items-center space-x-1"
            >
              <span>View All Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Assistant Spotlight (1 col) */}
        <div className="bg-forest-900 text-ivory p-6 rounded-2xl border border-forest-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Assistant Engine</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-ivory">
              Zero Price Hallucination
            </h3>
            <p className="text-xs text-sand-300 leading-relaxed">
              Our AI parses unstructured customer WhatsApp and email requests, extracts duration, month, party size, and budget, and matches against verified database rates.
            </p>
          </div>

          <div className="p-3 bg-forest-800/80 rounded-xl border border-gold-500/30 text-[11px] text-sand-200 space-y-1">
            <p className="font-semibold text-gold-400">Strict Safety Boundary:</p>
            <p>Every AI draft is flagged for consultant review and requires manual approval before transmitting to customers.</p>
          </div>

          <button
            onClick={() => onNavigateTab('enquiries')}
            className="w-full bg-gold-500 text-forest-950 font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors text-center"
          >
            Review Pending AI Extractions
          </button>
        </div>
      </div>

      {/* Bottom Grid: Recent Enquiries Table & Activity Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Enquiries (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-sand-200 flex items-center justify-between">
            <h3 className="font-editorial text-lg font-bold text-forest-900">Recent Customer Inquiries</h3>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-semibold text-forest-800 hover:text-gold-600"
            >
              Open Inbox &rarr;
            </button>
          </div>

          <div className="divide-y divide-sand-200 text-xs">
            {stats.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-sand-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-forest-900">{enq.fullName}</span>
                      <span className="font-mono text-[10px] text-charcoal-400">({enq.referenceNo})</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        enq.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                        enq.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' :
                        enq.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-sand-200 text-charcoal-700'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 line-clamp-1">
                      {enq.rawCustomerMessage || enq.specialRequirements || `${enq.destinationInterest} (${enq.adultsCount} adults)`}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onReviewEnquiry(enq)}
                      className="bg-sand-100 hover:bg-forest-800 hover:text-ivory text-forest-900 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-sand-300"
                    >
                      Inspect Lead & AI
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-charcoal-400">No enquiries recorded yet.</p>
            )}
          </div>
        </div>

        {/* Activity Audit Log (1 col) */}
        <div className="bg-white rounded-2xl border border-sand-300 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-sand-200 pb-3">
            <h3 className="font-editorial text-lg font-bold text-forest-900">Activity Audit Trail</h3>
            <Clock className="w-4 h-4 text-charcoal-400" />
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {stats.recentActivities && stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((act) => (
                <div key={act.id} className="text-xs space-y-0.5 border-b border-sand-100 pb-2.5 last:border-0">
                  <div className="flex items-center justify-between text-[10px] text-charcoal-400">
                    <span className="font-bold text-forest-800">{act.userName}</span>
                    <span>{act.timestamp}</span>
                  </div>
                  <p className="text-charcoal-700 text-[11px] leading-tight">{act.details}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-charcoal-400">No activity logged.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
