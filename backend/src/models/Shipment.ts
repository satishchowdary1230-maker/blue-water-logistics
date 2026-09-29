import mongoose, { Schema, Document, Model } from 'mongoose';
import { ShipmentStatus, TrackingIdentifierType, TransportMode } from '../types';

export interface IMilestoneDocument {
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

export interface IShipmentDocument extends Document {
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
  milestones: IMilestoneDocument[];
  telemetry?: {
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
  };
  createdAt: Date;
  updatedAt: Date;
}

const MilestoneSchema = new Schema<IMilestoneDocument>(
  {
    id: { type: String, required: true },
    stageName: {
      type: String,
      enum: ['Booking Confirmed', 'Customs Cleared', 'In Transit', 'Out for Delivery', 'Delivered'],
      required: true,
    },
    location: { type: String, required: true },
    facility: { type: String, required: true },
    timestamp: { type: String, required: true },
    status: {
      type: String,
      enum: ['completed', 'current', 'upcoming'],
      required: true,
    },
    description: { type: String, required: true },
    customsOfficerOrAgent: { type: String },
    notes: { type: String },
  },
  { _id: false }
);

const ShipmentSchema = new Schema<IShipmentDocument>(
  {
    trackingNumber: { type: String, required: true, unique: true, uppercase: true, index: true },
    type: { type: String, enum: ['CONTAINER', 'AWB', 'BL'], required: true },
    bookingRef: { type: String, required: true },
    billOfLading: { type: String, index: true },
    airWaybill: { type: String, index: true },
    containerNumber: { type: String, index: true },
    customerName: { type: String, required: true },
    cargoDescription: { type: String, required: true },
    cargoClassification: { type: String, required: true },
    hazardClass: { type: String },
    grossWeightKg: { type: Number, required: true },
    volumeLitersOrCbm: { type: String },
    mode: {
      type: String,
      enum: ['ISO_TANK', 'OCEAN_FCL', 'OCEAN_LCL', 'AIR_FREIGHT', 'RAIL_CARGO', 'SURFACE_TRAILER'],
      required: true,
    },
    vesselOrCarrierName: { type: String, required: true },
    originPortOrCity: { type: String, required: true },
    originCountry: { type: String, required: true },
    destinationPortOrCity: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    departureDate: { type: String, required: true },
    estimatedDeliveryDate: { type: String, required: true },
    actualDeliveryDate: { type: String },
    currentMilestoneIndex: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Booking Confirmed', 'Customs Cleared', 'In Transit', 'Out for Delivery', 'Delivered', 'On Hold / Exception'],
      required: true,
    },
    milestones: [MilestoneSchema],
    telemetry: {
      temperatureCelsius: Number,
      targetTempCelsius: Number,
      pressureBar: Number,
      maxPressureBar: Number,
      lastPingTime: String,
      latitude: Number,
      longitude: Number,
      locationName: String,
      speedKmph: Number,
      heading: String,
      sealNumber: String,
      gpsBatteryPercent: Number,
    },
  },
  { timestamps: true }
);

export const ShipmentModel: Model<IShipmentDocument> =
  mongoose.models.Shipment || mongoose.model<IShipmentDocument>('Shipment', ShipmentSchema);
