import React, { useState, useEffect } from 'react';
import { X, History, RotateCcw, Check, Calendar } from 'lucide-react';
import { api } from '../../services/api';

export const PackageVersionHistoryModal = ({ isOpen, onClose, pkg, onRollbackSuccess }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rollingBack, setRollingBack] = useState(false);

  useEffect(() => {
    if (pkg && isOpen) {
      loadVersions();
    }
  }, [pkg, isOpen]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const data = await api.getPackageVersions(pkg.id);
      setVersions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRollback = async (versionNumber) => {
    if (!window.confirm(`Are you sure you want to restore Version ${versionNumber}? A new version snapshot will be preserved.`)) {
      return;
    }
    setRollingBack(true);
    try {
      await api.rollbackPackageVersion(pkg.id, versionNumber);
      onRollbackSuccess();
      onClose();
    } catch (err) {
      alert(err.message || 'Rollback failed');
    } finally {
      setRollingBack(false);
    }
  };

  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-sand-300 space-y-5 animate-fadeIn">
        
        <div className="flex items-center justify-between pb-3 border-b border-sand-200">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-gold-600" />
            <div>
              <h3 className="font-editorial text-xl font-bold text-forest-900">
                Version History
              </h3>
              <p className="text-[11px] text-charcoal-400 truncate max-w-sm">{pkg.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-sand-100 text-charcoal-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <p className="text-center py-8 text-xs text-charcoal-500">Loading historical versions...</p>
        ) : versions.length === 0 ? (
          <p className="text-center py-8 text-xs text-charcoal-500">
            No previous versions recorded yet for this package.
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {versions.map((v) => {
              const isCurrent = v.versionNumber === pkg.currentVersion;
              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                    isCurrent ? 'bg-forest-50/70 border-forest-300' : 'bg-sand-50/50 border-sand-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-forest-900">v{v.versionNumber}</span>
                      {isCurrent && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Current Live
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal-700 font-medium">{v.changeSummary || 'Routine update'}</p>
                    <p className="text-[10px] text-charcoal-400">
                      Modified by {v.changedBy?.fullName || 'Staff'} on {new Date(v.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!isCurrent && (
                    <button
                      onClick={() => handleRollback(v.versionNumber)}
                      disabled={rollingBack}
                      className="shrink-0 bg-sand-200 hover:bg-forest-800 hover:text-ivory text-forest-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rollback</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="bg-sand-100 text-charcoal-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-sand-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
