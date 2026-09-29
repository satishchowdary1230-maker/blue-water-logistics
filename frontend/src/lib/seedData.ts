import { Shipment, Inquiry, FleetSpecification } from './types';

export const BWL_CORPORATE_INFO = {
  companyName: "Blue Water Logistics Limited",
  shortName: "BWL",
  cin: "L63030TG2022PLC165815",
  establishmentYear: 2010,
  publicCompanyYear: 2025,
  mtoRegNumber: "MTO/DGS/2012/1048 (Under MTO Act 1993)",
  registeredOffice: {
    addressLine1: "8-2-270/B/1/2, Block-3, 4th Floor, Uptown Banjara",
    addressLine2: "Road No. 3, Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    country: "India",
  },
  contacts: {
    generalEmail: "info@bwl.co.in",
    supportEmail: "support@bwl.co.in",
    investorEmail: "investors@bwl.co.in",
    primaryPhone: "+91 8125863434",
    secondaryPhone: "+91 8341101774",
    tollFreeEmergency: "1800-425-2950",
  },
  promotersAndBoard: [
    {
      name: "Madhusmita Mohanty",
      designation: "Managing Director & Chairperson",
      bio: "Founding visionary with over 22 years in international maritime freight, container leasing, and multimodal supply chain networks.",
      din: "08472910"
    },
    {
      name: "Supriya Mishra",
      designation: "Executive Director - Fleet & Multimodal Operations",
      bio: "Spearheads BWL's pan-India fleet expansion of 1,708+ ISO tanks and intermodal rail operations.",
      din: "08472911"
    },
    {
      name: "Lalit Panda",
      designation: "Whole-Time Director & Chief Operating Officer",
      bio: "Expert in Customs House Agent (CHA) compliance, port terminal handling, and DG cargo regulations under IMO conventions.",
      din: "09124802"
    },
    {
      name: "LN Mishra",
      designation: "Non-Executive Director & Strategic Advisor",
      bio: "Veteran infrastructure strategist leading BWL's ESG transition, capital allocation, and strategic credit ratings.",
      din: "01948203"
    },
  ],
  accreditations: [
    { title: "ISO 9001:2015", subtitle: "Quality Management System Certified", icon: "Award" },
    { title: "IATA Accredited", subtitle: "International Air Transport Association Agent", icon: "Plane" },
    { title: "FIATA Group Bond", subtitle: "International Federation of Freight Forwarders", icon: "ShieldCheck" },
    { title: "IVR BBB / Stable", subtitle: "Infomerics Investment Grade Credit Rating", icon: "TrendingUp" },
    { title: "JCTrans & GLA", subtitle: "Global Logistics Alliance Premier Tier Member", icon: "Globe" },
    { title: "MTO Act 1993", subtitle: "Govt of India Licensed Multimodal Operator", icon: "FileText" },
  ],
  fleetMetrics: {
    isoTanks: 1708,
    trailers: 100,
    portsConnected: 140,
    onTimeDeliveryPercent: 99.4,
    annualTonnageMt: "480,000+",
  }
};

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: "SHP-2025-001",
    trackingNumber: "BWLU104829",
    type: "CONTAINER",
    bookingRef: "BK-HYD-9921",
    containerNumber: "BWLU104829",
    billOfLading: "BWL-BL-948201",
    customerName: "Aurobindo Fine Chemicals Ltd",
    cargoDescription: "Iso-Propyl Alcohol (99.8% Electronic Grade)",
    cargoClassification: "IMO Class 3 Flammable Liquid (UN 1219)",
    hazardClass: "Class 3",
    grossWeightKg: 24500,
    volumeLitersOrCbm: "25,000 Litres",
    mode: "ISO_TANK",
    vesselOrCarrierName: "CONCOR Rake Express #7702 / MV Maersk Karun",
    originPortOrCity: "JNPT Nhava Sheva (Mumbai)",
    originCountry: "India",
    destinationPortOrCity: "ICD Sanathnagar (Hyderabad)",
    destinationCountry: "India",
    departureDate: "2026-09-24T08:30:00Z",
    estimatedDeliveryDate: "2026-09-30T18:00:00Z",
    currentMilestoneIndex: 2,
    status: "In Transit",
    milestones: [
      {
        id: "m1",
        stageName: "Booking Confirmed",
        location: "Mumbai Gateway Operations",
        facility: "BWL Nhava Sheva Yard 4",
        timestamp: "2026-09-22T10:15:00Z",
        status: "completed",
        description: "Consignment booked, ISO Tank pre-trip inspection (PTI) passed, tare certification issued.",
      },
      {
        id: "m2",
        stageName: "Customs Cleared",
        location: "JNPT Customs Cell",
        facility: "GTI Terminal Gate 3",
        timestamp: "2026-09-24T06:00:00Z",
        status: "completed",
        description: "Let Export Order (LEO) completed under GSP documentation and safety valves sealed.",
        customsOfficerOrAgent: "CHA Officer: R. Sharma (Lic. #HYD-CHA-402)",
      },
      {
        id: "m3",
        stageName: "In Transit",
        location: "Solapur Intermodal Junction",
        facility: "South Central Railway Corridor",
        timestamp: "2026-09-29T11:45:00Z",
        status: "current",
        description: "In transit aboard heavy container train rake en route to ICD Sanathnagar, Hyderabad.",
      },
      {
        id: "m4",
        stageName: "Out for Delivery",
        location: "Hyderabad Hub",
        facility: "ICD Sanathnagar Container Freight Station",
        timestamp: "2026-09-30T09:00:00Z",
        status: "upcoming",
        description: "De-stuffing & transfer to dedicated BWL GPS trailer for final factory gate delivery.",
      },
      {
        id: "m5",
        stageName: "Delivered",
        location: "Pashamylaram Pharma Zone, Hyderabad",
        facility: "Aurobindo Chemical Storage Yard Unit IV",
        timestamp: "2026-09-30T18:00:00Z",
        status: "upcoming",
        description: "Final chemical discharge and e-POD signoff.",
      }
    ],
    telemetry: {
      temperatureCelsius: 22.8,
      targetTempCelsius: 22.0,
      pressureBar: 1.82,
      maxPressureBar: 4.0,
      lastPingTime: "12 mins ago (Real-time IoT SAT-GPS)",
      latitude: 17.6599,
      longitude: 75.9064,
      locationName: "Near Solapur Junction, Maharashtra/Telangana Border",
      speedKmph: 64,
      heading: "East-Southeast",
      sealNumber: "BWL-SEAL-884192",
      gpsBatteryPercent: 94
    },
    createdAt: "2026-09-22T09:00:00Z",
    updatedAt: "2026-09-29T11:45:00Z"
  },
  {
    id: "SHP-2025-002",
    trackingNumber: "098-84729104",
    type: "AWB",
    bookingRef: "BK-AIR-4418",
    airWaybill: "098-84729104",
    customerName: "Dr. Reddy's Laboratories",
    cargoDescription: "Temperature-Sensitive Oncology Active Pharmaceutical Ingredients (APIs)",
    cargoClassification: "IATA Pharma Cold Chain (+2°C to +8°C)",
    grossWeightKg: 1850,
    volumeLitersOrCbm: "6.8 CBM (2 Envirotainer RKNs)",
    mode: "AIR_FREIGHT",
    vesselOrCarrierName: "Air India Cargo / Lufthansa Cargo (Flight AI-121)",
    originPortOrCity: "Hyderabad RGIA Air Cargo Terminal (HYD)",
    originCountry: "India",
    destinationPortOrCity: "Frankfurt CargoCity South (FRA)",
    destinationCountry: "Germany",
    departureDate: "2026-09-30T02:15:00Z",
    estimatedDeliveryDate: "2026-10-01T14:30:00Z",
    currentMilestoneIndex: 1,
    status: "Customs Cleared",
    milestones: [
      {
        id: "m1",
        stageName: "Booking Confirmed",
        location: "Banjara Hills Air Freight Desk",
        facility: "BWL Air Desk HQ",
        timestamp: "2026-09-28T09:00:00Z",
        status: "completed",
        description: "Priority Cold-chain ULD space blocked with carrier. Cool-dolly transfer scheduled.",
      },
      {
        id: "m2",
        stageName: "Customs Cleared",
        location: "GMR Hyderabad Air Cargo Terminal",
        facility: "Cold Zone Pharma Center",
        timestamp: "2026-09-29T13:20:00Z",
        status: "completed",
        description: "ADC (Assistant Drug Controller) NOC cleared; Air Waybill manifest endorsed.",
        customsOfficerOrAgent: "CHA Supervisor: K. V. Rao",
      },
      {
        id: "m3",
        stageName: "In Transit",
        location: "In-Flight Corridor",
        facility: "En route HYD -> FRA Flight AI-121",
        timestamp: "2026-09-30T02:15:00Z",
        status: "upcoming",
        description: "Scheduled non-stop widebody departure with live thermal data logging.",
      },
      {
        id: "m4",
        stageName: "Out for Delivery",
        location: "Frankfurt Airport Terminal",
        facility: "Lufthansa Cargo Cool Center",
        timestamp: "2026-10-01T08:00:00Z",
        status: "upcoming",
        description: "Reefer truck dispatch to distributor European central warehouse.",
      },
      {
        id: "m5",
        stageName: "Delivered",
        location: "Wiesbaden Pharma Logistics Center",
        facility: "Warehouse Gate D",
        timestamp: "2026-10-01T14:30:00Z",
        status: "upcoming",
        description: "GDP Certificate of Handover verified.",
      }
    ],
    telemetry: {
      temperatureCelsius: 4.2,
      targetTempCelsius: 4.0,
      lastPingTime: "5 mins ago",
      latitude: 17.2403,
      longitude: 78.4294,
      locationName: "GMR Hyderabad Air Cargo Cold-Room Bay 4",
      sealNumber: "GMR-PHARMA-99120",
      gpsBatteryPercent: 99
    },
    createdAt: "2026-09-28T08:45:00Z",
    updatedAt: "2026-09-29T13:20:00Z"
  },
  {
    id: "SHP-2025-003",
    trackingNumber: "BWL-BL-948201",
    type: "BL",
    bookingRef: "BK-OCN-1052",
    billOfLading: "BWL-BL-948201",
    containerNumber: "BWLU882310",
    customerName: "Tata Precision Auto Engineering",
    cargoDescription: "Automotive Transmission Assemblies (Heavy Machinery)",
    cargoClassification: "General Industrial Dry Cargo (FCL)",
    grossWeightKg: 52000,
    volumeLitersOrCbm: "2 x 40ft High Cube Containers",
    mode: "OCEAN_FCL",
    vesselOrCarrierName: "MSC Clorinda (Voyage 2603W)",
    originPortOrCity: "Chennai Port (MAA)",
    originCountry: "India",
    destinationPortOrCity: "Jebel Ali Port (DXB)",
    destinationCountry: "United Arab Emirates",
    departureDate: "2026-09-20T14:00:00Z",
    estimatedDeliveryDate: "2026-09-30T10:00:00Z",
    currentMilestoneIndex: 3,
    status: "Out for Delivery",
    milestones: [
      {
        id: "m1",
        stageName: "Booking Confirmed",
        location: "Chennai Port Office",
        facility: "BWL Coastal Hub",
        timestamp: "2026-09-18T10:00:00Z",
        status: "completed",
        description: "Booking confirmed with MSC line. 2 x 40ft HC containers stuffed at Sriperumbudur.",
      },
      {
        id: "m2",
        stageName: "Customs Cleared",
        location: "Chennai Sea Customs",
        facility: "CITPL Terminal",
        timestamp: "2026-09-19T16:30:00Z",
        status: "completed",
        description: "Export customs check & container laser seal scanned.",
      },
      {
        id: "m3",
        stageName: "In Transit",
        location: "Arabian Sea Maritime Route",
        facility: "Vessel MSC Clorinda",
        timestamp: "2026-09-25T12:00:00Z",
        status: "completed",
        description: "Arrived at Jebel Ali Berths 14-16; discharged without demurrage.",
      },
      {
        id: "m4",
        stageName: "Out for Delivery",
        location: "Jebel Ali Freezone (JAFZA)",
        facility: "North Gate Logistics Terminal",
        timestamp: "2026-09-29T10:30:00Z",
        status: "current",
        description: "Customs import clearance in UAE completed. Loaded on heavy transport for delivery.",
      },
      {
        id: "m5",
        stageName: "Delivered",
        location: "Dubai Industrial City",
        facility: "Tata Regional Assembly Plant",
        timestamp: "2026-09-30T10:00:00Z",
        status: "upcoming",
        description: "Unloading scheduled with mobile crane.",
      }
    ],
    telemetry: {
      lastPingTime: "25 mins ago",
      latitude: 24.9857,
      longitude: 55.0273,
      locationName: "Jebel Ali Port Terminal 2 Road, Dubai",
      speedKmph: 48,
      heading: "Northeast",
      sealNumber: "MSC-SL-551029",
      gpsBatteryPercent: 88
    },
    createdAt: "2026-09-18T09:00:00Z",
    updatedAt: "2026-09-29T10:30:00Z"
  },
  {
    id: "SHP-2025-004",
    trackingNumber: "BWLU492015",
    type: "CONTAINER",
    bookingRef: "BK-GLY-8012",
    containerNumber: "BWLU492015",
    customerName: "Godrej Consumer Products Ltd",
    cargoDescription: "Refined Glycerine 99.7% USP Grade",
    cargoClassification: "Non-Hazardous Bulk Liquid (Food & Cosmetic Grade)",
    grossWeightKg: 26000,
    volumeLitersOrCbm: "26,000 Litres",
    mode: "ISO_TANK",
    vesselOrCarrierName: "BWL Dedicated Intermodal Road Fleet (Volvo FMX)",
    originPortOrCity: "Mundra Port (Gujarat)",
    originCountry: "India",
    destinationPortOrCity: "Baddi Industrial Area (Himachal Pradesh)",
    destinationCountry: "India",
    departureDate: "2026-09-23T06:00:00Z",
    estimatedDeliveryDate: "2026-09-27T17:00:00Z",
    actualDeliveryDate: "2026-09-27T16:15:00Z",
    currentMilestoneIndex: 4,
    status: "Delivered",
    milestones: [
      {
        id: "m1",
        stageName: "Booking Confirmed",
        location: "Mundra Port Office",
        facility: "BWL Mundra Tank Farm",
        timestamp: "2026-09-21T09:00:00Z",
        status: "completed",
        description: "Tank filled under sterile nitrogen blanketing.",
      },
      {
        id: "m2",
        stageName: "Customs Cleared",
        location: "Mundra Port Customs",
        facility: "Adani Ports Terminal Gate 2",
        timestamp: "2026-09-22T14:00:00Z",
        status: "completed",
        description: "Duty documentation & test certificate verified.",
      },
      {
        id: "m3",
        stageName: "In Transit",
        location: "Western Dedicated Freight Corridor",
        facility: "Palanpur-Rewari Section",
        timestamp: "2026-09-25T11:00:00Z",
        status: "completed",
        description: "Expedited rail corridor crossing into Northern Hub.",
      },
      {
        id: "m4",
        stageName: "Out for Delivery",
        location: "Chandigarh-Baddi Bypass",
        facility: "Himachal Logistics Corridor",
        timestamp: "2026-09-27T08:30:00Z",
        status: "completed",
        description: "First-mile trailer escort to recipient manufacturing site.",
      },
      {
        id: "m5",
        stageName: "Delivered",
        location: "Baddi Industrial Estate",
        facility: "Godrej Manufacturing Plant Tank Battery 2",
        timestamp: "2026-09-27T16:15:00Z",
        status: "completed",
        description: "Discharge complete, zero ullage variance, signed e-POD archived.",
      }
    ],
    telemetry: {
      temperatureCelsius: 24.1,
      pressureBar: 0.05,
      lastPingTime: "Archive Status (Delivery Complete)",
      latitude: 30.9578,
      longitude: 76.7914,
      locationName: "Delivered at Baddi Hub",
      sealNumber: "BWL-SEAL-77192",
      gpsBatteryPercent: 100
    },
    createdAt: "2026-09-21T08:00:00Z",
    updatedAt: "2026-09-27T16:15:00Z"
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-2025-01",
    _id: "INQ-2025-01",
    companyName: "Hetero Drugs Limited",
    contactPerson: "Dr. Suresh Reddy",
    email: "suresh.reddy@heterodrugs.com",
    phone: "+91 9849012345",
    cargoType: "Liquid Solvents (Toluene / Ethyl Acetate)",
    origin: "JNPT Mumbai",
    destination: "Jeddah Islamic Port, Saudi Arabia",
    message: "Require 15 x 25,000L T11 ISO Tanks monthly on long-term contract with heating coils and continuous temperature telemetry.",
    quoteReference: "BWL-QT-2025-8812",
    status: "New",
    internalNotes: "Key accounts manager assigned. Commercial proposal draft in progress.",
    createdAt: "2026-09-28T14:15:00Z",
    updatedAt: "2026-09-28T14:15:00Z"
  },
  {
    id: "INQ-2025-02",
    _id: "INQ-2025-02",
    companyName: "Greenko Energy Holdings",
    contactPerson: "Ananya Sen",
    email: "ananya.sen@greenko.net",
    phone: "+91 9908123890",
    cargoType: "Heavy Transformer & Wind Turbine Components",
    origin: "Mundra Port, Gujarat",
    destination: "Kurnool Solar & Wind Park, Andhra Pradesh",
    message: "Multimodal rail + hydraulic axle trailer transport needed for 8 oversize project cargo units.",
    quoteReference: "BWL-QT-2025-7791",
    status: "Contacted",
    internalNotes: "Route survey initiated between Guntakal and Kurnool. Quotation sent.",
    createdAt: "2026-09-27T11:00:00Z",
    updatedAt: "2026-09-28T09:30:00Z"
  },
  {
    id: "INQ-2025-03",
    _id: "INQ-2025-03",
    companyName: "Coromandel International",
    contactPerson: "V. Venkatraman",
    email: "v.venkat@coromandel.biz",
    phone: "+91 8912345678",
    cargoType: "Phosphoric Acid Bulk Liquid",
    origin: "Visakhapatnam Port",
    destination: "Kakinada Fertilizer Complex",
    message: "Looking for dedicated rubber-lined / acid-grade ISO tanks with emergency valve closure systems.",
    quoteReference: "BWL-QT-2025-6604",
    status: "Closed",
    internalNotes: "Contract executed for 6-month seasonal shipment cycle.",
    createdAt: "2026-09-20T16:45:00Z",
    updatedAt: "2026-09-25T14:00:00Z"
  }
];

