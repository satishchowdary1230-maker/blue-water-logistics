import React from 'react';
import Link from 'next/link';
import { 
  Anchor, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#051326] text-slate-300 border-t border-navy-800">
      {/* Upper Accreditations Strip */}
      <div className="border-b border-white/10 bg-[#0B2545]/70 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Institutional Accreditations, Memberships & Regulatory Certifications
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {BWL_CORPORATE_INFO.accreditations.map((item) => (
              <div 
                key={item.title} 
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#EE964B]/40 hover:bg-white/10 transition-all flex flex-col items-center justify-center"
              >
                <Award className="w-5 h-5 text-[#EE964B] mb-2" />
                <span className="font-bold text-white text-xs sm:text-sm">{item.title}</span>
                <span className="text-[11px] text-slate-400 mt-1">{item.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#134074] to-[#00A896] flex items-center justify-center text-white shadow-md">
                <Anchor className="w-5 h-5 text-[#EE964B]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">BLUE WATER LOGISTICS</h3>
                <p className="text-xs text-slate-400 font-semibold tracking-wider">LIMITED • EST. 2010</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Blue Water Logistics Limited is a premier Indian multimodal transport operator registered under the 
              MTO Act 1993, managing an active fleet of 1,708+ ISO tank containers, intermodal rail wagons, and 
              global ocean NVOCC networks.
            </p>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Corporate Identity No (CIN):</span>
                <span className="text-white font-bold">{BWL_CORPORATE_INFO.cin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Credit Rating:</span>
                <span className="text-amber-400 font-bold">IVR BBB / Stable (Infomerics)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">MTO Registration:</span>
                <span className="text-emerald-400">{BWL_CORPORATE_INFO.mtoRegNumber}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Multimodal Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services?tab=iso-tank" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  ISO Tank Logistics (Bulk)
                </Link>
              </li>
              <li>
                <Link href="/services?tab=ocean-freight" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Ocean Freight (FCL/LCL)
                </Link>
              </li>
              <li>
                <Link href="/services?tab=air-freight" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Air Freight (IATA Cold Chain)
                </Link>
              </li>
              <li>
                <Link href="/services?tab=rail-surface" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Intermodal Rail & Surface
                </Link>
              </li>
              <li>
                <Link href="/services?tab=customs-cha" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Customs Clearance (CHA)
                </Link>
              </li>
              <li>
                <Link href="/services?tab=warehousing-vas" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Warehousing & Value-Added
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Tools & Governance */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Platform & Governance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tracker" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Live Container Tracker
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Instant Freight Estimator
                </Link>
              </li>
              <li>
                <Link href="/governance" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Board of Directors
                </Link>
              </li>
              <li>
                <Link href="/governance#investor-desk" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  Investor Relations & Disclosures
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  ESG & Green Fleet Decarbonization
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#EE964B] transition-colors flex items-center gap-1.5 text-amber-300">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  Operations Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Head Office & Contacts */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-2">
              Registered Head Office
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EE964B] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {BWL_CORPORATE_INFO.registeredOffice.addressLine1},<br />
                  {BWL_CORPORATE_INFO.registeredOffice.addressLine2},<br />
                  {BWL_CORPORATE_INFO.registeredOffice.city}, {BWL_CORPORATE_INFO.registeredOffice.state} - {BWL_CORPORATE_INFO.registeredOffice.pincode}
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#00A896] shrink-0" />
                <div>
                  <a href={`tel:${BWL_CORPORATE_INFO.contacts.primaryPhone}`} className="hover:text-white block font-medium">
                    {BWL_CORPORATE_INFO.contacts.primaryPhone}
                  </a>
                  <a href={`tel:${BWL_CORPORATE_INFO.contacts.secondaryPhone}`} className="hover:text-white block font-medium">
                    {BWL_CORPORATE_INFO.contacts.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EE964B] shrink-0" />
                <div>
                  <a href={`mailto:${BWL_CORPORATE_INFO.contacts.generalEmail}`} className="hover:text-white block">
                    {BWL_CORPORATE_INFO.contacts.generalEmail}
                  </a>
                  <a href={`mailto:${BWL_CORPORATE_INFO.contacts.supportEmail}`} className="hover:text-white block text-slate-400">
                    {BWL_CORPORATE_INFO.contacts.supportEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-white/10">
                <span className="font-semibold text-white">Port & ICD Hubs:</span> JNPT Mumbai, Chennai, Mundra, Vizag, Kolkata, ICD Sanathnagar, ICD Thimmapur.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {currentYear} Blue Water Logistics Limited. All rights reserved. Registered under Indian Companies Act.</p>
          <div className="flex items-center gap-6">
            <Link href="/governance" className="hover:text-white transition-colors">Corporate Governance</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Port Offices Directory</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Compliance</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Standard Trading Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
