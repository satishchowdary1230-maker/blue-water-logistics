'use client';

import React, { Suspense } from 'react';
import FreightEstimator from '@/components/quote/FreightEstimator';
import { Calculator, ShieldCheck, Award, Clock } from 'lucide-react';

export default function QuotePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
            <Calculator className="w-3.5 h-3.5 text-[#EE964B]" />
            INSTANT MULTIMODAL PROFORMA FREIGHT CALCULATOR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Commercial Freight Estimator
          </h1>
          <p className="text-sm text-slate-600">
            Generate itemized estimates across ISO Tanks, dry containers, air express, and rail rakes with instant consignment booking.
          </p>
        </div>

        {/* Wizard Estimator */}
        <Suspense fallback={<div className="p-16 text-center text-slate-500 font-semibold">Loading Costing Engine...</div>}>
          <FreightEstimator />
        </Suspense>

        {/* Commercial Terms & Rate Transparency Notice */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-4 text-xs text-slate-600">
          <h4 className="font-extrabold text-sm text-[#0B2545] uppercase tracking-wider">
            Commercial Terms & Rate Governance
          </h4>
          <p className="leading-relaxed">
            All instant quotes generated are valid for 14 calendar days from the date of quotation and subject to equipment availability 
            at the nominated port/depot. Rates include statutory insurance estimates, terminal handling (THC), and are governed by 
            standard Multimodal Transport Operator (MTO Act 1993) liability clauses. Custom detention and demurrage terms for high-volume 
            industrial chemical shippers can be negotiated with our Hyderabad Central Operations Desk.
          </p>
        </div>
      </div>
    </div>
  );
}
