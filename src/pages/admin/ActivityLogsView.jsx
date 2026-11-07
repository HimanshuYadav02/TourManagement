import React, { useState, useEffect } from 'react';
import { History, Shield, Clock, User, Filter } from 'lucide-react';
import { api } from '../../services/api';

export const ActivityLogsView = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const stats = await api.getDashboardStats();
      if (stats?.recentActivities) {
        setLogs(stats.recentActivities);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-forest-900">
            System & User Activity Audit Log
          </h2>
          <p className="text-xs text-charcoal-500">
            Compliance and accountability trail for all database modifications and user access.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-sand-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 text-charcoal-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-sand-50/70 transition-colors">
                  <td className="p-4 font-mono text-charcoal-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-4 font-bold text-forest-900 whitespace-nowrap">
                    {log.userName}
                  </td>
                  <td className="p-4">
                    <span className="bg-sand-200 text-forest-900 font-mono text-[10px] px-2 py-0.5 rounded font-semibold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-charcoal-600">
                    {log.entityType} #{log.entityId || '-'}
                  </td>
                  <td className="p-4 text-charcoal-700 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
