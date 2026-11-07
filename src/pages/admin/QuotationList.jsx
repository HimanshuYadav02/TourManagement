import React, { useState, useEffect } from 'react';
import { FileCheck, Download, Eye, Calendar, DollarSign, User } from 'lucide-react';
import { api } from '../../services/api';

export const QuotationList = ({ quotations = [] }) => {
  const [list, setList] = useState(quotations);

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    try {
      const data = await api.getQuotationsForEnquiry('all');
      if (data && data.length > 0) setList(data);
    } catch (e) {}
  };

  const handleDownloadPdf = (quoteId) => {
    window.open(api.getQuotationPdfUrl(quoteId), '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-forest-900">
            Quotation Repository
          </h2>
          <p className="text-xs text-charcoal-500">
            Official PDF quotations generated for customer travel inquiries.
          </p>
        </div>
      </div>

      {/* Quotation Table */}
      <div className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-sand-200">
              <tr>
                <th className="p-4">Quote Ref</th>
                <th className="p-4">Customer & Enquiry</th>
                <th className="p-4">Package</th>
                <th className="p-4">Season</th>
                <th className="p-4">Final Amount (INR)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">PDF Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 text-charcoal-800">
              {list.length > 0 ? (
                list.map((q) => (
                  <tr key={q.id} className="hover:bg-sand-50/70 transition-colors">
                    <td className="p-4 font-mono font-bold text-forest-900">
                      {q.quotationNo}
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-charcoal-900">{q.enquiry?.fullName || 'Valued Guest'}</span>
                        <span className="block text-[10px] text-charcoal-400">{q.enquiry?.email || q.enquiry?.phone}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-medium text-forest-900 truncate max-w-xs block">
                        {q.tourPackage?.title || 'Tour Package'}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-charcoal-600">
                      {q.seasonApplied} Season
                    </td>

                    <td className="p-4 font-bold text-forest-900 text-xs">
                      ₹{q.finalTotalAmount?.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {q.status || 'DRAFT'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDownloadPdf(q.id)}
                        className="inline-flex items-center space-x-1 bg-forest-800 hover:bg-forest-900 text-ivory px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-gold-400" />
                        <span>Download PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-charcoal-400">
                    No quotations generated yet. Open an enquiry in the CRM inbox to generate a quotation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
