export type TrackingIdentifierType = 'CONTAINER' | 'AWB' | 'BL';

export type ShipmentStatus = 
  | 'Booking Confirmed'
  | 'Customs Cleared'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'On Hold / Exception';

export type TransportMode = 
  | 'ISO_TANK'
  | 'OCEAN_FCL'
  | 'OCEAN_LCL'
  | 'AIR_FREIGHT'
  | 'RAIL_CARGO'
  | 'SURFACE_TRAILER';

export interface Milestone {
  id: string;
  stageName: 'Booking Confirmed' | 'Customs Cleared' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  location: string;
  facility: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  customsOfficerOrAgent?: string;
  notes?: string;
}

export interface ShipmentTelemetry {
  temperatureCelsius?: number;
  targetTempCelsius?: number;
  pressureBar?: number;
  maxPressureBar?: number;
  lastPingTime: string;
  latitude: number;
  longitude: number;
  locationName: string;
  speedKmph?: number;
  heading?: string;
  sealNumber?: string;
  gpsBatteryPercent?: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  type: TrackingIdentifierType;
  bookingRef: string;
  billOfLading?: string;
  airWaybill?: string;
  containerNumber?: string;
  customerName: string;
  cargoDescription: string;
  cargoClassification: string;
  hazardClass?: string;
  grossWeightKg: number;
  volumeLitersOrCbm?: string;
  mode: TransportMode;
  vesselOrCarrierName: string;
  voyageOrFlightOrTrainNumber?: string;
  originPortOrCity: string;
  originCountry: string;
  destinationPortOrCity: string;
  destinationCountry: string;
  departureDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  currentMilestoneIndex: number;
  status: ShipmentStatus;
  milestones: Milestone[];
  telemetry?: ShipmentTelemetry;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Closed';

export interface Inquiry {
  id?: string;
  _id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  cargoType: string;
  origin: string;
  destination: string;
  message: string;
  quoteReference?: string;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FreightEstimateRequest {
  origin: string;
  destination: string;
  mode: 'ISO_TANK' | 'OCEAN_FCL' | 'AIR_FREIGHT' | 'RAIL_CARGO';
  cargoType: string;
  weightMt: number;
  volumeLiters?: number;
  volumeCbm?: number;
  temperatureControlled: boolean;
  hazardousCargo: boolean;
  hazardClass?: string;
  customsAssistanceRequired: boolean;
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export interface CostBreakdown {
  baseFreight: number;
  terminalHandlingCharges: number;
  bunkerAndFuelSurcharge: number;
  intermodalDrayage: number;
  customsDocumentationAndCHA: number;
  marineTransitInsurance: number;
  gstAmount: number;
}

export interface FreightEstimateResponse {
  quoteReference: string;
  request: FreightEstimateRequest;
  breakdown: CostBreakdown;
  subtotalInr: number;
  totalInr: number;
  approximateUsd: number;
  transitDaysMin: number;
  transitDaysMax: number;
  carbonEmissionEstKg: number;
  validUntil: string;
  recommendations: string[];
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SuperAdmin' | 'OperationsManager' | 'SupportAgent';
}
