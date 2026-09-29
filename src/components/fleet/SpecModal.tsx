'use client';

import React from 'react';
import { 
  X, 
  Check, 
  Download, 
  ShieldCheck, 
  Flame, 
  Layers, 
  Gauge, 
  Scale, 
  Maximize2,
  FileText,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { FleetSpecification } from '@/lib/types';
import Link from 'next/link';

interface SpecModalProps {
  asset: FleetSpecification | null;
  onClose: () => void;
}

export default function SpecModal({ asset, onClose }: SpecModalProps) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-6 sm:p-8 flex justify-between items-start">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-[#EE964B] border border-white/20">
              {asset.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{asset.name}</h3>
            <p className="text-xs text-slate-300">
              Technical Specification Sheet • Compliant with IMDG / ISO 1496 / CSC Conventions
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Engineering Schematics Illustration Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
            <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              CAD SCHEMATIC DWG-BWL-2025
            </div>

            {/* SVG Engineering Diagram */}
            <div className="w-full h-44 flex items-center justify-center py-2">
              <svg viewBox="0 0 600 160" className="w-full h-full stroke-cyan-400/80 fill-transparent stroke-[1.5]">
                {/* Outer ISO Container Frame */}
                <rect x="20" y="15" width="560" height="130" rx="8" className="stroke-slate-600 stroke-[2] stroke-dasharray-[4,4]" />
                <rect x="35" y="25" width="530" height="110" rx="6" className="stroke-slate-700" />
                
                {/* Cylindrical Tank Body for ISO Tanks */}
                {asset.category.includes('ISO') ? (
                  <>
                    <rect x="50" y="32" width="500" height="96" rx="48" className="stroke-cyan-400 fill-cyan-950/40" />
                    {/* Baffles / Ring stiffeners */}
                    <line x1="160" y1="32" x2="160" y2="128" className="stroke-cyan-500/50 stroke-dasharray-[2,2]" />
                    <line x1="280" y1="32" x2="280" y2="128" className="stroke-cyan-500/50 stroke-dasharray-[2,2]" />
                    <line x1="400" y1="32" x2="400" y2="128" className="stroke-cyan-500/50 stroke-dasharray-[2,2]" />
                    {/* Top Manhole Dome */}
                    <circle cx="280" cy="32" r="14" className="stroke-amber-400 fill-slate-900" />
                    <rect x="260" y="16" width="40" height="10" className="stroke-amber-400 fill-amber-500/20" />
                    {/* Bottom Footvalve */}
                    <rect x="490" y="128" width="30" height="12" className="stroke-emerald-400 fill-emerald-500/20" />
                    <circle cx="505" cy="134" r="3" className="fill-emerald-400" />
                    {/* Steam heating coils loop symbol */}
                    <path d="M 100 120 Q 150 126 200 120 T 300 120 T 400 120 T 500 120" className="stroke-amber-500/60 stroke-[1.5]" />
                  </>
                ) : (
                  <>
                    {/* Dry Container Corrugations */}
                    <rect x="45" y="30" width="510" height="100" rx="4" className="stroke-blue-400 fill-blue-950/30" />
                    {[80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((x) => (
                      <line key={x} x1={x} y1="30" x2={x} y2="130" className="stroke-blue-500/30" />
                    ))}
                  </>
                )}

                {/* ISO Corner Castings */}
                <rect x="18" y="13" width="16" height="16" rx="2" className="fill-slate-500 stroke-slate-400" />
                <rect x="566" y="13" width="16" height="16" rx="2" className="fill-slate-500 stroke-slate-400" />
                <rect x="18" y="131" width="16" height="16" rx="2" className="fill-slate-500 stroke-slate-400" />
                <rect x="566" y="131" width="16" height="16" rx="2" className="fill-slate-500 stroke-slate-400" />
              </svg>
            </div>

            <div className="flex flex-wrap justify-between items-center text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <span>Overall ISO Frame: 6,058 mm (L) × 2,438 mm (W) × 2,591 mm (H)</span>
              <span className="text-[#EE964B]">Payload: {asset.payloadCapacity}</span>
            </div>
          </div>

          {/* Technical Specs Key Grid */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2545] mb-4">
              Structural & Operational Parameters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1 font-medium">Volumetric Capacity</span>
                <span className="font-extrabold text-sm text-[#0B2545] font-mono">{asset.capacity}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1 font-medium">Tare Weight</span>
                <span className="font-extrabold text-sm text-[#0B2545] font-mono">{asset.tareWeight}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1 font-medium">Max Gross Mass</span>
                <span className="font-extrabold text-sm text-[#0B2545] font-mono">{asset.maxGrossWeight}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1 font-medium">Design Working Pressure</span>
                <span className="font-extrabold text-sm text-[#0B2545] font-mono">{asset.workingPressure || 'Atmospheric'}</span>
              </div>
            </div>
          </div>

          {/* Heating & Thermal Insulation Details */}
          {(asset.heatingSystem || asset.insulation) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {asset.heatingSystem && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1">
                    <Flame className="w-4 h-4 text-[#EE964B]" />
                    Heating & Thermal System
                  </h5>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {asset.heatingSystem}
                  </p>
                </div>
              )}
              {asset.insulation && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-1">
                    <Layers className="w-4 h-4 text-[#134074]" />
                    Insulation & Outer Cladding
                  </h5>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {asset.insulation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Suitable Commodities */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2545] mb-3">
              Approved Compatible Chemical & Cargo Profiles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {asset.suitableCargo.map((cargo) => (
                <div key={cargo} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{cargo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B2545] mb-3">
              Key Engineering & Safety Features
            </h4>
            <div className="space-y-2">
              {asset.features.map((feat) => (
                <div key={feat} className="text-xs text-slate-700 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#EE964B] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications row */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Certifications:</span>
            {asset.certifications.map((c) => (
              <span key={c} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold">
                {c}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => {
                alert(`Technical specification sheet for ${asset.name} saved. PDF generation ready.`);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-[#0B2545]" />
              <span>Download Engineering Spec Sheet (PDF)</span>
            </button>

            <Link
              href={`/quote?mode=${asset.category.includes('ISO') ? 'ISO_TANK' : 'OCEAN_FCL'}`}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Instant Quote for this Fleet Type</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
