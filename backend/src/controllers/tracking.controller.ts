import { Request, Response } from 'express';
import { BackendDataStore } from '../store/dataStore';
import { ShipmentStatus } from '../types';

export async function getShipmentHandler(req: Request, res: Response): Promise<void> {
  try {
    const query = (req.query.id as string) || (req.query.q as string);

    if (!query) {
      const all = await BackendDataStore.getAllShipments();
      res.json({ success: true, shipments: all });
      return;
    }

    const shipment = await BackendDataStore.getShipmentByTrackingNumber(query);

    if (!shipment) {
      res.status(404).json({
        success: false,
        error: `No shipment found matching "${query}". Please check the Container Number, Air Waybill, or Bill of Lading.`,
        suggestions: ['BWLU104829', '098-84729104', 'BWL-BL-948201', 'BWLU492015']
      });
      return;
    }

    res.json({ success: true, shipment });
  } catch (error) {
    console.error('Tracking API error:', error);
    res.status(500).json({ success: false, error: 'Internal server error while retrieving shipment tracking.' });
  }
}

export async function updateMilestoneHandler(req: Request, res: Response): Promise<void> {
  try {
    const { trackingNumber, status, milestoneIndex, locationNote } = req.body;

    if (!trackingNumber || !status || milestoneIndex === undefined) {
      res.status(400).json({ success: false, error: 'Missing required fields: trackingNumber, status, milestoneIndex' });
      return;
    }

    const updated = await BackendDataStore.updateMilestone(
      trackingNumber,
      status as ShipmentStatus,
      Number(milestoneIndex),
      locationNote
    );

    if (!updated) {
      res.status(404).json({ success: false, error: `Shipment with tracking number ${trackingNumber} not found.` });
      return;
    }

    res.json({
      success: true,
      message: 'Milestone and shipment status updated successfully.',
      shipment: updated
    });
  } catch (error) {
    console.error('Shipment update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update shipment milestone.' });
  }
}
