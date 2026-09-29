import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Users, 
  FileText, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';
import Link from 'next/link';

export default function GovernancePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B2545] text-xs font-bold font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#EE964B]" />
            PUBLIC COMPANY 2025 • CIN: {BWL_CORPORATE_INFO.cin}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Corporate Governance & Investor Relations
          </h1>
          <p className="text-sm text-slate-600">
            Founded in 2010 and operating under the Multimodal Transportation of Goods Act 1993, 
            Blue Water Logistics Limited is governed by an experienced board committed to fiscal prudence and institutional transparency.
          </p>
        </div>

        {/* Corporate Statutory Snapshot */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#0B2545] mb-6 border-b border-slate-100 pb-3">
            Statutory Company Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Company Name</span>
              <p className="font-extrabold text-sm text-[#0B2545]">{BWL_CORPORATE_INFO.companyName}</p>
              <span className="text-[11px] text-slate-400">Class: Public Limited Company (2025)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Corporate Identity No.</span>
              <p className="font-mono font-extrabold text-sm text-[#0B2545]">{BWL_CORPORATE_INFO.cin}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">ROC Hyderabad • Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">MTO Registration</span>
              <p className="font-mono font-extrabold text-sm text-[#0B2545]">MTO/DGS/2012/1048</p>
              <span className="text-[11px] text-slate-400">Directorate General of Shipping</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Credit Rating</span>
              <p className="font-extrabold text-sm text-amber-600">IVR BBB / Stable</p>
              <span className="text-[11px] text-slate-400">Infomerics Valuation and Rating</span>
            </div>
          </div>
        </div>

        {/* Registered Corporate Headquarters & Command Centre */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative h-72 lg:h-full min-h-[300px] bg-slate-900">
            <img
              src="/images/hq-banjara.jpg"
              alt="Blue Water Logistics Headquarters, Uptown Banjara, Hyderabad"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-1 rounded bg-[#0B2545]/90 border border-white/20 text-[10px] font-mono font-bold">
                ROC HYDERABAD • CENTRAL HQ
              </span>
              <h4 className="text-base font-black mt-1">Uptown Banjara Commercial Center</h4>
              <p className="text-xs text-slate-300">Road No. 3, Banjara Hills, Hyderabad, Telangana 500034</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 space-y-4">
            <span className="text-xs font-mono font-bold text-[#EE964B] uppercase tracking-wider">
              OPERATIONAL COMMAND & STATUTORY SEAT
            </span>
            <h3 className="text-2xl font-black text-[#0B2545]">
              Executive Headquarters & Multimodal Dispatch Center
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Located in the commercial heart of Hyderabad at Uptown Banjara, Blue Water Logistics Limited houses its centralized 24/7 multimodal tracking gateway, corporate treasury, board secretariat, and regulatory compliance departments under one roof.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">CIN Registration</span>
                <span className="font-mono font-bold text-[#0B2545]">{BWL_CORPORATE_INFO.cin}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">MTO Act 1993 License</span>
                <span className="font-mono font-bold text-[#EE964B]">MTO/DGS/2012/1048</span>
              </div>
            </div>
          </div>
        </div>

        {/* Board of Directors & Promoters */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-[#0B2545]">Board of Directors & Key Promoters</h2>
              <p className="text-xs text-slate-500">Executive leadership driving fleet scaling and multimodal modernization</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BWL_CORPORATE_INFO.promotersAndBoard.map((director) => (
              <div
                key={director.name}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center font-black text-xl shadow-md">
                      {director.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold">
                      DIN: {director.din}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2545]">{director.name}</h3>
                  <p className="text-xs font-semibold text-[#EE964B] mt-0.5">{director.designation}</p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                    {director.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Compliant with Companies Act 2013
                  </span>
                  <span>Board Member</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Committees & Corporate Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-[#0B2545] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#EE964B]" />
              <span>Audit & Risk Committee</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Oversight of financial reporting, external audit rigor, internal control frameworks, and currency hedging for global maritime contracts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-[#0B2545] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00A896]" />
              <span>Nomination & Remuneration</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensures competitive executive compensation aligned with long-term shareholder value creation and technical talent retention in multimodal logistics.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-[#0B2545] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#134074]" />
              <span>ESG & Sustainability Board</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Governs fleet carbon abatement, Zero Liquid Discharge (ZLD) tank cleaning standards, and workplace safety across chemical handling depots.
            </p>
          </div>
        </div>

        {/* Investor Relations Contact Desk */}
        <div id="investor-desk" className="bg-[#0B2545] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#EE964B] px-3 py-1 rounded-full bg-white/10">
              INVESTOR GRIEVANCES & SHAREHOLDER SECRETARIAT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">Dedicated Shareholder Liaison</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For financial report inquiries, shareholding disclosures, and statutory communications:
            </p>
            <div className="space-y-1.5 text-xs font-medium text-slate-200 pt-2">
              <p>Email: <a href="mailto:investors@bwl.co.in" className="text-[#EE964B] underline">investors@bwl.co.in</a></p>
              <p>Corporate Desk: +91 8125863434 / +91 8341101774</p>
              <p>Address: 8-2-270/B/1/2, Block-3, 4th Floor, Uptown Banjara, Road No. 3, Banjara Hills, Hyderabad 500034</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-bold text-xs text-center shadow-lg transition-all"
            >
              Contact Corporate Secretariat
            </Link>
            <Link
              href="/quote"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs text-center transition-all"
            >
              Commercial Consignment Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
