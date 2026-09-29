'use client';

import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, Anchor, KeyRound, AlertCircle } from 'lucide-react';
import { DEFAULT_ADMIN_CREDENTIALS } from '@/lib/auth';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState(DEFAULT_ADMIN_CREDENTIALS.email);
  const [password, setPassword] = useState(DEFAULT_ADMIN_CREDENTIALS.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('bwl_admin_jwt', data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.error || 'Authentication failed. Please verify administrative credentials.');
      }
    } catch {
      setError('Unable to reach authentication service. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_ADMIN_CREDENTIALS.email);
    setPassword(DEFAULT_ADMIN_CREDENTIALS.password);
  };

  return (
    <div className="w-full max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#0B2545] p-8 text-white text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
            <Anchor className="w-8 h-8 text-[#EE964B]" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">BWL Central Operations Desk</h3>
            <p className="text-xs text-slate-300 mt-1">
              Secure Staff Portal • Multimodal Leads CRM & Milestone Control
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bwl.co.in"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* Demo Credentials Prompt */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#0B2545] flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#EE964B]" />
                Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-[#EE964B] hover:underline"
              >
                Auto-fill
              </button>
            </div>
            <p className="font-mono text-[11px] text-slate-700">
              user: <code className="text-[#0B2545] font-bold">admin@bwl.co.in</code><br />
              pass: <code className="text-[#0B2545] font-bold">BWLadmin2025!</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Operations Portal'}
            <ArrowRight className="w-4 h-4 text-[#EE964B]" />
          </button>
        </form>
      </div>
    </div>
  );
}
