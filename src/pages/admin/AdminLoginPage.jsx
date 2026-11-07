import React, { useState } from 'react';
import { Compass, Lock, User, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState(import.meta.env.DEV ? 'admin' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'password123' : '');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const quickLogin = async (roleUsername) => {
    setUsername(roleUsername);
    setPassword('password123');
    try {
      await login(roleUsername, 'password123');
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-sand-300 space-y-6 animate-fadeIn">
        
        {/* Brand Crest */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 mx-auto shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-900">
            Kerala Luxury Escapes
          </h2>
          <p className="text-xs text-charcoal-500 uppercase tracking-widest font-semibold">
            Concierge & Management Studio
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Username or Work Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin, editor, or consultant"
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-700 bg-sand-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-800 hover:bg-forest-900 text-ivory py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 border border-forest-700 disabled:opacity-50"
          >
            {loading ? <span>Authenticating...</span> : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </>
            )}
          </button>
        </form>

        {/* Quick-Access Evaluation Presets (Dev Mode Only - Excluded from Production UI) */}
        {import.meta.env.DEV && (
          <div className="pt-4 border-t border-sand-200 space-y-2.5">
            <p className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider text-center">
              Quick One-Click Demo Logins
            </p>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => quickLogin('admin')}
                className="p-2 rounded-lg bg-sand-100 hover:bg-sand-200 text-forest-900 font-semibold border border-sand-200 transition-colors"
              >
                ADMIN
                <span className="block text-[9px] font-normal text-charcoal-500">Full Access</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin('editor')}
                className="p-2 rounded-lg bg-sand-100 hover:bg-sand-200 text-forest-900 font-semibold border border-sand-200 transition-colors"
              >
                EDITOR
                <span className="block text-[9px] font-normal text-charcoal-500">Packages/Blogs</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin('consultant')}
                className="p-2 rounded-lg bg-sand-100 hover:bg-sand-200 text-forest-900 font-semibold border border-sand-200 transition-colors"
              >
                CONSULTANT
                <span className="block text-[9px] font-normal text-charcoal-500">CRM & Quotes</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-2">
          <button
            onClick={onCancel}
            className="text-xs text-charcoal-500 hover:text-forest-800 transition-colors"
          >
            &larr; Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
