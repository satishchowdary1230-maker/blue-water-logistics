'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Anchor, Train, Building2, Globe2, ChevronRight, Check } from 'lucide-react';
import { NETWORK_HUBS } from '@/lib/seedData';
import Link from 'next/link';

export default function InteractiveMap() {
  const [selectedHub, setSelectedHub] = useState(NETWORK_HUBS[0]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">
            Strategic Multimodal Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            Connecting Indian Industrial Hubs with Global Trade Corridors
          </h2>
          <p className="text-sm text-slate-600">
            From our Corporate Command Center in Banjara Hills, Hyderabad to key coastal deep-water ports 
            and dedicated intermodal rail corridors.
          </p>
        </div>

        {/* Map Layout View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Network Schematic Diagram */}
          <div className="lg:col-span-7 bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-navy-800">
            <div className="absolute top-4 right-4 text-[11px] font-mono text-cyan-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
              PAN-INDIA MULTIMODAL MESH
            </div>

            {/* SVG Network Schematic */}
            <div className="relative w-full h-[380px] flex items-center justify-center">
              <svg viewBox="0 0 500 400" className="w-full h-full stroke-slate-500/40 fill-none stroke-[1.5]">
                {/* Coastal Outline Representation */}
                <path 
                  d="M 120 70 L 140 140 L 120 180 L 150 260 L 220 360 L 270 320 L 320 250 L 350 180 L 380 140 L 320 80 Z" 
                  className="stroke-cyan-500/20 fill-cyan-950/20 stroke-[2] stroke-dasharray-[4,4]" 
                />

                {/* Connecting Rail & Highway Corridors */}
                {/* JNPT to Hyderabad */}
                <line x1="145" y1="205" x2="250" y2="230" className="stroke-[#EE964B] stroke-[2] stroke-dasharray-[3,3]" />
                {/* Chennai to Hyderabad */}
                <line x1="285" y1="295" x2="250" y2="230" className="stroke-[#00A896] stroke-[2] stroke-dasharray-[3,3]" />
                {/* Mundra to Delhi & Hyderabad */}
                <line x1="130" y1="135" x2="250" y2="230" className="stroke-blue-400 stroke-[2] stroke-dasharray-[3,3]" />
                {/* Vizag to Hyderabad */}
                <line x1="330" y1="225" x2="250" y2="230" className="stroke-teal-400 stroke-[2] stroke-dasharray-[3,3]" />

                {/* International Maritime Lines */}
                <path d="M 145 205 Q 80 250 40 280" className="stroke-amber-400/40 stroke-dasharray-[4,4]" />
                <path d="M 285 295 Q 360 340 440 370" className="stroke-cyan-400/40 stroke-dasharray-[4,4]" />

                {/* Port Nodes */}
                {/* Mundra */}
                <circle cx="130" cy="135" r="6" className="fill-[#EE964B] stroke-white stroke-[2]" />
                <text x="140" y="132" fill="#CBD5E1" fontSize="10" fontWeight="bold">Mundra</text>

                {/* JNPT Mumbai */}
                <circle cx="145" cy="205" r="7" className="fill-[#EE964B] stroke-white stroke-[2]" />
                <text x="75" y="210" fill="#CBD5E1" fontSize="10" fontWeight="bold">JNPT (Mumbai)</text>

                {/* Chennai */}
                <circle cx="285" cy="295" r="6" className="fill-teal-400 stroke-white stroke-[2]" />
                <text x="295" y="302" fill="#CBD5E1" fontSize="10" fontWeight="bold">Chennai</text>

                {/* Vizag */}
                <circle cx="330" cy="225" r="6" className="fill-teal-400 stroke-white stroke-[2]" />
                <text x="340" y="228" fill="#CBD5E1" fontSize="10" fontWeight="bold">Visakhapatnam</text>

                {/* Kolkata */}
                <circle cx="370" cy="140" r="6" className="fill-blue-400 stroke-white stroke-[2]" />
                <text x="380" y="142" fill="#CBD5E1" fontSize="10" fontWeight="bold">Kolkata</text>

                {/* HYDERABAD CENTRAL HQ (Pulsing God Node) */}
                <circle cx="250" cy="230" r="14" className="fill-[#EE964B]/20 animate-ping" />
                <circle cx="250" cy="230" r="9" className="fill-[#EE964B] stroke-white stroke-[2.5]" />
                <text x="220" y="258" fill="#EE964B" fontSize="11" fontWeight="900">HYDERABAD HQ</text>
                <text x="212" y="270" fill="#94A3B8" fontSize="8" fontFamily="monospace">ICD Sanathnagar</text>
              </svg>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EE964B]"></span>
                Hyderabad Central Intermodal Hub
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                Deep-Water Container Terminals
              </span>
            </div>
          </div>

          {/* Hub Selector & Port Capabilities */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-lg text-[#0B2545] flex items-center gap-2">
              <Anchor className="w-5 h-5 text-[#EE964B]" />
              <span>Gateway Hub Directory</span>
            </h3>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2">
              {NETWORK_HUBS.map((hub) => {
                const isSelected = selectedHub.name === hub.name;

                return (
                  <div
                    key={hub.name}
                    onClick={() => setSelectedHub(hub)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#0B2545] shadow-md ring-1 ring-[#0B2545]/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#EE964B]' : 'text-slate-400'}`} />
                        <h4 className="font-bold text-sm text-[#0B2545]">{hub.name}</h4>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-[#0B2545] text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {hub.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-6.5 leading-relaxed">
                      {hub.role}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Port Office Contacts</span>
                <ChevronRight className="w-4 h-4 text-[#EE964B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
