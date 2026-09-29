# Blue Water Logistics Limited (BWL) Enterprise Web Platform
**CIN: L63030TG2022PLC165815** | Multimodal Transport Operator under MTO Act 1993 (Reg: MTO/DGS/2012/1048)

---

## ⚓ Overview
**Blue Water Logistics Limited** is a premier Indian multimodal logistics and supply chain enterprise based in Banjara Hills, Hyderabad. Established in 2010 and operating as a Public Limited Company (2025), BWL manages an active fleet of **1,708+ ISO Tank Containers**, heavy-duty GPS-tracked trailers, and direct intermodal rail rakes connecting coastal ocean gateways (JNPT Mumbai, Chennai, Mundra, Visakhapatnam, Kolkata) with inland industrial hubs.

This platform is an enterprise-grade, high-performance web platform built with **Next.js (App Router, TypeScript)**, **Tailwind CSS v4**, **Lucide Icons**, and **Mongoose/MongoDB Atlas**.

---

## 🚀 Key Interactive Features Built

### 1. 📡 Live Multimodal Shipment & Container Tracker (`/tracker`)
- **Multi-Identifier Lookup**: Supports Container No (e.g. `BWLU104829`, `BWLU492015`), Air Waybill (`098-84729104`), or Bill of Lading (`BWL-BL-948201`).
- **Dynamic 5-Stage Milestone Timeline**:
  1. *Booking Confirmed*
  2. *Customs Cleared (JNPT / Chennai / RGIA Air Hub)*
  3. *In Transit (Vessel / Rail / Interstate Trailer)*
  4. *Out for Delivery (Hyderabad Hub / CFS)*
  5. *Delivered (Signed e-POD)*
- **Live IoT Sensor Telemetry**: Real-time cargo temperature (°C with target profile), tank pressure gauge (Bar / PSI with 4.0 Bar safety limits), GPS satellite coordinates, and electronic RFID laser seal integrity.
- **Quick-Test Demo Chips**: 1-click test scenarios for ISO Tanks, Air Waybills, and Ocean B/L.

### 2. 🧮 Interactive Instant Freight Estimator (`/quote`)
- **4-Step Wizard**:
  - **Step 1**: Origin & Destination Gateways (JNPT, Hyderabad ICD, Chennai, Mundra, Dubai Jebel Ali, Rotterdam, Singapore, Houston).
  - **Step 2**: Shipping Mode (ISO Tank Liquid, Dry 20ft/40ft Container, IATA Air Express, Intermodal Rail).
  - **Step 3**: Cargo Specifications (Cargo category, Weight 2-32 MT, Dangerous Goods IMO Class 3/6/8/9, Temperature/heating control, CHA customs assistance).
  - **Step 4**: Itemized Commercial Cost Breakdown (Base freight, THC, BAF/fuel surcharge, Drayage, Insurance, 18% GST).
- **1-Click Booking Form**: Converts proforma quote into a logged consignment request with a unique reference (`BWL-QT-2025-XXXX`) saved directly to the database.

### 3. 🏭 Technical Fleet Catalog & CAD Schematics (`/services`)
- Filterable catalog of ISO tanks, dry containers, reefers, and air cargo ULDs.
- Detailed engineering parameters: Volumetric capacity (24,000L-26,000L), tare weight, payload, test pressure (6.0 Bar), steam/electrical heating coils, and compatible chemical profiles.
- Interactive modal with CAD schematic diagrams and downloadable PDF engineering spec sheets.

### 4. 🔒 Leads CRM & Milestone Command Center (`/admin`)
- **JWT-Secured Admin View**: Login with administrative credentials:
  - **Email**: `admin@bwl.co.in`
  - **Password**: `BWLadmin2025!`
- **Leads CRM**: Filter by status (`New`, `Contacted`, `Closed`), real-time search, customer contact details, and internal notes editor.
- **Shipment Milestone Manager**: Real-time progression controls to update active container milestones (Confirmed → Customs → In Transit → Out for Delivery → Delivered) and live location notes.

### 5. 🏛️ Corporate Governance & Investor Relations (`/governance`)
- Full corporate disclosures, CIN `L63030TG2022PLC165815`, and MTO Act 1993 statutory compliance.
- Board of Directors:
  - **Madhusmita Mohanty** (Managing Director & Chairperson, DIN: 08472910)
  - **Supriya Mishra** (Executive Director - Fleet & Multimodal Operations, DIN: 08472911)
  - **Lalit Panda** (Whole-Time Director & COO, DIN: 09124802)
  - **LN Mishra** (Non-Executive Director & Strategic Advisor, DIN: 01948203)
- Credit Rating: **IVR BBB / Stable** (Infomerics Investment Grade).

### 6. 🌱 ESG & Green Decarbonization (`/sustainability`)
- Rail modal shift yielding up to **68% CO2 emission reductions**.
- Zero Liquid Discharge (ZLD) ISO tank washing stations.
- Interactive **Consignment Carbon Savings Calculator**.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.3 (App Router, Turbopack) |
| **Language** | TypeScript (Strict mode, zero `any` types) |
| **Styling** | Tailwind CSS v4 with bespoke Maritime Navy (`#0B2545`), Ocean Teal (`#134074`), and Gold Accent (`#EE964B`) |
| **Icons** | Lucide React |
| **Database** | MongoDB Atlas via Mongoose with hybrid fallback store |
| **Authentication** | JWT (`jsonwebtoken`) & HTTP-only cookies |
| **APIs** | Next.js Serverless Route Handlers (`/api/tracking`, `/api/quote`, `/api/inquiries`, `/api/auth`) |

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration (Optional)
Create a `.env.local` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bwl_logistics?retryWrites=true&w=majority
JWT_SECRET=your-custom-jwt-secret-key
```
*Note: The platform features a resilient hybrid store that operates out-of-the-box with pre-seeded data if MongoDB is not connected.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production (Vercel Ready)
```bash
npm run build
npm run start
```
*Validated with clean TypeScript compilation and zero build errors.*

---

## 🏢 Corporate Contact Information
**Blue Water Logistics Limited**
- **Head Office**: 8-2-270/B/1/2, Block-3, 4th Floor, Uptown Banjara, Road No. 3, Banjara Hills, Hyderabad, Telangana 500034
- **Phone**: +91 8125863434 / +91 8341101774
- **Email**: info@bwl.co.in / support@bwl.co.in / investors@bwl.co.in
- **Port Operations**: Mumbai (JNPT), Chennai, Mundra, Visakhapatnam, Kolkata, ICD Sanathnagar, ICD Thimmapur
