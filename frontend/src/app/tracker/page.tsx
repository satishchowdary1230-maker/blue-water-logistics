'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShipmentTracker from '@/components/tracking/ShipmentTracker';
import { ShieldCheck, Clock, MapPin, Award } from 'lucide-react';

function TrackerContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('q') || 'BWLU104829';

  return <ShipmentTracker initialTrackingId={initialId} />;
}

export default function TrackerPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb & Title strip */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B2545] text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ICEGATE EDI & SATELLITE IOT TELEMETRY INTERFACE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Consignment Tracking Portal
          </h1>
          <p className="text-sm text-slate-600">
            Query real-time status across coastal port gates, customs milestones, and GPS temperature/pressure data.
          </p>
        </div>

        {/* Tracker Widget wrapped in Suspense for App Router URL searchParams */}
        <Suspense fallback={
          <div className="p-16 text-center text-slate-500 font-semibold">
            Connecting to Multimodal Gateway...
          </div>
        }>
          <TrackerContent />
        </Suspense>

        {/* Informative Guidance & Milestones Explainer */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-6xl mx-auto space-y-6">
          <h3 className="font-extrabold text-lg text-[#0B2545] border-b border-slate-100 pb-3">
            Understanding Your Multimodal Milestone Progression
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-[#0B2545] block">1. Booking Confirmed</span>
              <p className="text-slate-600 leading-relaxed">
                Equipment allocated, pre-trip inspection (PTI) passed, and transport work order issued.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-[#0B2545] block">2. Customs Cleared</span>
              <p className="text-slate-600 leading-relaxed">
                ICEGATE documentation, Let Export Order (LEO), ADC pharma NOC or DG classification cleared.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-[#0B2545] block">3. In Transit</span>
              <p className="text-slate-600 leading-relaxed">
                Loaded on international ocean vessel, high-speed rail rake, or interstate trailer corridor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-[#0B2545] block">4. Out for Delivery</span>
              <p className="text-slate-600 leading-relaxed">
                Discharged at destination port/ICD hub, transferred to last-mile trailer for factory delivery.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-[#0B2545] block">5. Delivered</span>
              <p className="text-slate-600 leading-relaxed">
                Cargo safely decanted or unstuffed, e-POD electronic proof of delivery signed and archived.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
