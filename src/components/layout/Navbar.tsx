'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  Search, 
  Calculator, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Anchor,
  UserCheck
} from 'lucide-react';
import { BWL_CORPORATE_INFO } from '@/lib/seedData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Live Tracker', href: '/tracker' },
    { name: 'Instant Quote', href: '/quote' },
    { name: 'Services & Fleet', href: '/services' },
    { name: 'Corporate & IR', href: '/governance' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Corporate Ticker Bar */}
      <div className="bg-[#0B2545] text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CIN: <span className="text-white font-mono">{BWL_CORPORATE_INFO.cin}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Award className="w-3.5 h-3.5 text-[#EE964B]" />
              IVR BBB / Stable Rated | ISO 9001:2015
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#00A896]" />
              MTO Act 1993 Reg. Operator
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${BWL_CORPORATE_INFO.contacts.primaryPhone}`} 
              className="flex items-center gap-1.5 hover:text-[#EE964B] transition-colors text-slate-300 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#EE964B]" />
              <span>{BWL_CORPORATE_INFO.contacts.primaryPhone}</span>
            </a>
            <a 
              href={`mailto:${BWL_CORPORATE_INFO.contacts.generalEmail}`} 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#EE964B] transition-colors text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-[#00A896]" />
              <span>{BWL_CORPORATE_INFO.contacts.generalEmail}</span>
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
            >
              <UserCheck className="w-3 h-3 text-[#EE964B]" />
              <span>Staff CRM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B2545] to-[#134074] flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <Anchor className="w-6 h-6 text-[#EE964B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0B2545] leading-none">
                BLUE WATER
              </span>
              <span className="text-xs font-bold tracking-widest text-[#134074] flex items-center gap-1">
                LOGISTICS LIMITED
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-mono font-semibold">
                  MTO
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-[#0B2545] bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-[#0B2545] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/tracker"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0B2545] bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300"
            >
              <Search className="w-4 h-4 text-[#134074]" />
              <span>Track Cargo</span>
            </Link>

            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#EE964B] to-[#E08535] hover:from-[#E08535] hover:to-[#CF7528] shadow-md hover:shadow-lg transition-all"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Freight Estimator</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/quote"
              className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#EE964B]"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold ${
                    active
                      ? 'text-[#0B2545] bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-[#0B2545] bg-slate-100"
            >
              <Search className="w-4 h-4" />
              <span>Live Shipment Tracker</span>
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-white bg-[#EE964B]"
            >
              <Calculator className="w-4 h-4" />
              <span>Instant Freight Estimator</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-[#134074]" />
              <span>Staff CRM Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
