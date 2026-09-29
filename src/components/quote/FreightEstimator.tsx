'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  MapPin, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Leaf, 
  Clock, 
  FileText, 
  Send, 
  Sparkles,
  Plane,
  Train,
  Anchor,
  Gauge,
  HelpCircle,
  PhoneCall,
  DollarSign
} from 'lucide-react';
import { formatInr, formatUsd } from '@/lib/utils';
import { FreightEstimateRequest, FreightEstimateResponse } from '@/lib/types';

const TRADE_LOCATIONS = [
  { city: 'Hyderabad (ICD Sanathnagar / RGIA Air)', region: 'Telangana, India', hub: 'Domestic Central' },
  { city: 'JNPT Nhava Sheva (Mumbai)', region: 'Maharashtra, India', hub: 'Western Ocean Gateway' },
  { city: 'Chennai Port & Ennore', region: 'Tamil Nadu, India', hub: 'Eastern Ocean Gateway' },
  { city: 'Mundra Port (Kutch)', region: 'Gujarat, India', hub: 'North-West Maritime Gateway' },
  { city: 'Delhi NCR (ICD Tughlakabad)', region: 'Delhi, India', hub: 'Northern Rail Hub' },
  { city: 'Visakhapatnam Port (Vizag)', region: 'Andhra Pradesh, India', hub: 'East Coast Bulk Gateway' },
  { city: 'Kolkata & Haldia Port', region: 'West Bengal, India', hub: 'North-East Hub' },
  { city: 'Dubai (Jebel Ali Port / DXB Air)', region: 'United Arab Emirates', hub: 'Middle East Gateway' },
  { city: 'Singapore (Jurong Port / SIN Air)', region: 'Singapore', hub: 'Southeast Asia Hub' },
  { city: 'Rotterdam Port (Maasvlakte)', region: 'Netherlands', hub: 'European Chemical Corridor' },
  { city: 'Houston Port (Bayport)', region: 'Texas, USA', hub: 'North America Petrochem' },
];

