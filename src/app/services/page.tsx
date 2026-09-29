import React from 'react';
import FleetCatalog from '@/components/fleet/FleetCatalog';
import { CORE_SERVICES_DATA } from '@/lib/seedData';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Anchor, 
  Plane, 
  Train, 
  FileCheck, 
  Warehouse, 
  Check, 
  ArrowRight,
  Gauge,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

const iconMap = {
  ShieldAlert: Gauge,
  Anchor: Anchor,
  Plane: Plane,
  Train: Train,
  FileCheck: FileCheck,
  Warehouse: Warehouse,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B2545] text-xs font-bold font-mono">
            <Award className="w-3.5 h-3.5 text-[#EE964B]" />
            MTO ACT 1993 • PAN-INDIA & GLOBAL MULTIMODAL OPERATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Integrated Services & Fleet Catalog
          </h1>
          <p className="text-sm text-slate-600">
            Engineered logistics solutions across bulk hazardous chemicals, pharmaceutical cold chains, 
            ocean container lines, and high-speed intermodal rail rakes.
          </p>
        </div>

        {/* 6 Core Services Deep Dive Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-[#0B2545]">Core Multimodal Service Verticals</h2>
            <p className="text-xs text-slate-500">Certified by IATA, FIATA, and Directorate General of Shipping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES_DATA.map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Anchor;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B2545] flex items-center justify-center border border-blue-100">
                        <IconComponent className="w-6 h-6 text-[#134074]" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {service.stats}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B2545] mb-2">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{service.shortDesc}</p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/quote?service=${service.id}`}
                      className="px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>Quote Consignment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EE964B]" />
                    </Link>

                    <Link
                      href="/tracker"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Track Active Run
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Fleet Catalog Section */}
        <div className="space-y-8 pt-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545]">
                Fleet Engineering & Technical Equipment Catalog
              </h2>
              <p className="text-xs text-slate-500">
                Detailed dimensions, volumetric capacities, test pressures, and hazardous class ratings
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#EE964B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Active Inventory: 1,708+ ISO Tanks
            </span>
          </div>

          <FleetCatalog />
        </div>
      </div>
    </div>
  );
}
