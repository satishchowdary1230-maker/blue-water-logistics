import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServiceGrid from '@/components/home/ServiceGrid';
import InteractiveMap from '@/components/home/InteractiveMap';
import CorporateGovernance from '@/components/home/CorporateGovernance';
import FleetCatalog from '@/components/fleet/FleetCatalog';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  FileCheck, 
  PhoneCall, 
  Sparkles,
  Award,
  Layers,
  Search
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Core 6-Pillar Services */}
      <ServiceGrid />

      {/* 3. Fleet Showcase Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">
                Active Fleet Assets
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
                Proprietary Fleet Engineering & Technical Standards
              </h2>
              <p className="text-sm text-slate-600">
                Operating India's leading specialized fleet of 1,708+ ISO tank containers engineered for dangerous goods (DG), 
                high-purity pharmaceutical APIs, food-grade oils, and cryogenic gases.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2545] font-bold text-xs transition-colors shrink-0"
            >
              <span>Explore All Specifications</span>
              <ArrowRight className="w-4 h-4 text-[#EE964B]" />
            </Link>
          </div>

          <FleetCatalog />
        </div>
      </section>

      {/* 4. Interactive Multimodal Network Map */}
      <InteractiveMap />

      {/* 5. Corporate Governance & Investor Stability */}
      <CorporateGovernance />

      {/* 6. Final High-Impact Conversion CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#0B2545] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold font-mono text-[#EE964B] border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            INSTANT MULTIMODAL BOOKINGS & SPECIALIST CONSULTATION
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Accelerate Your Industrial Supply Chain?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect directly with our Hyderabad Central Operations Desk. Whether you require dedicated ISO tanks, 
            ocean container slots, or customs clearance across Indian ports, our experts deliver certified reliability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Launch Instant Freight Estimator</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <Link
              href="/tracker"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all"
            >
              <Search className="w-5 h-5 text-[#EE964B]" />
              <span>Track Existing Consignment</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#EE964B]" />
              <span>Dispatch Desk: <strong>+91 8125863434</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>MTO Act 1993 Reg. Carrier</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00A896]" />
              <span>IVR BBB / Stable Rated</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