export const FLEET_SPECIFICATIONS: FleetSpecification[] = [
  {
    id: "iso-t11-standard",
    name: "T11 Standard ISO Tank Container (24,000L - 26,000L)",
    category: "ISO Tank Container",
    capacity: "24,000 to 26,000 Litres (6,340 - 6,868 US Gallons)",
    dimensions: {
      length: "6,058 mm (20 ft ISO Frame)",
      width: "2,438 mm (8 ft)",
      height: "2,591 mm (8 ft 6 in)",
      internalVolume: "25.0 m³"
    },
    tareWeight: "3,820 kg (8,421 lbs)",
    maxGrossWeight: "36,000 kg (79,365 lbs)",
    payloadCapacity: "32,180 kg (70,944 lbs)",
    hazardRating: "IMO Class 3, 6.1, 8, 9 & Non-Hazardous Food Grade",
    workingPressure: "4.0 Bar (58.0 PSI) / Test Pressure: 6.0 Bar",
    heatingSystem: "External Steam Heating Coils (6.5 m² heating surface) + Electrical trace heating optional",
    insulation: "50 mm Rockwool insulation with GRP / Marine Aluminium cladding",
    valveConfig: "3-inch High Cleanliness Bottom Discharge Footvalve + Syphon Top Discharge optional",
    suitableCargo: [
      "Specialty Chemical Solvents",
      "Pharmaceutical Liquid APIs",
      "Petrochemicals & Bio-Fuels",
      "Food Grade Edible Oils & Glycerine",
      "High Purity Electronic Chemicals"
    ],
    imageUrl: "/images/iso-tank.jpg",
    certifications: ["IMDG", "RID/ADR", "US DOT CFR 49", "ISO 1496-3", "CSC Certified", "TIR Approved"],
    features: [
      "Real-time IoT temperature & pressure satellite telemetry",
      "High-grade 316L pickled & passivated stainless steel shell",
      "Integrated earth lug & burst disc with pressure manometer",
      "Walkway with non-slip foldable safety handrail"
    ]
  },
  {
    id: "iso-t14-acid",
    name: "T14 Heavy Acid & Corrosive Lined ISO Tank (21,000L)",
    category: "ISO Tank Container",
    capacity: "21,000 Litres (5,547 US Gallons)",
    dimensions: {
      length: "6,058 mm (20 ft ISO Frame)",
      width: "2,438 mm (8 ft)",
      height: "2,591 mm (8 ft 6 in)",
      internalVolume: "21.0 m³"
    },
    tareWeight: "4,250 kg",
    maxGrossWeight: "36,000 kg",
    payloadCapacity: "31,750 kg",
    hazardRating: "IMO Class 8 Corrosives (UN 1789, UN 1830, UN 1805)",
    workingPressure: "4.0 Bar / Test Pressure: 6.0 Bar",
    heatingSystem: "Non-heated (chemically inert insulated)",
    insulation: "High-density polyurethane foam 50 mm",
    valveConfig: "Top Discharge Only with PTFE syphon pipe & Hastelloy C276 burst disc",
    suitableCargo: [
      "Hydrochloric Acid (HCl)",
      "Sulfuric Acid (H2SO4)",
      "Phosphoric Acid",
      "Caustic Soda Liquid",
      "Corrosive Etchants"
    ],
    imageUrl: "/images/iso-tank.jpg",
    certifications: ["IMDG Class 8", "ASME Section VIII", "ADR/RID", "Lloyds Register Certified"],
    features: [
      "Internal 4.0 mm Bromobutyl Rubber or Chemline 784 lining",
      "100% top discharge safely eliminating bottom-leakage risk",
      "Ultrasonic wall-thickness validation every 12 months",
      "Spill containment coaming on dome collar"
    ]
  },
  {
    id: "ocean-40-highcube",
    name: "40ft High Cube Ocean Intermodal Container",
    category: "Ocean Dry Container",
    capacity: "76.4 m³ (2,698 cu.ft)",
    dimensions: {
      length: "12,192 mm (40 ft)",
      width: "2,438 mm (8 ft)",
      height: "2,896 mm (9 ft 6 in High Cube)",
      internalVolume: "76.4 CBM"
    },
    tareWeight: "3,900 kg",
    maxGrossWeight: "32,500 kg",
    payloadCapacity: "28,600 kg",
    hazardRating: "General Industrial / DG Packed Cargo with IMO Declaration",
    workingPressure: "Atmospheric",
    suitableCargo: [
      "Heavy Machinery & Engineering Goods",
      "Electronics & Solar Modules",
      "Textiles & Garment Consignments",
      "Dry Bulk Packed in Big Bags",
      "Automotive Spares & Assemblies"
    ],
    imageUrl: "/images/ocean-vessel.jpg",
    certifications: ["ISO 668", "CSC Safety Approval", "TIR", "UIC 592"],
    features: [
      "Corten steel rust-resistant corrugated structure",
      "High cube 9'6\" clearance for over-height cargo stacking",
      "28mm heavy-duty marine hardwood flooring",
      "Tamper-evident high-security RFID lock brackets"
    ]
  },
  {
    id: "reefer-40-coldchain",
    name: "40ft High Cube Multi-Temp Cold Chain Reefer",
    category: "Special Equipment",
    capacity: "67.5 m³ (2,384 cu.ft)",
    dimensions: {
      length: "12,192 mm (40 ft)",
      width: "2,438 mm (8 ft)",
      height: "2,896 mm (9 ft 6 in)",
      internalVolume: "67.5 CBM"
    },
    tareWeight: "4,680 kg",
    maxGrossWeight: "34,000 kg",
    payloadCapacity: "29,320 kg",
    hazardRating: "Cold Chain Pharma & Perishables",
    workingPressure: "Temperature range: -30°C to +30°C",
    heatingSystem: "Integrated Carrier Transicold PrimeLINE or Daikin Hot-Gas Defrost",
    insulation: "Non-CFC high density polyurethane foam 75 mm",
    suitableCargo: [
      "Biopharmaceutical Vaccines & Active APIs",
      "Frozen Seafood & Marine Exports",
      "Fresh Fruits & Floriculture",
      "Confectionery & Temperature-sensitive Dairy",
      "Specialty Adhesives & Composite Prepregs"
    ],
    imageUrl: "/images/warehouse-cfs.jpg",
    certifications: ["GDP Pharma Compliant", "ATP Certified", "ISO 1496-2"],
    features: [
      "Dual compressor redundancy with automatic fallback",
      "Continuous digital data logging with remote telematics",
      "Dehumidification control (50% - 95% RH)",
      "Equipped with clip-on diesel gensets for rail/road transit"
    ]
  },
  {
    id: "air-cargo-uld",
    name: "IATA Air Cargo ULD (Type PMC / AKE Pharma Container)",
    category: "Air Cargo ULD",
    capacity: "11.5 m³ (PMC Pallet) / 4.3 m³ (AKE Container)",
    dimensions: {
      length: "3,175 mm (125 in)",
      width: "2,438 mm (96 in)",
      height: "1,626 mm (64 in contoured)",
      internalVolume: "11.5 CBM"
    },
    tareWeight: "115 kg (Pallet) / 78 kg (AKE)",
    maxGrossWeight: "6,800 kg (PMC) / 1,588 kg (AKE)",
    payloadCapacity: "6,685 kg",
    hazardRating: "IATA DGR Approved Unit",
    suitableCargo: [
      "Urgent Critical Pharma & Clinical Trial Materials",
      "High Value Aerospace Components",
      "Semiconductors & Electronic Sub-systems",
      "Express Diplomatic & High Security Cargo"
    ],
    imageUrl: "/images/air-freight.jpg",
    certifications: ["IATA DGR", "FAA TSO C90c", "EASA ETSO C90c"],
    features: [
      "Direct priority airside loading at Hyderabad RGIA Airport",
      "Compatible with widebody aircraft (B777F, A350, B747-8F)",
      "Quick thermal blanket wrapping (Qualified to CRT 15-25°C)",
      "Zero-downtime express customs clearing at destination"
    ]
  }
];

