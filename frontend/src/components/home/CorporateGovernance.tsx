import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, TrendingUp, Users, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function CorporateGovernance() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">
            Public Enterprise Governance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            Leadership, Compliance & Institutional Credibility
          </h2>
          <p className="text-sm text-slate-600">
            Founded in 2010 and operating under the Multimodal Transportation of Goods Act 1993, 
            Blue Water Logistics maintains investment-grade stability and rigorous regulatory compliance.
          </p>
        </div>

        {/* Board of Directors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BWL_CORPORATE_INFO.promotersAndBoard.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B2545] flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-extrabold text-base text-[#0B2545]">{member.name}</h3>
                <p className="text-xs font-semibold text-[#EE964B] mt-0.5">{member.designation}</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>DIN: {member.din}</span>
                <span className="text-emerald-600 font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Head Office & Compliance Showcase Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-16 items-center">
          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[240px] bg-slate-900">
            <img 
              src="/images/hq-banjara.jpg" 
              alt="Blue Water Logistics Corporate Headquarters Hyderabad" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EE964B] text-white">
                REGISTERED SEAT • HYDERABAD
              </span>
              <p className="text-xs font-bold text-white mt-1">Uptown Banjara, Road No. 3, Banjara Hills</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#0B2545] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                CIN: {BWL_CORPORATE_INFO.cin}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                MTO/DGS/2012/1048
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2545]">
              Institutional Infrastructure Backed by Concrete Physical Assets
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Operating under statutory oversight of the Directorate General of Shipping and audited by independent statutory auditors, 
              BWL bridges high-growth multimodal trade corridors across 140+ international ports and 1,708+ specialized ISO tank containers.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#134074]">
              <Link href="/governance" className="hover:text-[#EE964B] flex items-center gap-1">
                <span>View Full Governance Charters</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Trust & Credit Rating Strip */}
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-mono font-bold text-[#EE964B] px-2.5 py-1 rounded bg-white/10">
              INFOMERICS CREDIT RATING
            </span>
            <h3 className="text-2xl font-black">IVR BBB / Stable (Investment Grade)</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Affirming BWL’s robust balance sheet, expanding asset-backed 1,708+ ISO tank fleet, 
              and sustained long-term institutional cash flows across major Indian pharmaceutical and chemical sectors.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              href="/governance"
              className="px-6 py-3.5 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <span>Investor Desk & Financials</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>Corporate Secretariat</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
