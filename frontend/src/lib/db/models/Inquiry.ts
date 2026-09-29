import mongoose, { Schema, Document, Model } from 'mongoose';
import { InquiryStatus } from '../../types';

export interface IInquiryDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema<IInquiryDocument>(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 120,
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Valid email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 25,
    },
    cargoType: {
      type: String,
      required: [true, 'Cargo type specification is required'],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, 'Origin city or port is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination city or port is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Consignment requirement details are required'],
      trim: true,
      maxlength: 2500,
    },
    quoteReference: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in Next.js hot reload
export const InquiryModel: Model<IInquiryDocument> =
  mongoose.models.Inquiry || mongoose.model<IInquiryDocument>('Inquiry', InquirySchema);
