'use client';

import React, { useState } from 'react';
import { 
  Leaf, 
  Train, 
  Droplets, 
  Recycle, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  const [cargoTonnage, setCargoTonnage] = useState(250);
  const [distanceKm, setDistanceKm] = useState(850);

  // Carbon calculation: Road is approx 0.089 kg CO2 per ton-km; Rail is approx 0.028 kg CO2 per ton-km
  const roadEmissionsKg = Math.round(cargoTonnage * distanceKm * 0.089);
  const railEmissionsKg = Math.round(cargoTonnage * distanceKm * 0.028);
  const co2SavedKg = roadEmissionsKg - railEmissionsKg;
  const percentSaved = Math.round((co2SavedKg / roadEmissionsKg) * 100);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            ESG CHARTER & ENVIRONMENTAL STEWARDSHIP
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Sustainable & Decarbonized Multimodal Supply Chains
          </h1>
          <p className="text-sm text-slate-600">
            Pioneering modal-shift to intermodal rail freight, Zero Liquid Discharge (ZLD) ISO tank circularity, 
            and carbon footprint abatement across Indian supply corridors.
          </p>
        </div>

        {/* 4 Pillars of Sustainable Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#0B2545]">Rail Modal Shift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transitioning high-density chemical corridors from long-haul highway trucking to electric container rail lines, achieving up to 68% emissions reduction.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#0B2545]">Zero Liquid Discharge (ZLD)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proprietary ISO tank cleaning stations featuring biological water recycling, multi-stage filtration, and vapor scrubber condensation systems.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#EE964B] flex items-center justify-center border border-amber-100">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#0B2545]">Circular Tank Packaging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              One 26,000L ISO Tank replaces 130 single-use 200L steel drums and plastic IBC totes, preventing millions of kilograms of packaging waste.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#0B2545]">Empty-Mile Elimination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI-assisted dispatch telematics match return chemical cargo with export corridors, slashing non-revenue empty-haul deadweight travel.
            </p>
          </div>
        </div>

        {/* Interactive Carbon Abatement Calculator */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600">INTERACTIVE MULTIMODAL SIMULATOR</span>
              <h3 className="text-2xl font-black text-[#0B2545]">Consignment Carbon Savings Calculator</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Based on GHG Protocol & Indian Railways Carbon Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Sliders */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Monthly Cargo Volume</span>
                  <span className="text-[#0B2545] font-mono text-sm">{cargoTonnage} Metric Tons</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={cargoTonnage}
                  onChange={(e) => setCargoTonnage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>50 MT</span>
                  <span>1,000 MT</span>
                  <span>2,000 MT</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Corridor Transit Distance</span>
                  <span className="text-[#0B2545] font-mono text-sm">{distanceKm} Kilometers</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>200 km (Short Haul)</span>
                  <span>850 km (JNPT to HYD)</span>
                  <span>2,500 km (Pan-India)</span>
                </div>
              </div>
            </div>

            {/* Results Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#134074] text-white flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  Estimated Carbon Abatement
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-white">
                  {co2SavedKg.toLocaleString()} <span className="text-xl font-normal text-emerald-300">kg CO2e</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Transitioning this route to BWL Intermodal Rail rakes avoids <strong>{percentSaved}%</strong> of 
                  carbon emissions compared to standard diesel highway transport ({roadEmissionsKg.toLocaleString()} kg CO2e).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-slate-300">Equivalent to planting:</span>
                <span className="font-bold text-emerald-300 font-mono">
                  {Math.round(co2SavedKg / 22)} Mature Trees / Year
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/quote?mode=RAIL_CARGO"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Book Green Intermodal Consignment</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
