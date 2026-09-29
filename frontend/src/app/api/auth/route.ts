import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_ADMIN_CREDENTIALS, DEFAULT_ADMIN_USER, signAdminToken, verifyAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanEmail === DEFAULT_ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === DEFAULT_ADMIN_CREDENTIALS.password
    ) {
      const token = signAdminToken(DEFAULT_ADMIN_USER);

      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful.',
        token,
        user: DEFAULT_ADMIN_USER,
      });

      // Set HTTP-only cookie for enhanced security
      response.cookies.set('bwl_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid credentials. Please verify your administrative email and password.',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication service error.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('bwl_admin_token')?.value;

    const token = (authHeader && authHeader.startsWith('Bearer '))
      ? authHeader.substring(7)
      : cookieToken;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = verifyAdminToken(token);
    if (!decoded) {
      return NextResponse.json({ authenticated: false, error: 'Expired or invalid session.' }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      }
    });
  } catch (error) {
    console.error('Session verify error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
