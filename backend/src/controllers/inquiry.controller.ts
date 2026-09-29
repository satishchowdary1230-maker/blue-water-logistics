import { Request, Response } from 'express';
import { BackendDataStore } from '../store/dataStore';
import { InquiryStatus } from '../types';

export async function getInquiriesHandler(req: Request, res: Response): Promise<void> {
  try {
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;

    const inquiries = await BackendDataStore.getAllInquiries(status, search);

    res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, error: 'Internal server error while retrieving inquiries.' });
  }
}

export async function createInquiryHandler(req: Request, res: Response): Promise<void> {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      cargoType,
      origin,
      destination,
      message,
      quoteReference
    } = req.body;

    if (!companyName?.trim()) {
      res.status(400).json({ success: false, error: 'Company Name is required.' });
      return;
    }
    if (!contactPerson?.trim()) {
      res.status(400).json({ success: false, error: 'Contact Person name is required.' });
      return;
    }
    if (!email?.trim() || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Valid business email is required.' });
      return;
    }
    if (!phone?.trim()) {
      res.status(400).json({ success: false, error: 'Phone number is required.' });
      return;
    }
    if (!cargoType?.trim()) {
      res.status(400).json({ success: false, error: 'Cargo type is required.' });
      return;
    }
    if (!origin?.trim()) {
      res.status(400).json({ success: false, error: 'Origin city/port is required.' });
      return;
    }
    if (!destination?.trim()) {
      res.status(400).json({ success: false, error: 'Destination city/port is required.' });
      return;
    }
    if (!message?.trim()) {
      res.status(400).json({ success: false, error: 'Message / inquiry details are required.' });
      return;
    }

    const created = await BackendDataStore.createInquiry({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      cargoType: cargoType.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      message: message.trim(),
      quoteReference: quoteReference || undefined,
      status: 'New',
      internalNotes: ''
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our multimodal logistics desk will contact you within 2 business hours.',
      inquiry: created
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to submit inquiry.' });
  }
}

export async function updateInquiryStatusHandler(req: Request, res: Response): Promise<void> {
  try {
    const { id, status, internalNotes } = req.body;

    if (!id || !status) {
      res.status(400).json({ success: false, error: 'Inquiry ID and new status are required.' });
      return;
    }

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid status. Must be New, Contacted, or Closed.' });
      return;
    }

    const updated = await BackendDataStore.updateInquiryStatus(id, status as InquiryStatus, internalNotes);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Inquiry not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Inquiry status updated successfully.',
      inquiry: updated
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to update inquiry status.' });
  }
}
