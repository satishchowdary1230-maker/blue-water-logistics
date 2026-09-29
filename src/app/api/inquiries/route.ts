import { NextRequest, NextResponse } from 'next/server';
import { BwlDataStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const inquiries = await BwlDataStore.getAllInquiries(status, search);

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while retrieving inquiries.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body;

    // Validate required fields
    if (!companyName?.trim()) {
      return NextResponse.json({ success: false, error: 'Company Name is required.' }, { status: 400 });
    }
    if (!contactPerson?.trim()) {
      return NextResponse.json({ success: false, error: 'Contact Person name is required.' }, { status: 400 });
    }
    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid business email is required.' }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ success: false, error: 'Phone number is required.' }, { status: 400 });
    }
    if (!cargoType?.trim()) {
      return NextResponse.json({ success: false, error: 'Cargo type is required.' }, { status: 400 });
    }
    if (!origin?.trim()) {
      return NextResponse.json({ success: false, error: 'Origin city/port is required.' }, { status: 400 });
    }
    if (!destination?.trim()) {
      return NextResponse.json({ success: false, error: 'Destination city/port is required.' }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ success: false, error: 'Message / inquiry details are required.' }, { status: 400 });
    }

    const created = await BwlDataStore.createInquiry({
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

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully. Our multimodal logistics desk will contact you within 2 business hours.',
        inquiry: created
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again or call our 24/7 desk.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const verified = verifyAdminToken(token);
      if (!verified) {
        return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
      }
    }

    const body = await request.json();
    const { id, status, internalNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Inquiry ID and new status are required.' }, { status: 400 });
    }

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status. Must be New, Contacted, or Closed.' }, { status: 400 });
    }

    const updated = await BwlDataStore.updateInquiryStatus(id, status, internalNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry status updated.',
      inquiry: updated
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry status.' },
      { status: 500 }
    );
  }
}
