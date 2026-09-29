import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Anchor, 
  Plane, 
  Train, 
  FileCheck, 
  Warehouse, 
  ChevronRight, 
  Check, 
  ArrowRight,
  Gauge
} from 'lucide-react';
import { CORE_SERVICES_DATA } from '@/lib/seedData';

const iconMap = {
  ShieldAlert: Gauge,
  Anchor: Anchor,
  Plane: Plane,
  Train: Train,
  FileCheck: FileCheck,
  Warehouse: Warehouse,
};

export default function ServiceGrid() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">
              Integrated Supply Chain Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Six Pillars of Multimodal Excellence
            </h2>
            <p className="text-sm text-slate-600">
              Approved multimodal transport solutions spanning specialized bulk liquid ISO tank containerization, 
              global ocean freight forwarding, time-critical air express, and domestic rail rakes.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2545] hover:text-[#134074] group"
          >
            <span>View All Engineering Specifications</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#EE964B]" />
          </Link>
        </div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Anchor;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Photorealistic Service Photograph Header */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-6 shadow-inner bg-slate-100">
                    <img 
                      src={service.image || '/images/hero-port.jpg'} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#0B2545] flex items-center justify-center shadow-md">
                        <IconComponent className="w-5 h-5 text-[#0B2545]" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {service.stats}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-[#0B2545] group-hover:text-[#134074] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Key Features */}
                  <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] hover:text-[#EE964B] transition-colors"
                  >
                    <span>Technical Specs & Booking</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#EE964B]" />
                  </Link>

                  <Link
                    href={`/quote?service=${service.id}`}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900"
                  >
                    Get Estimate
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
