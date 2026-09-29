import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Blue Water Logistics Limited | Multimodal Supply Chain & ISO Tank Operator (CIN: L63030TG2022PLC165815)',
  description: 'Blue Water Logistics Limited (Established 2010; Public Co. 2025; MTO Act 1993 Registered) is a leading Indian multimodal logistics enterprise based in Banjara Hills, Hyderabad. Managing 1,708+ ISO Tanks, rail rakes, and ocean freight.',
  keywords: [
    'Blue Water Logistics Limited',
    'BWL',
    'ISO Tank Containers',
    'Multimodal Transport Operator',
    'MTO Act 1993',
    'Banjara Hills Hyderabad',
    'Chemical Logistics India',
    'Ocean Freight NVOCC',
    'IATA Air Cargo',
    'CONCOR Intermodal Rail',
    'Customs House Agent'
  ],
  authors: [{ name: 'Blue Water Logistics Limited' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
