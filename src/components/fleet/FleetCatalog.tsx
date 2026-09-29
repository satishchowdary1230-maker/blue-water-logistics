'use client';

import React, { useState } from 'react';
import { 
  Gauge, 
  Anchor, 
  Thermometer, 
  Plane, 
  FileText, 
  Check, 
  ChevronRight, 
  Maximize2,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { FLEET_SPECIFICATIONS } from '@/lib/seedData';
import { FleetSpecification } from '@/lib/types';
import SpecModal from './SpecModal';
import Link from 'next/link';

export default function FleetCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<FleetSpecification | null>(null);

  const categories = [
    'All',
    'ISO Tank Container',
    'Ocean Dry Container',
    'Special Equipment',
    'Air Cargo ULD',
  ];

  const filteredAssets = activeCategory === 'All'
    ? FLEET_SPECIFICATIONS
    : FLEET_SPECIFICATIONS.filter((a) => a.category === activeCategory);

  return (
    <div className="w-full space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-[#0B2545] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat === 'All' ? 'All Fleet Assets (1,708+ Tanks)' : cat}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Card Header with Category & Graphic Badge */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-slate-100 relative">
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-[#0B2545]/10 text-[#0B2545] text-[11px] font-bold font-mono">
                  {asset.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Certified Active Fleet
                </span>
              </div>

              <h4 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-[#134074] transition-colors">
                {asset.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {asset.suitableCargo.slice(0, 2).join(', ')}...
              </p>
            </div>

            {/* Technical Specifications Highlights */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Volumetric Size</span>
                  <span className="font-extrabold text-[#0B2545] font-mono text-sm">{asset.capacity}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Max Payload</span>
                  <span className="font-extrabold text-[#0B2545] font-mono text-sm">{asset.payloadCapacity}</span>
                </div>
              </div>

              {/* Working Pressure & Hazard Info */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-500">Working Pressure:</span>
                  <span className="font-mono font-bold text-slate-800">{asset.workingPressure || '1.0 Bar'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-500">Tare Weight:</span>
                  <span className="font-mono font-bold text-slate-800">{asset.tareWeight}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-500">Hazard Class:</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] truncate max-w-[170px]">
                    {asset.hazardRating}
                  </span>
                </div>
              </div>

              {/* Key Features Bullets */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                {asset.features.slice(0, 2).map((feat) => (
                  <div key={feat} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EE964B] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedAsset(asset)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:border-[#0B2545] hover:bg-slate-50 text-xs font-bold text-[#0B2545] transition-all flex items-center justify-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Specs</span>
              </button>

              <Link
                href={`/quote?asset=${asset.id}`}
                className="py-2.5 px-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Quote</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#EE964B]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Spec Modal */}
      <SpecModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}
