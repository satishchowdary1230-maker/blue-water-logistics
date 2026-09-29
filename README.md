# Blue Water Logistics Limited (BWL) Enterprise Web Platform
**CIN: L63030TG2022PLC165815** | Multimodal Transport Operator under MTO Act 1993 (Reg: MTO/DGS/2012/1048)

---

## ⚓ Architecture: Clean Frontend & Backend Separation

The codebase is organized into two dedicated, decoupled services:

```
c:/Users/satis/Downloads/Blue Water Logistics/
├── backend/                       # Dedicated Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── config/                # Database connection & environment configuration
│   │   ├── controllers/           # Tracking, Inquiries CRM, Quote Engine, Auth controllers
│   │   ├── middleware/            # JWT authentication & error handling
│   │   ├── models/                # Mongoose models (Inquiry, Shipment)
│   │   ├── routes/                # Express API routes (/api/tracking, /inquiries, /quote, /auth)
│   │   ├── store/                 # Seed data & hybrid resilient data store
│   │   ├── types/                 # Strict TypeScript domain interfaces
│   │   └── server.ts              # Express application entrypoint (Port 5000)
│   ├── package.json               # Backend dependencies (express, cors, mongoose, jwt, etc.)
│   └── tsconfig.json
│
├── frontend/                      # Dedicated Next.js 16 (App Router + Tailwind CSS v4)
│   ├── src/
│   │   ├── app/                   # App Router pages (/tracker, /quote, /services, /admin, etc.)
│   │   ├── components/            # Layout, Tracking, FreightEstimator, Fleet, Admin components
│   │   └── lib/                   # Formatting utils & types
│   ├── public/                    # Static assets
│   ├── next.config.ts             # Proxies /api/* calls to backend (Port 5000)
│   ├── package.json               # Frontend dependencies (next, react, tailwindcss, lucide, etc.)
│   └── tsconfig.json
│
├── package.json                   # Root orchestrator with unified scripts (concurrently)
└── README.md
```

---

## 🚀 Running the Project

### Option A: Run Both Together (Recommended)
From the root directory:
```bash
# Development mode (concurrently runs backend on :5000 and frontend on :3000)
npm run dev

# Production build and run
npm run build
npm run start
```

### Option B: Run Services Individually
```bash
# Terminal 1: Backend Server (Port 5000)
npm run dev:backend

# Terminal 2: Frontend App (Port 3000)
npm run dev:frontend
```

---

## 📡 Backend Service Details (Port 5000)

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | Healthcheck returning service status, CIN, and MTO registration |
| `/api/tracking` | `GET` | Query consignment status by Container No, AWB, or B/L |
| `/api/tracking` | `PUT` | Update shipment milestone stage and live location notes (Staff) |
| `/api/quote` | `POST` | Calculate instant multimodal freight quote with itemized breakdown |
| `/api/inquiries` | `GET` | Fetch institutional leads (filterable by status: `New`, `Contacted`, `Closed`) |
| `/api/inquiries` | `POST` | Submit new consignment lead or quote booking |
| `/api/inquiries` | `PATCH` | Update lead status and internal staff notes |
| `/api/auth` | `POST` | Staff authentication issuing JWT tokens |
| `/api/auth` | `GET` | Validate current session token |

### Staff Admin Credentials
- **Email**: `admin@bwl.co.in`
- **Password**: `BWLadmin2025!`

---

## 💻 Frontend Service Details (Port 3000)

| Route | Description |
|---|---|
| `/` | Corporate homepage with hero tracking input, stats, 6 services, and interactive map |
| `/tracker` | Live Container & Shipment Tracker with 5-stage timeline and IoT sensor telemetry |
| `/quote` | Multi-step interactive Freight Estimator with 1-click consignment booking |
| `/services` | 6 Core services and technical Fleet Catalog with CAD schematics modal |
| `/governance` | Corporate Governance, Board of Directors (Madhusmita Mohanty et al.), and IVR BBB rating |
| `/sustainability` | ESG Decarbonization, ZLD tank circularity, and Consignment Carbon Calculator |
| `/contact` | Banjara Hills Hyderabad HQ details, direct inquiry form, and port CFS directory |
| `/admin` | JWT-authenticated Staff Portal (Leads CRM + Shipment Milestone progression) |

---

## 🏢 Corporate Entity Profile
**Blue Water Logistics Limited (BWL)**
- **CIN**: `L63030TG2022PLC165815`
- **MTO Registration**: `MTO/DGS/2012/1048` (Under Multimodal Transportation of Goods Act 1993)
- **Credit Rating**: `IVR BBB / Stable` (Infomerics Valuation and Rating)
- **Head Office**: 8-2-270/B/1/2, Block-3, 4th Floor, Uptown Banjara, Road No. 3, Banjara Hills, Hyderabad, Telangana 500034
- **Phone**: +91 8125863434 / +91 8341101774
- **Email**: info@bwl.co.in / support@bwl.co.in / investors@bwl.co.in
- **Fleet**: 1,708+ ISO Tank Containers, 100+ Container Trailers, Intermodal Rail & Air Agreements
