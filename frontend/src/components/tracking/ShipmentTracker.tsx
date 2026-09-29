'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RefreshCw, 
  MapPin, 
  Thermometer, 
  Gauge, 
  Clock, 
  CheckCircle2, 
  CircleDashed, 
  AlertTriangle, 
  Truck, 
  Anchor, 
  Plane, 
  Train, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Info,
  Camera,
  Eye
} from 'lucide-react';
import { Shipment, Milestone } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ShipmentTrackerProps {
  initialTrackingId?: string;
}

export default function ShipmentTracker({ initialTrackingId = 'BWLU104829' }: ShipmentTrackerProps) {
  const [searchInput, setSearchInput] = useState(initialTrackingId);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const samplePresets = [
    { label: 'ISO Tank Chemical (BWLU104829)', query: 'BWLU104829', type: 'Container' },
    { label: 'Pharma Cold Chain AWB (098-84729104)', query: '098-84729104', type: 'Air Cargo' },
    { label: 'Ocean B/L Dubai Export (BWL-BL-948201)', query: 'BWL-BL-948201', type: 'Bill of Lading' },
    { label: 'Delivered Food Grade (BWLU492015)', query: 'BWLU492015', type: 'Delivered' },
  ];

  const fetchShipment = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/tracking?id=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (data.success && data.shipment) {
        setActiveShipment(data.shipment);
        setSearchInput(data.shipment.trackingNumber);
      } else {
        setErrorMessage(data.error || `No consignment found for "${query}".`);
      }
    } catch {
      setErrorMessage('Network error while querying tracking server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrackingId) {
      fetchShipment(initialTrackingId);
    }
  }, [initialTrackingId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShipment(searchInput);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'ISO_TANK':
        return <Gauge className="w-5 h-5 text-[#EE964B]" />;
      case 'AIR_FREIGHT':
        return <Plane className="w-5 h-5 text-sky-400" />;
      case 'RAIL_CARGO':
        return <Train className="w-5 h-5 text-emerald-400" />;
      default:
        return <Anchor className="w-5 h-5 text-teal-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Customs Cleared':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Search Header Bar */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0B2545]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Real-Time Satellite & Port Intermodal Gateway
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Live Multimodal Shipment & Container Tracker
          </h2>
          <p className="text-sm text-slate-600">
            Track ISO tanks, ocean containers, air waybills, or multimodal bills of lading with live IoT telemetry and customs milestones.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Container No (e.g. BWLU104829), AWB, or B/L No..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#134074] focus:outline-none text-[#0B2545] font-mono text-base font-semibold transition-all shadow-inner uppercase placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Track Now</span>
                <ChevronRight className="w-5 h-5 text-[#EE964B]" />
              </>
            )}
          </button>
        </form>

        {/* Quick Test Sample Chips */}
        <div className="max-w-3xl mx-auto mt-5 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Test Scenarios:</span>
            {samplePresets.map((preset) => (
              <button
                key={preset.query}
                type="button"
                onClick={() => {
                  setSearchInput(preset.query);
                  fetchShipment(preset.query);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  searchInput === preset.query
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error message notice */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-xs text-rose-600 mt-1">
                Try searching with one of our active demo containers above: <code className="font-mono font-bold">BWLU104829</code> or <code className="font-mono font-bold">098-84729104</code>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Active Shipment Results Card */}
      {activeShipment && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Top Status & Overview Card */}
          <div className="bg-[#0B2545] text-white rounded-2xl shadow-xl overflow-hidden border border-navy-800">
            {/* Top Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0B2545] to-[#134074] border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-[#EE964B]">
                    {activeShipment.type}
                  </span>
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight flex items-center gap-2">
                    {activeShipment.trackingNumber}
                    <button
                      onClick={() => handleCopy(activeShipment.trackingNumber)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Copy Tracking Number"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </span>
                </div>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <span>Customer: <strong className="text-white">{activeShipment.customerName}</strong></span>
                  <span className="text-slate-500">•</span>
                  <span>Booking Ref: <strong className="text-slate-200 font-mono">{activeShipment.bookingRef}</strong></span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-extrabold border shadow-sm ${getStatusBadge(activeShipment.status)}`}>
                  {activeShipment.status}
                </span>
                <button
                  onClick={() => fetchShipment(activeShipment.trackingNumber)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Refresh Telemetry"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Realistic Transport Asset Photograph Banner */}
            {(() => {
              const transportAssetMap: Record<string, { image: string; title: string; subtitle: string; spec: string }> = {
                ISO_TANK: {
                  image: '/images/iso-tank.jpg',
                  title: 'Proprietary T11 ISO Tank Container (25,000L)',
                  subtitle: '316L Stainless Steel Shell • Steam Heated • Top & Bottom Discharge Valves',
                  spec: 'Tare: 3,850 kg • Max Payload: 32,150 kg • IMDG / ADR / RID Certified',
                },
                OCEAN_FCL: {
                  image: '/images/ocean-vessel.jpg',
                  title: 'Deep-Sea Container Vessel Line-Haul',
                  subtitle: 'Berth Priority at JNPT / Mundra • Full Container Slot Protection',
                  spec: 'Multimodal Bill of Lading • MTO Act 1993 Registered • Direct Marine Routing',
                },
                OCEAN_LCL: {
                  image: '/images/ocean-vessel.jpg',
                  title: 'Ocean Container Freight (Consolidated LCL)',
                  subtitle: 'Groupage ocean transit with bonded CFS de-stuffing and customs clearance',
                  spec: 'CFS Destination Staged • RFID Laser E-Sealed • ICEGATE Verified',
                },
                CONTAINER: {
                  image: '/images/iso-tank.jpg',
                  title: 'Specialized Multimodal Intermodal Tank',
                  subtitle: 'Certified chemical and pharmaceutical grade container with live IoT sensors',
                  spec: 'UN Certified • IMDG Code Compliant • Active Geo-fence Alerting',
                },
                AIR_FREIGHT: {
                  image: '/images/air-freight.jpg',
                  title: 'Boeing 777F Priority Air Freight Unit (ULD)',
                  subtitle: 'IATA accredited cold chain corridor with tarmac temperature monitoring',
                  spec: 'ULD Envirotainer RKN • RGIA Hyderabad Direct Block-Space • Expedited ADC',
                },
                RAIL_CARGO: {
                  image: '/images/rail-freight.jpg',
                  title: 'CONCOR Electric Intermodal Freight Rake',
                  subtitle: 'Heavy container train linking coastal ports directly to ICD Sanathnagar',
                  spec: 'Double-Stack Capable • 68% Lower Carbon Footprint • High-Speed BLC Wagons',
                },
              };

              const asset = transportAssetMap[activeShipment.mode] || transportAssetMap[activeShipment.type] || transportAssetMap.ISO_TANK;
              return (
                <div className="relative border-b border-white/10 overflow-hidden bg-slate-900">
                  <div className="h-56 sm:h-64 w-full relative">
                    <img
                      src={asset.image}
                      alt={asset.title}
                      className="w-full h-full object-cover object-center brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/80 via-transparent to-transparent"></div>

                    {/* Overlay Asset Details */}
                    <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-mono font-bold text-white mb-2">
                          <Camera className="w-3.5 h-3.5 text-[#EE964B]" />
                          LIVE ASSET TELEMETRY & PHYSICAL PROFILE
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-white drop-shadow">
                          {asset.title}
                        </h3>
                        <p className="text-xs text-slate-200 mt-0.5 drop-shadow max-w-xl">
                          {asset.subtitle}
                        </p>
                      </div>

                      <div className="shrink-0 bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-right">
                        <span className="text-[10px] text-slate-400 font-mono uppercase block">Equipment Class</span>
                        <span className="text-xs font-mono font-bold text-[#EE964B] block">{asset.spec}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick Metrics & Routing Strip */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/[0.03]">
              <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Origin Port / City</span>
                <p className="text-base font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#EE964B] shrink-0" />
                  {activeShipment.originPortOrCity}
                </p>
                <span className="text-xs text-slate-400">{activeShipment.originCountry}</span>
              </div>

              <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Destination Port / Hub</span>
                <p className="text-base font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  {activeShipment.destinationPortOrCity}
                </p>
                <span className="text-xs text-slate-400">{activeShipment.destinationCountry}</span>
              </div>

              <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Estimated Delivery (ETA)</span>
                <p className="text-base font-bold text-[#EE964B] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#EE964B] shrink-0" />
                  {formatDate(activeShipment.estimatedDeliveryDate)}
                </p>
                <span className="text-xs text-slate-400">Carrier: {activeShipment.vesselOrCarrierName}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Cargo & Classification</span>
                <p className="text-sm font-bold text-white truncate" title={activeShipment.cargoDescription}>
                  {activeShipment.cargoDescription}
                </p>
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-white/10 text-amber-300 font-medium">
                  {activeShipment.cargoClassification}
                </span>
              </div>
            </div>

            {/* IoT Real-Time Telemetry Gauges (If telemetry available) */}
            {activeShipment.telemetry && (
              <div className="border-t border-white/10 p-6 sm:p-8 bg-[#081B33]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-300">
                      Live Container IoT Telemetry & Sensor Stream
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Last Satellite Ping: <strong className="text-white">{activeShipment.telemetry.lastPingTime}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Temperature */}
                  {activeShipment.telemetry.temperatureCelsius !== undefined && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Cargo Temp</span>
                        <Thermometer className="w-4 h-4 text-sky-400" />
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {activeShipment.telemetry.temperatureCelsius}°C
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        Target: {activeShipment.telemetry.targetTempCelsius ?? 22}°C (Optimal)
                      </div>
                    </div>
                  )}

                  {/* Pressure */}
                  {activeShipment.telemetry.pressureBar !== undefined && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Internal Pressure</span>
                        <Gauge className="w-4 h-4 text-[#EE964B]" />
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {activeShipment.telemetry.pressureBar} <span className="text-sm font-sans text-slate-400">Bar</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Max Allowed: {activeShipment.telemetry.maxPressureBar ?? 4.0} Bar
                      </div>
                    </div>
                  )}

                  {/* Current Coordinates & Hub */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>GPS Geofence</span>
                      <MapPin className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {activeShipment.telemetry.locationName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      {activeShipment.telemetry.latitude.toFixed(4)}°N, {activeShipment.telemetry.longitude.toFixed(4)}°E
                    </div>
                  </div>

                  {/* Security Laser Seal */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Electronic Seal</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs font-bold font-mono text-emerald-300">
                      {activeShipment.telemetry.sealNumber || 'INTACT (RFID-SECURED)'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Battery: {activeShipment.telemetry.gpsBatteryPercent ?? 95}% (Active)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic 5-Stage Milestone Timeline */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2545]">
                  Multimodal Transit Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time milestone sequence verified against ICEGATE customs EDI & GPS checkpoints
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                Step {activeShipment.currentMilestoneIndex + 1} of {activeShipment.milestones.length}
              </span>
            </div>

            {/* Stepper Progress Bar (Desktop) */}
            <div className="hidden lg:grid grid-cols-5 gap-3 mb-10 relative">
              {/* Connecting Background Line */}
              <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-0"></div>
              <div 
                className="absolute top-5 left-8 h-1 bg-[#00A896] transition-all duration-500 -z-0"
                style={{ width: `${(activeShipment.currentMilestoneIndex / (activeShipment.milestones.length - 1)) * 90}%` }}
              ></div>

              {activeShipment.milestones.map((m, idx) => {
                const isCompleted = idx < activeShipment.currentMilestoneIndex || (idx === activeShipment.currentMilestoneIndex && activeShipment.status === 'Delivered');
                const isCurrent = idx === activeShipment.currentMilestoneIndex && activeShipment.status !== 'Delivered';

                return (
                  <div key={m.id} className="relative z-10 flex flex-col items-center text-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 shadow-md transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isCurrent
                          ? 'bg-[#EE964B] text-white ring-4 ring-amber-100 animate-pulse'
                          : 'bg-white text-slate-400 border-2 border-slate-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isCurrent ? (
                        <CircleDashed className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <span className="font-extrabold text-xs text-[#0B2545]">{m.stageName}</span>
                    <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">{m.location}</span>
                  </div>
                );
              })}
            </div>

            {/* Milestone Cards Detail List */}
            <div className="space-y-4">
              {activeShipment.milestones.map((milestone, idx) => {
                const isCompleted = idx < activeShipment.currentMilestoneIndex || (idx === activeShipment.currentMilestoneIndex && activeShipment.status === 'Delivered');
                const isCurrent = idx === activeShipment.currentMilestoneIndex && activeShipment.status !== 'Delivered';

                return (
                  <div
                    key={milestone.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-50/60 border-[#EE964B] shadow-md ring-1 ring-[#EE964B]/30'
                        : isCompleted
                        ? 'bg-slate-50/70 border-slate-200'
                        : 'bg-white border-slate-100 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-700'
                              : isCurrent
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurrent ? (
                            <CircleDashed className="w-4 h-4 animate-spin" />
                          ) : (
                            <span className="text-xs font-bold">{idx + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0B2545] text-sm sm:text-base flex items-center gap-2">
                            {milestone.stageName}
                            {isCurrent && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EE964B] text-white">
                                Active Stage
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {milestone.facility} • {milestone.location}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-mono font-semibold text-slate-600 block">
                          {formatDate(milestone.timestamp)}
                        </span>
                        {milestone.customsOfficerOrAgent && (
                          <span className="text-[11px] text-[#134074] font-medium block">
                            {milestone.customsOfficerOrAgent}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 mt-2 pl-11">
                      {milestone.description}
                    </p>

                    {milestone.notes && (
                      <div className="mt-2.5 ml-11 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-[#EE964B] shrink-0" />
                        <span><strong>Milestone Note:</strong> {milestone.notes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
