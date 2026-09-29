import { NextRequest, NextResponse } from 'next/server';
import { FreightEstimateRequest, FreightEstimateResponse } from '@/lib/types';
import { BwlDataStore } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const body: FreightEstimateRequest = await request.json();
    const {
      origin,
      destination,
      mode,
      cargoType,
      weightMt = 20,
      temperatureControlled = false,
      hazardousCargo = false,
      hazardClass,
      customsAssistanceRequired = true,
      companyName,
      contactPerson,
      email,
      phone,
    } = body;

    if (!origin || !destination || !mode) {
      return NextResponse.json(
        { success: false, error: 'Origin, Destination, and Shipping Mode are required.' },
        { status: 400 }
      );
    }

    // Base cost heuristic by mode and estimated distance
    let baseFreight = 45000;
    let transitDaysMin = 3;
    let transitDaysMax = 5;
    let carbonEmissionEstKg = 620;

    switch (mode) {
      case 'ISO_TANK':
        baseFreight = 78000 + Math.max(weightMt, 15) * 1650;
        transitDaysMin = 4;
        transitDaysMax = 7;
        carbonEmissionEstKg = 540;
        break;
      case 'OCEAN_FCL':
        baseFreight = 95000 + Math.max(weightMt, 10) * 1200;
        transitDaysMin = 12;
        transitDaysMax = 18;
        carbonEmissionEstKg = 410;
        break;
      case 'AIR_FREIGHT':
        baseFreight = 145000 + (weightMt * 1000) * 120; // Per kg rate
        transitDaysMin = 1;
        transitDaysMax = 2;
        carbonEmissionEstKg = 2450;
        break;
      case 'RAIL_CARGO':
        baseFreight = 42000 + Math.max(weightMt, 15) * 980;
        transitDaysMin = 2;
        transitDaysMax = 4;
        carbonEmissionEstKg = 180; // Lowest carbon emissions
        break;
      default:
        baseFreight = 50000;
    }

    // Surcharges
    if (hazardousCargo) {
      baseFreight *= 1.22; // 22% DG surcharge for IMO compliance
    }
    if (temperatureControlled) {
      baseFreight *= 1.28; // Cold-chain / trace heating
    }

    const terminalHandlingCharges = mode === 'AIR_FREIGHT' ? 18500 : 12500;
    const bunkerAndFuelSurcharge = Math.round(baseFreight * 0.14);
    const intermodalDrayage = mode === 'AIR_FREIGHT' ? 8500 : 14000;
    const customsDocumentationAndCHA = customsAssistanceRequired ? 6500 : 0;
    const marineTransitInsurance = Math.round(baseFreight * 0.035);

    const subtotalInr = Math.round(
      baseFreight +
      terminalHandlingCharges +
      bunkerAndFuelSurcharge +
      intermodalDrayage +
      customsDocumentationAndCHA +
      marineTransitInsurance
    );

    const gstAmount = Math.round(subtotalInr * 0.18);
    const totalInr = subtotalInr + gstAmount;
    const approximateUsd = Math.round(totalInr / 86.5);

    const quoteRef = `BWL-QT-2025-${Math.floor(10000 + Math.random() * 90000)}`;

    const recommendations: string[] = [];
    if (mode === 'ISO_TANK') {
      recommendations.push('Includes full PTI inspection & ZLD cleaning certification.');
      recommendations.push('24/7 Satellite IoT temperature & pressure tracking enabled.');
    } else if (mode === 'RAIL_CARGO') {
      recommendations.push('Optimized intermodal rail rake via ICD Sanathnagar / Thimmapur.');
      recommendations.push('Estimated 68% CO2 emission reduction vs. standard highway trucking.');
    } else if (mode === 'AIR_FREIGHT') {
      recommendations.push('Guaranteed IATA priority boarding at Hyderabad RGIA Air Hub.');
    } else {
      recommendations.push('Direct MTO Act 1993 Multimodal Bill of Lading with full insurance coverage.');
    }

    const responseData: FreightEstimateResponse = {
      quoteReference: quoteRef,
      request: body,
      breakdown: {
        baseFreight: Math.round(baseFreight),
        terminalHandlingCharges,
        bunkerAndFuelSurcharge,
        intermodalDrayage,
        customsDocumentationAndCHA,
        marineTransitInsurance,
        gstAmount,
      },
      subtotalInr,
      totalInr,
      approximateUsd,
      transitDaysMin,
      transitDaysMax,
      carbonEmissionEstKg,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      recommendations,
    };

    // If company / contact information was provided, automatically save as a lead in the CRM!
    if (companyName && email && phone) {
      await BwlDataStore.createInquiry({
        companyName: companyName.trim(),
        contactPerson: contactPerson || 'Procurement Officer',
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        cargoType: `${cargoType || 'Commercial'} (${mode})`,
        origin,
        destination,
        message: `Generated instant quote: ${quoteRef} for approx. ${totalInr.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}. Weight: ${weightMt} MT. Temp Controlled: ${temperatureControlled ? 'Yes' : 'No'}. Hazardous: ${hazardousCargo ? 'Yes' + (hazardClass ? ` (${hazardClass})` : '') : 'No'}.`,
        quoteReference: quoteRef,
        status: 'New',
        internalNotes: 'Automated lead from Interactive Freight Estimator.',
      });
    }

    return NextResponse.json({
      success: true,
      quote: responseData,
    });
  } catch (error) {
    console.error('Freight quote calculation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate freight quote.' },
      { status: 500 }
    );
  }
}