export default function FreightEstimator() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [origin, setOrigin] = useState('JNPT Nhava Sheva (Mumbai)');
  const [destination, setDestination] = useState('Hyderabad (ICD Sanathnagar / RGIA Air)');
  const [mode, setMode] = useState<'ISO_TANK' | 'OCEAN_FCL' | 'AIR_FREIGHT' | 'RAIL_CARGO'>('ISO_TANK');
  const [cargoType, setCargoType] = useState('Specialty Chemicals / Solvents');
  const [weightMt, setWeightMt] = useState(24);
  const [temperatureControlled, setTemperatureControlled] = useState(false);
  const [hazardousCargo, setHazardousCargo] = useState(true);
  const [hazardClass, setHazardClass] = useState('IMO Class 3 (Flammable Liquid)');
  const [customsAssistanceRequired, setCustomsAssistanceRequired] = useState(true);

  // Quote Result State
  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteResult, setQuoteResult] = useState<FreightEstimateResponse | null>(null);

  // Booking / Lead Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calculateFreightQuote = async () => {
    setIsCalculating(true);
    try {
      const payload: FreightEstimateRequest = {
        origin,
        destination,
        mode,
        cargoType,
        weightMt: Number(weightMt),
        temperatureControlled,
        hazardousCargo,
        hazardClass: hazardousCargo ? hazardClass : undefined,
        customsAssistanceRequired,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.quote) {
        setQuoteResult(data.quote);
        setCurrentStep(4);
      }
    } catch (err) {
      console.error('Calculation failed:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !phone) return;

    setIsSubmittingBooking(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
          cargoType: `${cargoType} (${mode})`,
          origin,
          destination,
          quoteReference: quoteResult?.quoteReference,
          message: `Consignment Booking Request from Freight Estimator. Estimated Value: ${quoteResult ? formatInr(quoteResult.totalInr) : 'Custom'}. Weight: ${weightMt} MT. Mode: ${mode}. Notes: ${additionalNotes || 'N/A'}`
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
      }
    } catch (err) {
      console.error('Booking submission failed:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Wizard Step Indicators */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-0 -translate-y-1/2"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#0B2545] -z-0 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>

          {[
            { step: 1, label: 'Origin & Dest' },
            { step: 2, label: 'Mode' },
            { step: 3, label: 'Cargo Specs' },
            { step: 4, label: 'Instant Quote' },
          ].map((s) => {
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  if (s.step < currentStep || quoteResult) {
                    setCurrentStep(s.step as 1 | 2 | 3 | 4);
                  }
                }}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#0B2545] text-white ring-4 ring-blue-100'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5 text-white" /> : s.step}
                </div>
                <span className={`text-xs mt-2 font-bold ${isCurrent ? 'text-[#0B2545]' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10">
        {/* STEP 1: ROUTING */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">Step 1 of 4</span>
              <h3 className="text-2xl font-black text-[#0B2545]">Select Trade Route & Gateway</h3>
              <p className="text-sm text-slate-600">
                Choose domestic multimodal hubs, port CFS, or global ocean/air gateways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Origin */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#EE964B]" />
                  Port / City of Origin (Loading Point)
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#134074] focus:outline-none font-semibold text-slate-800 text-sm bg-slate-50/50"
                >
                  {TRADE_LOCATIONS.map((loc) => (
                    <option key={`orig-${loc.city}`} value={loc.city}>
                      {loc.city} ({loc.hub})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 block">
                  Includes first-mile container stuffing and trailer haulage.
                </span>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Port / City of Destination (Discharge Point)
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#134074] focus:outline-none font-semibold text-slate-800 text-sm bg-slate-50/50"
                >
                  {TRADE_LOCATIONS.map((loc) => (
                    <option key={`dest-${loc.city}`} value={loc.city}>
                      {loc.city} ({loc.hub})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 block">
                  Includes last-mile delivery to consignee warehouse / factory.
                </span>
              </div>
            </div>

            {/* Quick Route Preview */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0B2545]">
              <span className="truncate max-w-[40%] font-bold">{origin.split(' (')[0]}</span>
              <div className="flex items-center gap-2 text-slate-400 shrink-0 px-2">
                <span className="h-0.5 w-6 bg-slate-300"></span>
                <ArrowRight className="w-4 h-4 text-[#EE964B]" />
                <span className="h-0.5 w-6 bg-slate-300"></span>
              </div>
              <span className="truncate max-w-[40%] text-right font-bold">{destination.split(' (')[0]}</span>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Transport Mode</span>
                <ArrowRight className="w-4 h-4 text-[#EE964B]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SHIPPING MODE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">Step 2 of 4</span>
              <h3 className="text-2xl font-black text-[#0B2545]">Choose Transport & Container Mode</h3>
              <p className="text-sm text-slate-600">
                Select from our proprietary fleet of 1,708+ ISO tanks, intermodal rail wagons, or global ocean/air slots.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  id: 'ISO_TANK',
                  title: 'ISO Tank Liquid Container',
                  desc: '24,000L - 26,000L T11/T14/T50 tanks for liquid chemicals, hazardous solvents, pharma & food-grade oils.',
                  icon: Gauge,
                  badge: 'BWL Core Specialty (1,708+ Fleet)',
                  highlight: 'High Capacity 316L Stainless Steel',
                },
                {
                  id: 'OCEAN_FCL',
                  title: 'Ocean Container (FCL / LCL)',
                  desc: '20ft GP & 40ft High Cube standard containers for general cargo, heavy machinery, and exports.',
                  icon: Anchor,
                  badge: 'Global NVOCC Slot Coverage',
                  highlight: '140+ Ports Worldwide',
                },
                {
                  id: 'RAIL_CARGO',
                  title: 'Intermodal Rail Freight',
                  desc: 'Dedicated CONCOR container rakes connecting Mumbai/Gujarat ports with Hyderabad ICDs. 68% lower emissions.',
                  icon: Train,
                  badge: 'Fastest Domestic Inland Corridor',
                  highlight: 'Green Low-Carbon Rail Link',
                },
                {
                  id: 'AIR_FREIGHT',
                  title: 'IATA Priority Air Cargo',
                  desc: 'Time-critical express pharma cool-chain and high-value cargo with direct space via Hyderabad RGIA.',
                  icon: Plane,
                  badge: 'IATA Accredited Air Service',
                  highlight: 'Next-Day International Dispatch',
                },
              ].map((item) => {
                const isSelected = mode === item.id;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => setMode(item.id as 'ISO_TANK' | 'OCEAN_FCL' | 'AIR_FREIGHT' | 'RAIL_CARGO')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0B2545] bg-blue-50/50 shadow-md ring-2 ring-[#0B2545]/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0B2545] text-[#EE964B]' : 'bg-slate-100 text-[#134074]'}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#EE964B] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-[#0B2545]">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#00A896]">{item.highlight}</span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#0B2545] bg-[#0B2545]' : 'border-slate-300'}`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Proceed to Cargo Specs</span>
                <ArrowRight className="w-4 h-4 text-[#EE964B]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CARGO SPECS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EE964B]">Step 3 of 4</span>
              <h3 className="text-2xl font-black text-[#0B2545]">Define Cargo Specifications</h3>
              <p className="text-sm text-slate-600">
                Specify weight, hazard classification, temperature constraints, and customs clearing requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Cargo Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-700">Cargo Type / Commodity</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-[#134074] focus:outline-none font-semibold text-slate-800 text-sm bg-slate-50/50"
                >
                  <option value="Specialty Chemicals / Solvents">Specialty Chemicals & Industrial Solvents</option>
                  <option value="Pharmaceutical Liquid APIs / Intermediates">Pharmaceutical APIs & Bulk Intermediates</option>
                  <option value="Petrochemicals & Lubricant Additives">Petrochemicals & Lubricant Base Oils</option>
                  <option value="Food Grade Liquid / Glycerine / Edible Oils">Food Grade Liquid / Glycerine / Edible Oils</option>
                  <option value="General Industrial Dry Cargo">General Industrial Dry Goods & Machinery</option>
                  <option value="Automotive Engineering Assemblies">Automotive Engineering Assemblies</option>
                </select>
              </div>

              {/* Weight in MT */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-slate-700">Estimated Cargo Weight (Metric Tons)</label>
                  <span className="text-sm font-extrabold text-[#0B2545]">{weightMt} MT</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="32"
                  step="1"
                  value={weightMt}
                  onChange={(e) => setWeightMt(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EE964B]"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>2 MT (LCL/Air)</span>
                  <span>18 MT</span>
                  <span>32 MT (Max Heavy Payload)</span>
                </div>
              </div>
            </div>

            {/* Checkboxes & Parameters */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Special Handling Controls</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hazardous Cargo Toggle */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={hazardousCargo}
                    onChange={(e) => setHazardousCargo(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#EE964B] focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#0B2545] block">Dangerous Goods (DG)</span>
                    <span className="text-slate-500 text-[11px]">IMO Class 3 / 6 / 8 / 9 certification</span>
                  </div>
                </label>

                {/* Temperature Control */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={temperatureControlled}
                    onChange={(e) => setTemperatureControlled(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#EE964B] focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#0B2545] block">Heated / Cold Chain</span>
                    <span className="text-slate-500 text-[11px]">Steam coils or Reefer setpoint</span>
                  </div>
                </label>

                {/* Customs Assistance */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={customsAssistanceRequired}
                    onChange={(e) => setCustomsAssistanceRequired(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#EE964B] focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#0B2545] block">CHA Customs Clearing</span>
                    <span className="text-slate-500 text-[11px]">Full ICEGATE & port duty handling</span>
                  </div>
                </label>
              </div>

              {/* Hazard Class Selector (if DG checked) */}
              {hazardousCargo && (
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select IMO Hazard Rating:</label>
                  <select
                    value={hazardClass}
                    onChange={(e) => setHazardClass(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="IMO Class 3 (Flammable Liquid)">IMO Class 3 (Flammable Liquids - Solvents, Alcohols)</option>
                    <option value="IMO Class 8 (Corrosive Substances)">IMO Class 8 (Corrosives - Acids, Caustic Lye)</option>
                    <option value="IMO Class 6.1 (Toxic Substances)">IMO Class 6.1 (Toxic / Poisonous Organics)</option>
                    <option value="IMO Class 9 (Miscellaneous DG)">IMO Class 9 (Environmentally Hazardous)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isCalculating}
                onClick={calculateFreightQuote}
                className="px-8 py-3.5 rounded-xl bg-[#EE964B] hover:bg-[#E08535] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isCalculating ? (
                  <span>Generating Proforma Costing...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Instant Estimate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: INSTANT QUOTE BREAKDOWN & BOOKING CONSIGNMENT */}
        {currentStep === 4 && quoteResult && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Summary Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#134074] text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/10 text-amber-400">
                  QUOTE REF: {quoteResult.quoteReference}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
                  Estimated Multimodal Freight Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {quoteResult.request.origin.split(' (')[0]} → {quoteResult.request.destination.split(' (')[0]} ({quoteResult.request.mode.replace('_', ' ')})
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-slate-300 block uppercase tracking-wider font-semibold">Total Estimated Cost</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {formatInr(quoteResult.totalInr)}
                </div>
                <span className="text-xs text-slate-300">
                  Approx. {formatUsd(quoteResult.approximateUsd)} (Incl. 18% GST)
                </span>
              </div>
            </div>

            {/* Quick Metrics (Transit Time & Eco Index) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-100 text-[#0B2545]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Transit Window</span>
                  <span className="text-base font-extrabold text-[#0B2545]">
                    {quoteResult.transitDaysMin} - {quoteResult.transitDaysMax} Business Days
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Carbon Index</span>
                  <span className="text-base font-extrabold text-emerald-800">
                    {quoteResult.carbonEmissionEstKg} kg CO2e
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-100 text-[#EE964B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Quote Validity</span>
                  <span className="text-base font-extrabold text-[#0B2545]">
                    14 Days Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Cost Breakdown Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-100 px-6 py-3 font-bold text-xs uppercase tracking-wider text-[#0B2545]">
                Commercial Cost Breakdown
              </div>
              <div className="divide-y divide-slate-100 text-sm">
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-slate-600">Base Freight Transport ({quoteResult.request.mode})</span>
                  <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.baseFreight)}</span>
                </div>
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-slate-600">Terminal Handling Charges (THC & Port/ICD Lift)</span>
                  <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.terminalHandlingCharges)}</span>
                </div>
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-slate-600">Bunker & Fuel Adjustment Surcharge (BAF / FSC)</span>
                  <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.bunkerAndFuelSurcharge)}</span>
                </div>
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-slate-600">Multimodal First & Last Mile Trailer Drayage</span>
                  <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.intermodalDrayage)}</span>
                </div>
                {quoteResult.breakdown.customsDocumentationAndCHA > 0 && (
                  <div className="px-6 py-3 flex justify-between">
                    <span className="text-slate-600">Customs Clearance & ICEGATE Documentation</span>
                    <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.customsDocumentationAndCHA)}</span>
                  </div>
                )}
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-slate-600">Multimodal Cargo Transit Insurance (Estimated)</span>
                  <span className="font-mono font-semibold text-slate-900">{formatInr(quoteResult.breakdown.marineTransitInsurance)}</span>
                </div>
                <div className="px-6 py-3 flex justify-between bg-slate-50/50">
                  <span className="text-slate-700 font-semibold">Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">{formatInr(quoteResult.subtotalInr)}</span>
                </div>
                <div className="px-6 py-3 flex justify-between bg-slate-50/50">
                  <span className="text-slate-700 font-semibold">Goods & Services Tax (GST @ 18%)</span>
                  <span className="font-mono font-bold text-slate-900">{formatInr(quoteResult.breakdown.gstAmount)}</span>
                </div>
                <div className="px-6 py-4 flex justify-between bg-blue-50/70 border-t-2 border-[#0B2545]/20">
                  <span className="text-[#0B2545] font-extrabold text-base">Net Payable Proforma Estimate</span>
                  <span className="font-mono font-black text-lg text-[#0B2545]">{formatInr(quoteResult.totalInr)}</span>
                </div>
              </div>
            </div>

            {/* Convert Estimate into Consignment Booking Form */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-50 border-2 border-[#EE964B]/40">
              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-[#0B2545]">Consignment Booking Initiated!</h4>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Your booking reference <strong className="font-mono text-[#0B2545]">{quoteResult.quoteReference}</strong> has 
                    been queued with our Central Operations Desk in Banjara Hills, Hyderabad. Our logistics coordinator will reach out shortly.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setBookingSuccess(false);
                        setCurrentStep(1);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold"
                    >
                      New Estimate
                    </button>
                    <a
                      href="tel:+918125863434"
                      className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white"
                    >
                      Call Dispatch (+91 8125863434)
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="font-extrabold text-lg text-[#0B2545] flex items-center gap-2">
                        <Send className="w-5 h-5 text-[#EE964B]" />
                        <span>Lock This Rate & Book Consignment</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Submit your contact details to generate an official commercial invoice and block equipment.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded bg-[#EE964B]/20 text-[#EE964B]">
                      Zero Obligation Inquiry
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Hetero Drugs Ltd / Aurobindo Chemicals"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Phone / Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98490 XXXXX"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Special Consignment Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Special loading dock access, steam heating temperature profile, or delivery instructions..."
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-sm"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      ← Modify Cargo Parameters
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {isSubmittingBooking ? 'Submitting Consignment...' : 'Confirm Consignment & Request Callback'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
