import { Shipment, Inquiry, ShipmentStatus } from '../types';
import { INITIAL_SHIPMENTS, INITIAL_INQUIRIES } from '../seedData';
import { connectToDatabase } from './mongodb';
import { InquiryModel } from './models/Inquiry';
import { ShipmentModel } from './models/Shipment';

// Global singleton in-memory state to survive hot-reloads during dev
declare global {
  // eslint-disable-next-line no-var
  var __bwl_shipments: Shipment[] | undefined;
  // eslint-disable-next-line no-var
  var __bwl_inquiries: Inquiry[] | undefined;
}

if (!global.__bwl_shipments) {
  global.__bwl_shipments = JSON.parse(JSON.stringify(INITIAL_SHIPMENTS));
}

if (!global.__bwl_inquiries) {
  global.__bwl_inquiries = JSON.parse(JSON.stringify(INITIAL_INQUIRIES));
}

export class BwlDataStore {
  // SHIPMENT OPERATIONS
  static async getShipmentByTrackingNumber(trackingQuery: string): Promise<Shipment | null> {
    const cleanQuery = trackingQuery.trim().toUpperCase();

    // 1. Try MongoDB if connected
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const mongoShipment = await ShipmentModel.findOne({
          $or: [
            { trackingNumber: cleanQuery },
            { containerNumber: cleanQuery },
            { billOfLading: cleanQuery },
            { airWaybill: cleanQuery },
            { bookingRef: cleanQuery }
          ]
        }).lean();

        if (mongoShipment) {
          return {
            id: mongoShipment._id.toString(),
            trackingNumber: mongoShipment.trackingNumber,
            type: mongoShipment.type,
            bookingRef: mongoShipment.bookingRef,
            billOfLading: mongoShipment.billOfLading,
            airWaybill: mongoShipment.airWaybill,
            containerNumber: mongoShipment.containerNumber,
            customerName: mongoShipment.customerName,
            cargoDescription: mongoShipment.cargoDescription,
            cargoClassification: mongoShipment.cargoClassification,
            hazardClass: mongoShipment.hazardClass,
            grossWeightKg: mongoShipment.grossWeightKg,
            volumeLitersOrCbm: mongoShipment.volumeLitersOrCbm,
            mode: mongoShipment.mode,
            vesselOrCarrierName: mongoShipment.vesselOrCarrierName,
            originPortOrCity: mongoShipment.originPortOrCity,
            originCountry: mongoShipment.originCountry,
            destinationPortOrCity: mongoShipment.destinationPortOrCity,
            destinationCountry: mongoShipment.destinationCountry,
            departureDate: mongoShipment.departureDate,
            estimatedDeliveryDate: mongoShipment.estimatedDeliveryDate,
            actualDeliveryDate: mongoShipment.actualDeliveryDate,
            currentMilestoneIndex: mongoShipment.currentMilestoneIndex,
            status: mongoShipment.status,
            milestones: mongoShipment.milestones || [],
            telemetry: mongoShipment.telemetry,
            createdAt: mongoShipment.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: mongoShipment.updatedAt?.toISOString?.() || new Date().toISOString(),
          } as Shipment;
        }
      }
    } catch (e) {
      console.warn("MongoDB shipment query error, falling back to memory store:", e);
    }

    // 2. Memory store fallback
    const list = global.__bwl_shipments || INITIAL_SHIPMENTS;
    const found = list.find((s) => 
      s.trackingNumber.toUpperCase() === cleanQuery ||
      s.containerNumber?.toUpperCase() === cleanQuery ||
      s.billOfLading?.toUpperCase() === cleanQuery ||
      s.airWaybill?.toUpperCase() === cleanQuery ||
      s.bookingRef?.toUpperCase() === cleanQuery
    );

    return found ? JSON.parse(JSON.stringify(found)) : null;
  }

  static async getAllShipments(): Promise<Shipment[]> {
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const mongoShipments = await ShipmentModel.find({}).sort({ updatedAt: -1 }).lean();
        if (mongoShipments.length > 0) {
          return mongoShipments.map((s) => ({
            ...s,
            id: s._id.toString(),
            createdAt: s.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: s.updatedAt?.toISOString?.() || new Date().toISOString(),
          })) as unknown as Shipment[];
        }
      }
    } catch (e) {
      console.warn("MongoDB find error, falling back to memory store:", e);
    }

    return JSON.parse(JSON.stringify(global.__bwl_shipments || INITIAL_SHIPMENTS));
  }

  static async updateMilestone(
    trackingNumber: string,
    newStatus: ShipmentStatus,
    newMilestoneIndex: number,
    locationNote?: string
  ): Promise<Shipment | null> {
    const cleanQuery = trackingNumber.trim().toUpperCase();

    // 1. Update in Memory store
    const list = global.__bwl_shipments || [];
    const index = list.findIndex((s) => s.trackingNumber.toUpperCase() === cleanQuery);
    
    if (index !== -1) {
      const target = list[index];
      target.status = newStatus;
      target.currentMilestoneIndex = newMilestoneIndex;
      target.updatedAt = new Date().toISOString();

      // update milestone statuses
      target.milestones = target.milestones.map((m, idx) => {
        if (idx < newMilestoneIndex) {
          return { ...m, status: 'completed' };
        } else if (idx === newMilestoneIndex) {
          return {
            ...m,
            status: 'current',
            timestamp: new Date().toISOString(),
            notes: locationNote || m.notes,
          };
        } else {
          return { ...m, status: 'upcoming' };
        }
      });

      if (target.telemetry && locationNote) {
        target.telemetry.lastPingTime = 'Just now (Live Update)';
        target.telemetry.locationName = locationNote;
      }

      list[index] = target;
    }

    // 2. Sync to MongoDB if available
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await ShipmentModel.findOneAndUpdate(
          { trackingNumber: cleanQuery },
          {
            $set: {
              status: newStatus,
              currentMilestoneIndex: newMilestoneIndex,
              updatedAt: new Date(),
            }
          }
        );
      }
    } catch (e) {
      console.warn("Failed to sync milestone to MongoDB:", e);
    }

    return index !== -1 ? JSON.parse(JSON.stringify(list[index])) : null;
  }

  // INQUIRY OPERATIONS
  static async getAllInquiries(statusFilter?: string, searchQuery?: string): Promise<Inquiry[]> {
    try {
      const conn = await connectToDatabase();
      if (conn) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        if (statusFilter && statusFilter !== 'All') {
          query.status = statusFilter;
        }
        if (searchQuery) {
          query.$or = [
            { companyName: { $regex: searchQuery, $options: 'i' } },
            { contactPerson: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            { quoteReference: { $regex: searchQuery, $options: 'i' } },
          ];
        }

        const mongoInquiries = await InquiryModel.find(query).sort({ createdAt: -1 }).lean();
        if (mongoInquiries.length > 0) {
          return mongoInquiries.map((inq) => ({
            id: inq._id.toString(),
            _id: inq._id.toString(),
            companyName: inq.companyName,
            contactPerson: inq.contactPerson,
            email: inq.email,
            phone: inq.phone,
            cargoType: inq.cargoType,
            origin: inq.origin,
            destination: inq.destination,
            message: inq.message,
            quoteReference: inq.quoteReference,
            status: inq.status,
            internalNotes: inq.internalNotes,
            createdAt: inq.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: inq.updatedAt?.toISOString?.() || new Date().toISOString(),
          })) as Inquiry[];
        }
      }
    } catch (e) {
      console.warn("MongoDB inquiries error, falling back to memory store:", e);
    }

    let list = global.__bwl_inquiries || INITIAL_INQUIRIES;
    if (statusFilter && statusFilter !== 'All') {
      list = list.filter((i) => i.status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((i) => 
        i.companyName.toLowerCase().includes(q) ||
        i.contactPerson.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.quoteReference && i.quoteReference.toLowerCase().includes(q))
      );
    }

    return JSON.parse(JSON.stringify(list));
  }

  static async createInquiry(data: Omit<Inquiry, 'id' | '_id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: 'New' | 'Contacted' | 'Closed' }): Promise<Inquiry> {
    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      id: `INQ-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: data.companyName,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      cargoType: data.cargoType,
      origin: data.origin,
      destination: data.destination,
      message: data.message,
      quoteReference: data.quoteReference,
      status: data.status || 'New',
      internalNotes: data.internalNotes || '',
      createdAt: now,
      updatedAt: now,
    };
    newInquiry._id = newInquiry.id;

    // 1. Add to memory store
    if (!global.__bwl_inquiries) {
      global.__bwl_inquiries = [...INITIAL_INQUIRIES];
    }
    global.__bwl_inquiries.unshift(newInquiry);

    // 2. Persist to MongoDB if available
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await InquiryModel.create({
          companyName: newInquiry.companyName,
          contactPerson: newInquiry.contactPerson,
          email: newInquiry.email,
          phone: newInquiry.phone,
          cargoType: newInquiry.cargoType,
          origin: newInquiry.origin,
          destination: newInquiry.destination,
          message: newInquiry.message,
          quoteReference: newInquiry.quoteReference,
          status: newInquiry.status,
          internalNotes: newInquiry.internalNotes,
        });
        newInquiry.id = created._id.toString();
        newInquiry._id = created._id.toString();
      }
    } catch (e) {
      console.warn("Failed to persist inquiry to MongoDB, saved to memory store:", e);
    }

    return newInquiry;
  }

  static async updateInquiryStatus(id: string, status: 'New' | 'Contacted' | 'Closed', internalNotes?: string): Promise<Inquiry | null> {
    const list = global.__bwl_inquiries || [];
    const index = list.findIndex((i) => i.id === id || i._id === id);

    if (index !== -1) {
      list[index].status = status;
      if (internalNotes !== undefined) {
        list[index].internalNotes = internalNotes;
      }
      list[index].updatedAt = new Date().toISOString();
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await InquiryModel.findByIdAndUpdate(
          id,
          {
            $set: {
              status,
              ...(internalNotes !== undefined ? { internalNotes } : {}),
              updatedAt: new Date(),
            }
          }
        );
      }
    } catch (e) {
      console.warn("Failed to update inquiry status in MongoDB:", e);
    }

    return index !== -1 ? JSON.parse(JSON.stringify(list[index])) : null;
  }
}
