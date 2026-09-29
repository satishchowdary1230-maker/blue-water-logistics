import { NextRequest, NextResponse } from 'next/server';
import { BwlDataStore } from '@/lib/db/store';
import { ShipmentStatus } from '@/lib/types';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('id') || searchParams.get('q');

    if (!query) {
      // If no query, return all shipments (for admin or catalog)
      const all = await BwlDataStore.getAllShipments();
      return NextResponse.json({ success: true, shipments: all });
    }

    const shipment = await BwlDataStore.getShipmentByTrackingNumber(query);

    if (!shipment) {
      return NextResponse.json(
        {
          success: false,
          error: `No shipment found matching "${query}". Please check the Container Number, Air Waybill, or Bill of Lading.`,
          suggestions: ['BWLU104829', '098-84729104', 'BWL-BL-948201', 'BWLU492015']
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      shipment
    });
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while retrieving shipment tracking.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Optional check for authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const verified = verifyAdminToken(token);
      if (!verified) {
        return NextResponse.json({ success: false, error: 'Unauthorized. Invalid admin session.' }, { status: 401 });
      }
    }

    const body = await request.json();
    const { trackingNumber, status, milestoneIndex, locationNote } = body;

    if (!trackingNumber || !status || milestoneIndex === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: trackingNumber, status, milestoneIndex' },
        { status: 400 }
      );
    }

    const updated = await BwlDataStore.updateMilestone(
      trackingNumber,
      status as ShipmentStatus,
      Number(milestoneIndex),
      locationNote
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Shipment with tracking number ${trackingNumber} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Milestone and shipment status updated successfully.',
      shipment: updated
    });
  } catch (error) {
    console.error('Shipment update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update shipment milestone.' },
      { status: 500 }
    );
  }
}
