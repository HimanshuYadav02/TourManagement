import React, { useState } from 'react';
import {
  Inbox, Sparkles, Plus, Search, Filter, Phone, Mail,
  Calendar, Users, DollarSign, FileCheck, CheckCircle2,
  Clock, MessageSquare, ArrowRight, UserCheck
} from 'lucide-react';

export const EnquiryInbox = ({
  enquiries,
  onOpenManualEnquiry,
  onReviewAI,
  onOpenQuotationStudio,
  onStatusChange,
  onAddNote,
  onAssign
}) => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'QUOTATION_SENT', 'CONFIRMED', 'LOST'];

  const filtered = enquiries.filter(e => {
    if (selectedStatus !== 'ALL' && e.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = e.fullName.toLowerCase().includes(q);
      const matchRef = e.referenceNo.toLowerCase().includes(q);
      const matchEmail = e.email.toLowerCase().includes(q);
      const matchPhone = e.phone.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchEmail && !matchPhone) return false;
    }
    return true;
  });

  const handleAddNoteSubmit = (enquiryId) => {
    if (!noteInput.trim()) return;
    onAddNote(enquiryId, noteInput);
    setNoteInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Action Header */}
      <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search enquiries by name, ref, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50 w-64"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all ${
                  selectedStatus === st
                    ? 'bg-forest-800 text-ivory shadow-sm'
                    : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200 border border-sand-200'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenManualEnquiry}
          className="bg-forest-800 hover:bg-forest-900 text-ivory px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 shrink-0 border border-forest-700"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Log Manual Enquiry (WhatsApp/Phone)</span>
        </button>
      </div>

      {/* Main Grid: Enquiry List (Left) and Detail Drawer (Right if selected) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enquiry Table / Cards (2 cols or full if no selection) */}
        <div className={`${selectedEnquiry ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-3`}>
          {filtered.length > 0 ? (
            filtered.map((enq) => {
              const hasAI = !!enq.aiExtractionId;
              const isSelected = selectedEnquiry?.id === enq.id;

              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer space-y-3 ${
                    isSelected ? 'border-forest-800 ring-2 ring-forest-800/20 shadow-md' : 'border-sand-300 hover:border-sand-400 shadow-sm'
                  }`}
                >
                  {/* Card Top: Ref, Status, Source, Travellers */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-100 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-gold-600 bg-gold-100/60 px-2.5 py-0.5 rounded-md">
                        {enq.referenceNo}
                      </span>
                      <h4 className="font-bold text-sm text-forest-900">{enq.fullName}</h4>
                      <span className="text-[10px] text-charcoal-400">({enq.source})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={enq.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          onStatusChange(enq.id, e.target.value);
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          enq.status === 'NEW' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          enq.status === 'QUALIFIED' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          enq.status === 'QUOTATION_SENT' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          enq.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-sand-100 text-charcoal-700 border-sand-200'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="QUOTATION_SENT">QUOTATION SENT</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Message snippet */}
                  <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed bg-sand-50/70 p-2.5 rounded-xl border border-sand-200/60 italic">
                    "{enq.rawCustomerMessage || enq.specialRequirements || 'No special requirements noted'}"
                  </p>

                  {/* Meta Bar: Contact, Adults, Budget, AI Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-charcoal-500 pt-1">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-forest-700" />
                        <span>{enq.phone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-forest-700" />
                        <span>{enq.email}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-forest-700" />
                        <span>{enq.adultsCount} Adults, {enq.childrenCount} Children</span>
                      </span>
                      {enq.budget && (
                        <span className="font-semibold text-forest-900">
                          Budget: ₹{enq.budget.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onReviewAI(enq)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                          hasAI
                            ? 'bg-gold-100 text-forest-900 border-gold-300 hover:bg-gold-200'
                            : 'bg-forest-800 text-ivory border-forest-700 hover:bg-forest-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        <span>{hasAI ? 'Review AI Draft & Match' : 'Run AI Assistant'}</span>
                      </button>

                      <button
                        onClick={() => onOpenQuotationStudio(enq)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sand-100 hover:bg-sand-200 text-forest-900 border border-sand-300 transition-colors"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-forest-800" />
                        <span>Generate Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-sand-300 space-y-3">
              <Inbox className="w-8 h-8 text-charcoal-400 mx-auto" />
              <p className="font-editorial text-lg font-bold text-forest-900">No Inquiries Found</p>
              <p className="text-xs text-charcoal-500">No leads match the selected filter or search term.</p>
            </div>
          )}
        </div>

        {/* Selected Lead Inspector Drawer (1 col) */}
        {selectedEnquiry && (
          <div className="bg-white rounded-2xl border border-sand-300 p-6 shadow-luxury space-y-6 self-start lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <div>
                <span className="font-mono text-xs font-bold text-gold-600">{selectedEnquiry.referenceNo}</span>
                <h3 className="font-editorial text-xl font-bold text-forest-900">{selectedEnquiry.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-xs text-charcoal-400 hover:text-charcoal-800 font-semibold"
              >
                Close
              </button>
            </div>

            {/* Travel Specs */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-charcoal-400 uppercase tracking-wider text-[10px]">Client Specs</span>
              <div className="grid grid-cols-2 gap-2 bg-sand-50 p-3 rounded-xl border border-sand-200 text-[11px]">
                <div>
                  <span className="text-charcoal-500 block">Destination:</span>
                  <span className="font-semibold text-forest-900">{selectedEnquiry.destinationInterest || 'Kerala'}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block">Party Size:</span>
                  <span className="font-semibold text-forest-900">{selectedEnquiry.adultsCount} Adults, {selectedEnquiry.childrenCount} Child</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block">Budget:</span>
                  <span className="font-semibold text-forest-900">{selectedEnquiry.budget ? `₹${selectedEnquiry.budget.toLocaleString()}` : 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block">Travel Date:</span>
                  <span className="font-semibold text-forest-900">{selectedEnquiry.preferredTravelDate || 'Unspecified'}</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Quick Summary */}
            <div className="p-4 bg-forest-950 text-ivory rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-gold-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Match Status</span>
                </span>
                <span className="text-[10px] bg-forest-800 text-sand-200 px-2 py-0.5 rounded-full font-mono">
                  {selectedEnquiry.aiReviewStatus || 'PENDING'}
                </span>
              </div>
              <p className="text-[11px] text-sand-300 leading-relaxed">
                {selectedEnquiry.matchingRationales || 'Click below to execute AI natural language extraction and match against published packages.'}
              </p>
              <button
                onClick={() => onReviewAI(selectedEnquiry)}
                className="w-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold py-2 rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Inspect AI Draft & Packages
              </button>
            </div>

            {/* Internal Consultant Notes */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-charcoal-400 uppercase tracking-wider text-[10px]">Internal Notes & Follow-ups</span>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                  selectedEnquiry.notes.map(n => (
                    <div key={n.id} className="p-2.5 bg-sand-50 rounded-lg border border-sand-200 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-[9px] text-charcoal-400">
                        <span className="font-bold text-forest-900">{n.authorName}</span>
                        <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-charcoal-700">{n.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-charcoal-400 italic">No internal notes added.</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add private consultant note..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-sand-300 focus:outline-none focus:border-forest-700"
                />
                <button
                  onClick={() => handleAddNoteSubmit(selectedEnquiry.id)}
                  className="bg-forest-800 text-ivory px-3 py-2 rounded-lg text-xs font-semibold hover:bg-forest-900 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-sand-200">
              <button
                onClick={() => onOpenQuotationStudio(selectedEnquiry)}
                className="w-full bg-forest-800 hover:bg-forest-900 text-ivory py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                <FileCheck className="w-4 h-4 text-gold-400" />
                <span>Open Quotation Studio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
