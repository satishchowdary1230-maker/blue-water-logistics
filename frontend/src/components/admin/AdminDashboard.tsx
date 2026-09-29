'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  RefreshCw, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  LogOut, 
  FileText, 
  ChevronRight, 
  Check, 
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react';
import { Inquiry, InquiryStatus, Shipment, ShipmentStatus } from '@/lib/types';
import { formatDate, formatInr } from '@/lib/utils';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'shipments'>('inquiries');

  // Leads CRM State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [leadSearch, setLeadSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // Shipments Milestone Manager State
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [shipmentsLoading, setShipmentsLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [newMilestoneIndex, setNewMilestoneIndex] = useState<number>(0);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [locationNote, setLocationNote] = useState('');
  const [updatingShipment, setUpdatingShipment] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Fetch Inquiries
  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const url = new URL('/api/inquiries', window.location.origin);
      if (statusFilter !== 'All') url.searchParams.set('status', statusFilter);
      if (leadSearch.trim()) url.searchParams.set('search', leadSearch.trim());

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  // Fetch Shipments
  const fetchShipments = async () => {
    setShipmentsLoading(true);
    try {
      const res = await fetch('/api/tracking', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.shipments) {
        setShipments(data.shipments);
        if (!selectedShipment && data.shipments.length > 0) {
          const first = data.shipments[0];
          setSelectedShipment(first);
          setNewMilestoneIndex(first.currentMilestoneIndex);
          setNewStatus(first.status);
          setLocationNote(first.telemetry?.locationName || '');
        }
      }
    } catch (err) {
      console.error('Failed to load shipments:', err);
    } finally {
      setShipmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchShipments();
  }, [statusFilter, leadSearch]);

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, newStat: InquiryStatus) => {
    setUpdatingLeadId(id);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStat, internalNotes: editNotes || undefined })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map(i => (i.id === id || i._id === id) ? { ...i, status: newStat, internalNotes: editNotes || i.internalNotes } : i));
        if (selectedLead && (selectedLead.id === id || selectedLead._id === id)) {
          setSelectedLead({ ...selectedLead, status: newStat, internalNotes: editNotes || selectedLead.internalNotes });
        }
        setActionSuccessMessage(`Lead status updated to ${newStat}`);
        setTimeout(() => setActionSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  // Update Shipment Milestone
  const handleUpdateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    setUpdatingShipment(true);
    try {
      const res = await fetch('/api/tracking', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          trackingNumber: selectedShipment.trackingNumber,
          status: newStatus,
          milestoneIndex: Number(newMilestoneIndex),
          locationNote: locationNote.trim() || undefined
        })
      });

      const data = await res.json();
      if (data.success && data.shipment) {
        setShipments(shipments.map(s => s.trackingNumber === data.shipment.trackingNumber ? data.shipment : s));
        setSelectedShipment(data.shipment);
        setActionSuccessMessage(`Milestone for ${data.shipment.trackingNumber} updated to "${newStatus}"!`);
        setTimeout(() => setActionSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error('Failed to update shipment milestone:', err);
    } finally {
      setUpdatingShipment(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Closed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EE964B] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            CENTRAL OPERATIONS CONTROL • HYDERABAD HQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Logistics Leads & Milestone Command Center
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Manage incoming cargo quotes, institutional inquiries, and real-time container milestone progressions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchInquiries(); fetchShipments(); }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh All"
          >
            <RefreshCw className={`w-4 h-4 ${(inquiriesLoading || shipmentsLoading) ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Total Leads in CRM</span>
            <Users className="w-4 h-4 text-[#EE964B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B2545] font-mono">{inquiries.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Live Inquiries Synced</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Active Shipments</span>
            <Truck className="w-4 h-4 text-[#00A896]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B2545] font-mono">{shipments.length}</div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Containers / AWB / BL</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>ISO Tank Fleet</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B2545] font-mono">1,708+</div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">T11/T14/T50 Tanks</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>On-Time SLA Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">99.4%</div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Pan-India Rail & Port</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'inquiries'
              ? 'border-[#0B2545] text-[#0B2545]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-[#EE964B]" />
          <span>Leads & Inquiry Management</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 font-mono">
            {inquiries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('shipments')}
          className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'shipments'
              ? 'border-[#0B2545] text-[#0B2545]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4 text-[#00A896]" />
          <span>Shipment Milestone Manager</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 font-mono">
            {shipments.length}
          </span>
        </button>
      </div>

      {/* TAB 1: LEADS & INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Filter:</span>
              {['All', 'New', 'Contacted', 'Closed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === s
                      ? 'bg-[#0B2545] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                placeholder="Search company, contact, email..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B2545]"
              />
            </div>
          </div>

          {/* Leads Table & Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leads List */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {inquiries.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    No leads found matching current filter.
                  </div>
                ) : (
                  inquiries.map((inq) => {
                    const id = inq.id || inq._id || '';
                    const isSelected = selectedLead && (selectedLead.id === id || selectedLead._id === id);

                    return (
                      <div
                        key={id}
                        onClick={() => {
                          setSelectedLead(inq);
                          setEditNotes(inq.internalNotes || '');
                        }}
                        className={`p-5 cursor-pointer transition-all hover:bg-slate-50 ${
                          isSelected ? 'bg-blue-50/80 border-l-4 border-[#0B2545]' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-[#0B2545]">{inq.companyName}</span>
                            {inq.quoteReference && (
                              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0B2545]">
                                {inq.quoteReference}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(inq.status)}`}>
                            {inq.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mb-2">
                          <span className="font-medium">{inq.contactPerson}</span>
                          <span>•</span>
                          <span className="text-slate-500">{inq.email}</span>
                          <span>•</span>
                          <span className="text-slate-500">{inq.phone}</span>
                        </div>

                        <p className="text-xs text-slate-700 line-clamp-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                          {inq.message}
                        </p>

                        <div className="mt-3 flex justify-between items-center text-[11px] text-slate-400">
                          <span>Route: <strong className="text-slate-600">{inq.origin} → {inq.destination}</strong></span>
                          <span>{formatDate(inq.createdAt)}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Selected Lead Action Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              {selectedLead ? (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EE964B]">Lead Details</span>
                    <h4 className="text-lg font-black text-[#0B2545]">{selectedLead.companyName}</h4>
                    <p className="text-xs text-slate-500">{selectedLead.cargoType}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">{selectedLead.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">{selectedLead.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">{selectedLead.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{selectedLead.origin} → {selectedLead.destination}</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">Requirement:</span>
                    {selectedLead.message}
                  </div>

                  {/* Status Changer */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-700 block">Lead Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['New', 'Contacted', 'Closed'] as InquiryStatus[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          disabled={updatingLeadId !== null}
                          onClick={() => handleUpdateInquiryStatus(selectedLead.id || selectedLead._id || '', st)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            selectedLead.status === st
                              ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Internal Notes Editor */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-700 block">Staff Internal Notes</label>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add customer follow-up notes, assigned key account executive, quote sent..."
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B2545]"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateInquiryStatus(selectedLead.id || selectedLead._id || '', selectedLead.status)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                    >
                      Save Internal Note
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-slate-400">
                  Select a lead from the list to view requirements and update commercial status.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SHIPMENT MILESTONE MANAGER */}
      {activeTab === 'shipments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipment List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-500">
              Active Shipments & Containers ({shipments.length})
            </h4>

            <div className="space-y-3">
              {shipments.map((s) => {
                const isSelected = selectedShipment?.trackingNumber === s.trackingNumber;

                return (
                  <div
                    key={s.trackingNumber}
                    onClick={() => {
                      setSelectedShipment(s);
                      setNewMilestoneIndex(s.currentMilestoneIndex);
                      setNewStatus(s.status);
                      setLocationNote(s.telemetry?.locationName || '');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#0B2545] bg-blue-50/70 shadow-sm ring-1 ring-[#0B2545]/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-black text-sm text-[#0B2545]">{s.trackingNumber}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border">
                        {s.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">{s.customerName}</p>
                    <div className="mt-2 flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-emerald-700">{s.status}</span>
                      <span className="text-slate-400">Step {s.currentMilestoneIndex + 1}/5</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Update Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {selectedShipment ? (
              <form onSubmit={handleUpdateMilestone} className="space-y-6">
                <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#EE964B]">
                      {selectedShipment.type} • {selectedShipment.trackingNumber}
                    </span>
                    <h3 className="text-xl font-black text-[#0B2545] mt-1">
                      Milestone Stage & Status Progression
                    </h3>
                    <p className="text-xs text-slate-500">
                      Client: {selectedShipment.customerName} • Cargo: {selectedShipment.cargoDescription}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0B2545] text-white font-mono">
                    Current: {selectedShipment.status}
                  </span>
                </div>

                {/* Milestone Step Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 block">
                    Update Progress Milestone Stage
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { index: 0, title: 'Booking Confirmed' },
                      { index: 1, title: 'Customs Cleared' },
                      { index: 2, title: 'In Transit' },
                      { index: 3, title: 'Out for Delivery' },
                      { index: 4, title: 'Delivered' },
                    ].map((step) => {
                      const isTarget = Number(newMilestoneIndex) === step.index;
                      return (
                        <button
                          key={step.index}
                          type="button"
                          onClick={() => {
                            setNewMilestoneIndex(step.index);
                            setNewStatus(step.title as ShipmentStatus);
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            isTarget
                              ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-md ring-2 ring-blue-100'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block text-[10px] text-amber-400 font-mono">Stage {step.index + 1}</span>
                          <span className="leading-tight block mt-0.5">{step.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                      Display Status Header
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B2545] text-sm font-semibold"
                    >
                      <option value="Booking Confirmed">Booking Confirmed</option>
                      <option value="Customs Cleared">Customs Cleared</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="On Hold / Exception">On Hold / Exception</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                      Current Location / Facility Note
                    </label>
                    <input
                      type="text"
                      value={locationNote}
                      onChange={(e) => setLocationNote(e.target.value)}
                      placeholder="e.g. Cleared at JNPT Port Gate 4 / En route Solapur Corridor"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B2545] text-sm"
                    />
                  </div>
                </div>

                {/* Milestone History Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 block">
                    Defined Route Sequence:
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {selectedShipment.milestones.map((m, idx) => (
                      <div key={m.id} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0">
                        <span className="font-semibold">
                          {idx + 1}. {m.stageName} ({m.facility})
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updatingShipment}
                    className="px-8 py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
                  >
                    {updatingShipment ? 'Saving Status...' : 'Apply Live Milestone Progression'}
                    <Check className="w-4 h-4 text-[#EE964B]" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-slate-400 text-xs">
                Select a shipment on the left to edit milestone progression.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
