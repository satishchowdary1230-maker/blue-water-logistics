'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Layers, 
  Gauge, 
  Anchor, 
  Train, 
  Plane,
  ChevronRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function HeroSection() {
  const [quickTrackId, setQuickTrackId] = useState('');
  const router = useRouter();

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      router.push(`/tracker?id=${encodeURIComponent(quickTrackId.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#051326] via-[#0B2545] to-[#134074] text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Decorative Mesh & Waves */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-15 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00A896]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#EE964B]/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Authentic Corporate Eyebrow Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
            <span className="text-white font-mono font-bold">CIN: {BWL_CORPORATE_INFO.cin}</span>
            <span className="text-slate-400">•</span>
            <span className="text-[#EE964B] font-bold">MTO Act 1993 Registered</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              IVR BBB / Stable Rated
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
            India’s Multimodal Logistics Powerhouse. <br className="hidden sm:inline" />
            <span className="text-gradient-gold">Engineering Global Supply Chains.</span>
          </h1>

          {/* Authentic Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Headquartered in Banjara Hills, Hyderabad, <strong className="text-white">Blue Water Logistics Limited</strong> operates 
            a dedicated fleet of <strong>1,708+ ISO Tanks</strong>, heavy-duty intermodal rail rakes, and licensed CHA operations 
            delivering bulk liquids, chemicals, and ocean freight across 140+ global ports.
          </p>

          {/* High-Impact Interactive Hero Tracking Form */}
          <div className="max-w-2xl mx-auto pt-4">
            <form onSubmit={handleQuickTrack} className="p-2 sm:p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quickTrackId}
                  onChange={(e) => setQuickTrackId(e.target.value)}
                  placeholder="Track Container (e.g. BWLU104829), AWB or B/L..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-900 font-mono font-semibold placeholder:font-sans placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#EE964B] text-sm uppercase"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all shrink-0"
              >
                <span>Track Cargo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Quick Demo Pill Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 mt-3">
              <span className="text-slate-400">Live Demonstrations:</span>
              <button
                type="button"
                onClick={() => router.push('/tracker?id=BWLU104829')}
                className="hover:text-amber-300 font-mono underline decoration-amber-400/50 underline-offset-4"
              >
                BWLU104829 (ISO Tank)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => router.push('/tracker?id=098-84729104')}
                className="hover:text-amber-300 font-mono underline decoration-amber-400/50 underline-offset-4"
              >
                098-84729104 (Air AWB)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => router.push('/tracker?id=BWL-BL-948201')}
                className="hover:text-amber-300 font-mono underline decoration-amber-400/50 underline-offset-4"
              >
                BWL-BL-948201 (Ocean B/L)
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Instant Freight Estimator</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all"
            >
              <span>Explore Fleet & Services</span>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </Link>
          </div>
        </div>

        {/* Real Authentic KPI Counters Strip */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-2 text-[#EE964B] mb-1">
              <Gauge className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">ISO Tank Fleet</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">1,708+</div>
            <p className="text-xs text-slate-400 mt-1">T11/T14/T50 Tanks (24k-26k L)</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <Train className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">Surface Fleet</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">100+</div>
            <p className="text-xs text-slate-400 mt-1">GPS Heavy Container Trailers</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-2 text-sky-400 mb-1">
              <Anchor className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">Global Ports</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">140+</div>
            <p className="text-xs text-slate-400 mt-1">Direct NVOCC Vessel Terminals</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">Delivery SLA</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">99.4%</div>
            <p className="text-xs text-slate-400 mt-1">On-Time Multimodal Compliance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
