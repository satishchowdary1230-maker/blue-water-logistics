import { Shipment, Inquiry, ShipmentStatus } from '../types';
import { INITIAL_SHIPMENTS, INITIAL_INQUIRIES } from './seedData';
import { InquiryModel } from '../models/Inquiry';
import { ShipmentModel } from '../models/Shipment';
import mongoose from 'mongoose';

let memoryShipments: Shipment[] = JSON.parse(JSON.stringify(INITIAL_SHIPMENTS));
let memoryInquiries: Inquiry[] = JSON.parse(JSON.stringify(INITIAL_INQUIRIES));

export class BackendDataStore {
  private static isMongoConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  // SHIPMENTS
  static async getShipmentByTrackingNumber(trackingQuery: string): Promise<Shipment | null> {
    const cleanQuery = trackingQuery.trim().toUpperCase();

    if (this.isMongoConnected()) {
      try {
        const doc = await ShipmentModel.findOne({
          $or: [
            { trackingNumber: cleanQuery },
            { containerNumber: cleanQuery },
            { billOfLading: cleanQuery },
            { airWaybill: cleanQuery },
            { bookingRef: cleanQuery }
          ]
        }).lean();

        if (doc) {
          return {
            ...doc,
            id: (doc._id as mongoose.Types.ObjectId).toString(),
            createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
          } as unknown as Shipment;
        }
      } catch (err) {
        console.warn('MongoDB error fetching shipment:', err);
      }
    }

    const found = memoryShipments.find((s) => 
      s.trackingNumber.toUpperCase() === cleanQuery ||
      s.containerNumber?.toUpperCase() === cleanQuery ||
      s.billOfLading?.toUpperCase() === cleanQuery ||
      s.airWaybill?.toUpperCase() === cleanQuery ||
      s.bookingRef?.toUpperCase() === cleanQuery
    );

    return found ? JSON.parse(JSON.stringify(found)) : null;
  }

  static async getAllShipments(): Promise<Shipment[]> {
    if (this.isMongoConnected()) {
      try {
        const docs = await ShipmentModel.find({}).sort({ updatedAt: -1 }).lean();
        if (docs.length > 0) {
          return docs.map((d) => ({
            ...d,
            id: (d._id as mongoose.Types.ObjectId).toString(),
            createdAt: d.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: d.updatedAt?.toISOString?.() || new Date().toISOString(),
          })) as unknown as Shipment[];
        }
      } catch (err) {
        console.warn('MongoDB error fetching all shipments:', err);
      }
    }

    return JSON.parse(JSON.stringify(memoryShipments));
  }

  static async updateMilestone(
    trackingNumber: string,
    newStatus: ShipmentStatus,
    newMilestoneIndex: number,
    locationNote?: string
  ): Promise<Shipment | null> {
    const cleanQuery = trackingNumber.trim().toUpperCase();
    const index = memoryShipments.findIndex((s) => s.trackingNumber.toUpperCase() === cleanQuery);

    if (index !== -1) {
      const target = memoryShipments[index];
      target.status = newStatus;
      target.currentMilestoneIndex = newMilestoneIndex;
      target.updatedAt = new Date().toISOString();

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

      memoryShipments[index] = target;
    }

    if (this.isMongoConnected()) {
      try {
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
      } catch (err) {
        console.warn('MongoDB milestone sync error:', err);
      }
    }

    return index !== -1 ? JSON.parse(JSON.stringify(memoryShipments[index])) : null;
  }

  // INQUIRIES
  static async getAllInquiries(statusFilter?: string, searchQuery?: string): Promise<Inquiry[]> {
    if (this.isMongoConnected()) {
      try {
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

        const docs = await InquiryModel.find(query).sort({ createdAt: -1 }).lean();
        if (docs.length > 0) {
          return docs.map((inq) => ({
            id: (inq._id as mongoose.Types.ObjectId).toString(),
            _id: (inq._id as mongoose.Types.ObjectId).toString(),
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
      } catch (err) {
        console.warn('MongoDB inquiries error:', err);
      }
    }

    let list = memoryInquiries;
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

    memoryInquiries.unshift(newInquiry);

    if (this.isMongoConnected()) {
      try {
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
      } catch (err) {
        console.warn('MongoDB inquiry create error:', err);
      }
    }

    return newInquiry;
  }

  static async updateInquiryStatus(id: string, status: 'New' | 'Contacted' | 'Closed', internalNotes?: string): Promise<Inquiry | null> {
    const index = memoryInquiries.findIndex((i) => i.id === id || i._id === id);

    if (index !== -1) {
      memoryInquiries[index].status = status;
      if (internalNotes !== undefined) {
        memoryInquiries[index].internalNotes = internalNotes;
      }
      memoryInquiries[index].updatedAt = new Date().toISOString();
    }

    if (this.isMongoConnected()) {
      try {
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
      } catch (err) {
        console.warn('MongoDB update inquiry status error:', err);
      }
    }

    return index !== -1 ? JSON.parse(JSON.stringify(memoryInquiries[index])) : null;
  }
}
