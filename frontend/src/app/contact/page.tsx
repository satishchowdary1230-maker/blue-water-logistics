'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  Anchor, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function ContactPage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cargoType, setCargoType] = useState('Bulk Liquids / Chemicals');
  const [origin, setOrigin] = useState('JNPT Mumbai');
  const [destination, setDestination] = useState('Hyderabad ICD');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
          cargoType,
          origin,
          destination,
          message,
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      setError('Network communication failed. Please call our 24/7 desk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B2545] text-xs font-bold font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#EE964B]" />
            HEADQUARTERS & PAN-INDIA PORT NETWORK
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight">
            Connect with Central Operations
          </h1>
          <p className="text-sm text-slate-600">
            Reach out to our Banjara Hills Hyderabad command center or connect directly with our coastal port CFS desks.
          </p>
        </div>

        {/* Contact Grid: Form & HQ Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-mono font-bold text-[#EE964B]">PRIORITY DISPATCH INQUIRY</span>
              <h2 className="text-2xl font-black text-[#0B2545]">Request Multimodal Freight Consultation</h2>
              <p className="text-xs text-slate-500 mt-1">
                Guaranteed commercial callback within 2 business hours from our Hyderabad operations team.
              </p>
            </div>

            {success ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#0B2545]">Inquiry Received Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-[#0B2545]">{contactPerson}</strong>. Our logistics desk has logged your request 
                  for <strong className="text-[#0B2545]">{companyName}</strong>. A dedicated logistics manager will contact you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Company / Shipper *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Hetero Drugs Ltd / Aurobindo"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Contact Officer Name *</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. P. Venkatesh"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="officer@company.com"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Phone / Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 81258 XXXXX"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Cargo Type</label>
                    <input
                      type="text"
                      required
                      value={cargoType}
                      onChange={(e) => setCargoType(e.target.value)}
                      placeholder="e.g. Toluene Solvent"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Origin Port/City</label>
                    <input
                      type="text"
                      required
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g. JNPT Mumbai"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Destination Hub</label>
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Hyderabad ICD"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-700 block mb-1">Consignment Scope & Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on monthly tonnage, temperature controls, hazard ratings, or custom CHA clearing..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B2545] focus:outline-none text-xs sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#EE964B]" />
                  <span>{loading ? 'Submitting to Dispatch Desk...' : 'Transmit Freight Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Head Office & Port Network */}
          <div className="lg:col-span-5 space-y-6">
            {/* Registered Head Office Card */}
            <div className="bg-[#0B2545] text-white rounded-3xl border border-navy-800 shadow-xl overflow-hidden">
              {/* Realistic HQ Photography */}
              <div className="relative h-48 w-full bg-slate-900">
                <img 
                  src="/images/hq-banjara.jpg" 
                  alt="Blue Water Logistics Headquarters, Uptown Banjara, Hyderabad" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#EE964B]">
                  ROC HYDERABAD • HQ
                </div>
              </div>

              <div className="p-8 space-y-6 pt-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#EE964B]">HEADQUARTERS</span>
                  <h3 className="text-xl font-black mt-1">Uptown Banjara Office</h3>
                  <p className="text-xs text-slate-400">Road No. 3, Banjara Hills, Hyderabad</p>
                </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#EE964B] shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-slate-300">
                    {BWL_CORPORATE_INFO.registeredOffice.addressLine1},<br />
                    {BWL_CORPORATE_INFO.registeredOffice.addressLine2},<br />
                    {BWL_CORPORATE_INFO.registeredOffice.city}, {BWL_CORPORATE_INFO.registeredOffice.state} - {BWL_CORPORATE_INFO.registeredOffice.pincode}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-5 h-5 text-[#00A896] shrink-0" />
                  <div>
                    <a href={`tel:${BWL_CORPORATE_INFO.contacts.primaryPhone}`} className="hover:text-[#EE964B] block font-bold text-sm">
                      {BWL_CORPORATE_INFO.contacts.primaryPhone}
                    </a>
                    <a href={`tel:${BWL_CORPORATE_INFO.contacts.secondaryPhone}`} className="hover:text-[#EE964B] block text-slate-300">
                      {BWL_CORPORATE_INFO.contacts.secondaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#EE964B] shrink-0" />
                  <div>
                    <a href={`mailto:${BWL_CORPORATE_INFO.contacts.generalEmail}`} className="hover:text-white block font-medium">
                      {BWL_CORPORATE_INFO.contacts.generalEmail}
                    </a>
                    <a href={`mailto:${BWL_CORPORATE_INFO.contacts.supportEmail}`} className="hover:text-white block text-slate-400">
                      {BWL_CORPORATE_INFO.contacts.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-[11px] text-slate-400">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Operations Control: 24/7 Multimodal Monitoring Active</span>
                </div>
              </div>
            </div>
            </div>

            {/* Port Depots Directory Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                <Anchor className="w-4 h-4 text-[#EE964B]" />
                <span>Regional Port & ICD Desks</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block font-bold">Mumbai Port Office (JNPT / Nhava Sheva):</strong>
                  GTI Commercial Complex, Sector 11, Dronagiri Node, Navi Mumbai 400707
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block font-bold">Chennai Port Desk:</strong>
                  Rajaji Salai, Port Commercial Gate 1, Chennai 600001
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block font-bold">Hyderabad Rail ICD Terminals:</strong>
                  ICD Sanathnagar & Thimmapur Intermodal Container Depots, Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