export const CORE_SERVICES_DATA = [
  {
    id: "iso-tank",
    title: "ISO Tank Container Logistics",
    shortDesc: "End-to-end multimodal transport for bulk hazardous chemicals, pharmaceuticals, and food-grade liquids across 1,708+ ISO tanks.",
    icon: "ShieldAlert",
    image: "/images/iso-tank.jpg",
    features: [
      "Dedicated 24k - 26k Litre T11/T14/T50 Tanks",
      "Steam & electrical heating for viscous liquid cargo",
      "Real-time IoT temperature & pressure telemetry",
      "Zero Liquid Discharge (ZLD) certified cleaning stations"
    ],
    stats: "1,708+ ISO Tanks in Pan-India Fleet",
    href: "/services?tab=iso-tank"
  },
  {
    id: "ocean-freight",
    title: "Ocean Freight (FCL / LCL & NVOCC)",
    shortDesc: "Premier global ocean container services covering 140+ international ports with competitive contract freight rates and guaranteed slot protection.",
    icon: "Anchor",
    image: "/images/ocean-vessel.jpg",
    features: [
      "FCL full container load & LCL buyer consolidation",
      "Direct port connectivity: JNPT, Chennai, Mundra, Vizag",
      "Reefer, Open Top, Flat Rack & Project cargo handling",
      "Multimodal Bill of Lading (MTO Act 1993 registered)"
    ],
    stats: "140+ Global Ports Connected",
    href: "/services?tab=ocean-freight"
  },
  {
    id: "air-freight",
    title: "Air Freight (IATA Accredited)",
    shortDesc: "IATA accredited international and domestic air cargo services with direct block-space agreements via Hyderabad RGIA and major Indian hubs.",
    icon: "Plane",
    image: "/images/air-freight.jpg",
    features: [
      "Temperature-controlled pharma cold-chain corridors",
      "Dangerous Goods (DGR) certified specialist handling",
      "Time-critical AOG (Aircraft On Ground) emergency express",
      "Charter flight arrangements for oversize cargo"
    ],
    stats: "IATA Accredited Direct Carrier Space",
    href: "/services?tab=air-freight"
  },
  {
    id: "rail-surface",
    title: "Surface & Intermodal Rail Freight",
    shortDesc: "High-efficiency rail container movement via CONCOR & private freight rakes linked to 100+ GPS-tracked road trailers for seamless first/last-mile drayage.",
    icon: "Train",
    image: "/images/rail-freight.jpg",
    features: [
      "Direct ICD connectivity (Sanathnagar & Thimmapur)",
      "Up to 68% lower carbon emissions vs pure road haulage",
      "Double-stack container rakes from Western ports",
      "24/7 GPS satellite tracking with geofencing alerts"
    ],
    stats: "100+ GPS Trailers & Intermodal Rakes",
    href: "/services?tab=rail-surface"
  },
  {
    id: "customs-cha",
    title: "Customs Clearance (CHA)",
    shortDesc: "Licensed Customs House Agent operations with in-depth regulatory mastery in Indian Sea Ports, Air Cargo Terminals, and Inland Container Depots.",
    icon: "FileCheck",
    image: "/images/hero-port.jpg",
    features: [
      "Fast-track clearance under ICEGATE 2.0 system",
      "GSP, SAFTA, SAAPTA, CEPA duty optimization advisory",
      "Specialized chemical, DG and Pharma ADC approvals",
      "AEO-LO Tier-2 expedited document compliance"
    ],
    stats: "4-Hour Fast Track Average Turnaround",
    href: "/services?tab=customs-cha"
  },
  {
    id: "warehousing-vas",
    title: "Warehousing & Value-Added Services",
    shortDesc: "State-of-the-art container freight stations, bonded storage, ISO tank periodic hydro-testing, fumigation, palletization, and custom kitting.",
    icon: "Warehouse",
    image: "/images/warehouse-cfs.jpg",
    features: [
      "Temperature-zoned warehousing (ambient, 15-25°C, 2-8°C)",
      "Container stuffing, de-stuffing & laser-assisted lashing",
      "5-Year statutory ISO tank hydro-testing & PTI facility",
      "WMS with barcode and real-time inventory visibility"
    ],
    stats: "500,000+ sq.ft CFS & Storage Network",
    href: "/services?tab=warehousing-vas"
  }
];

