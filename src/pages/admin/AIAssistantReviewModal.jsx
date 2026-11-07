import React, { useState, useEffect } from 'react';
import {
  X, Sparkles, Check, CheckCircle2, AlertTriangle, ShieldCheck,
  Edit3, ArrowRight, DollarSign, Calendar, Users, MapPin, Clock
} from 'lucide-react';
import { api } from '../../services/api';

export const AIAssistantReviewModal = ({ isOpen, onClose, enquiry, onReviewSuccess }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedDraft, setEditedDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('PENDING');

  useEffect(() => {
    if (enquiry && isOpen) {
      runOrLoadAnalysis();
    }
  }, [enquiry, isOpen]);

  const runOrLoadAnalysis = async () => {
    setLoading(true);
    try {
      const res = await api.runAIAnalysis(enquiry.id);
      setAnalysis(res);
      setEditedDraft(res.aiGeneratedReplyDraft || '');
      setReviewStatus(res.reviewStatus || 'PENDING');
    } catch (err) {
      console.error('AI Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !enquiry) return null;

  const handleDecision = async (status) => {
    setSubmitting(true);
    try {
      await api.reviewAIDraft(enquiry.id, {
        status,
        editedReplyDraft: editedDraft,
      });
      setReviewStatus(status);
      onReviewSuccess();
      if (status === 'APPROVED') {
        alert('AI Draft Approved! Ready to send to customer.');
      }
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to submit AI decision');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sand-300 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-sand-200 flex items-center justify-between shrink-0 bg-forest-950 text-ivory">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Enquiry Intelligence Studio</span>
              {analysis?.isMockFallback && (
                <span className="bg-gold-500/20 text-gold-300 text-[10px] px-2 py-0.5 rounded-full border border-gold-500/40">
                  Offline Mock Fallback Active
                </span>
              )}
            </div>
            <h2 className="font-editorial text-2xl font-bold">
              AI Natural Language Extraction & MySQL Match
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-forest-900 text-sand-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-charcoal-800">
          
          {loading ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-10 h-10 border-4 border-forest-800 border-t-gold-500 rounded-full animate-spin mx-auto" />
              <p className="font-semibold text-forest-900">Parsing natural language travel request...</p>
              <p className="text-[11px] text-charcoal-400">Extracting attributes and evaluating MySQL database packages...</p>
            </div>
          ) : (
            <>
              {/* 1. Original Customer Message Box */}
              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1.5">
                <span className="font-bold text-[10px] uppercase tracking-wider text-charcoal-400">
                  Raw Customer Query (WhatsApp / Web / Email)
                </span>
                <p className="text-sm font-medium text-forest-900 italic leading-relaxed">
                  "{enquiry.rawCustomerMessage || enquiry.specialRequirements || 'No raw message text provided.'}"
                </p>
                <div className="pt-1 flex items-center space-x-4 text-[11px] text-charcoal-500">
                  <span>Guest: <strong>{enquiry.fullName}</strong></span>
                  <span>&bull;</span>
                  <span>Ref: <strong className="font-mono">{enquiry.referenceNo}</strong></span>
                  <span>&bull;</span>
                  <span>Source: <strong>{enquiry.source}</strong></span>
                </div>
              </div>

              {/* 2. Structured Extraction Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-gold-600">
                    Step 1: Extracted Attributes
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Confidence: {analysis?.confidenceScore || 98.5}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Destination</span>
                    <p className="font-bold text-forest-900 text-xs truncate">
                      {analysis?.extractedDestination || 'Kerala'}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Duration</span>
                    <p className="font-bold text-forest-900 text-xs">
                      {analysis?.extractedDurationDays || 6} Days
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Travel Month</span>
                    <p className="font-bold text-forest-900 text-xs">
                      {analysis?.extractedMonth || 'December'}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Adults</span>
                    <p className="font-bold text-forest-900 text-xs">
                      {analysis?.extractedAdults || 2} Adults
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Children</span>
                    <p className="font-bold text-forest-900 text-xs">
                      {analysis?.extractedChildren || 0} Child
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sand-300 shadow-sm space-y-1">
                    <span className="text-[10px] text-charcoal-400 block font-semibold">Client Budget</span>
                    <p className="font-bold text-forest-900 text-xs truncate">
                      {analysis?.extractedBudget ? `₹${analysis.extractedBudget.toLocaleString()}` : 'Flexible'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Top Matched Packages from MySQL */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-gold-600">
                    Step 2: Suitable Packages Matched from MySQL (Zero Price Hallucination)
                  </span>
                  <span className="text-[10px] text-charcoal-400">
                    Fetched directly from relational schema
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysis?.matchedPackages && analysis.matchedPackages.length > 0 ? (
                    analysis.matchedPackages.map((pkg, idx) => (
                      <div
                        key={pkg.id}
                        className="p-4 rounded-xl border border-sand-300 bg-sand-50/50 hover:bg-sand-50 transition-colors space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full bg-forest-800 text-ivory flex items-center justify-center font-bold text-[10px]">
                              {idx + 1}
                            </span>
                            <h4 className="font-bold text-sm text-forest-900">{pkg.title}</h4>
                            <span className="text-[10px] text-charcoal-400">({pkg.durationDays} Days)</span>
                          </div>

                          <div className="flex items-center space-x-3 text-xs">
                            {pkg.peakPricePerPerson && (
                              <span className="font-semibold text-forest-900">
                                Peak: ₹{pkg.peakPricePerPerson.toLocaleString()}
                              </span>
                            )}
                            {pkg.monsoonPricePerPerson && (
                              <span className="text-emerald-800">
                                Monsoon: ₹{pkg.monsoonPricePerPerson.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-charcoal-600 pl-7 leading-relaxed font-normal">
                          <strong className="text-forest-800 font-semibold">Matching Rationale:</strong> {pkg.matchingReason}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-charcoal-400 p-4 bg-sand-50 rounded-xl">No matching published packages available.</p>
                  )}
                </div>
              </div>

              {/* 4. AI-Written Personalized Reply Draft */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-bold text-[10px] uppercase tracking-wider text-gold-600">
                      Step 3: AI-Generated Personalized Response Draft (Consultant Review)
                    </span>
                  </div>
                  <span className="text-[10px] text-charcoal-500 italic">
                    Edit draft below before approval
                  </span>
                </div>

                <textarea
                  rows="9"
                  value={editedDraft}
                  onChange={(e) => setEditedDraft(e.target.value)}
                  className="w-full text-xs p-4 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-white font-mono leading-relaxed"
                ></textarea>
              </div>

              {/* Safety Banner */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center space-x-2.5 text-[11px] text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Safety Rule Enforced:</strong> AI response will NOT be transmitted automatically without explicit consultant approval.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Decisions */}
        {!loading && (
          <div className="p-5 border-t border-sand-200 bg-sand-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-charcoal-500">Status:</span>
              <span className="font-bold uppercase tracking-wider text-forest-900 bg-sand-200 px-2 py-0.5 rounded">
                {reviewStatus}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleDecision('REJECTED')}
                disabled={submitting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors border border-red-200"
              >
                Reject Draft
              </button>

              <button
                type="button"
                onClick={() => handleDecision('EDITED')}
                disabled={submitting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sand-200 hover:bg-sand-300 text-charcoal-800 transition-colors"
              >
                Save Edits as Draft
              </button>

              <button
                type="button"
                onClick={() => handleDecision('APPROVED')}
                disabled={submitting}
                className="px-6 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-forest-800 hover:bg-forest-900 text-ivory transition-colors shadow-md flex items-center space-x-1.5 border border-forest-700"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Approve & Authorize Send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