export const NETWORK_HUBS = [
  { name: "Hyderabad Central HQ & ICD", role: "Corporate HQ & Rail ICD Sanathnagar/Thimmapur Hub", type: "headquarters", coords: [17.3850, 78.4867] },
  { name: "Mumbai (JNPT Nhava Sheva)", role: "Western Gateway Ocean Port & Tank Yard", type: "sea_port", coords: [18.9499, 72.9515] },
  { name: "Chennai Port & CFS", role: "Eastern Gateway & Automotive Corridor", type: "sea_port", coords: [13.0827, 80.2707] },
  { name: "Mundra Port (Gujarat)", role: "North-West Bulk Liquid & Chemical Hub", type: "sea_port", coords: [22.8394, 69.7258] },
  { name: "Visakhapatnam (Vizag)", role: "East Coast Bulk Liquid & Heavy Cargo Gateway", type: "sea_port", coords: [17.6868, 83.2185] },
  { name: "Kolkata & Haldia Port", role: "Northeastern Hinterland & Bangladesh Corridor", type: "sea_port", coords: [22.5726, 88.3639] },
  { name: "Delhi NCR (Tughlakabad ICD)", role: "Northern Intermodal Rail Destination", type: "inland_depot", coords: [28.5139, 77.2917] },
  { name: "Dubai (Jebel Ali)", role: "Middle East Transshipment Hub", type: "international", coords: [24.9857, 55.0273] },
  { name: "Singapore Gateway", role: "Southeast Asia NVOCC Hub", type: "international", coords: [1.3521, 103.8198] },
  { name: "Rotterdam Port", role: "European Chemical Cluster", type: "international", coords: [51.9244, 4.4777] }
];
