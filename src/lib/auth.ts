import jwt from 'jsonwebtoken';
import { AdminUser } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'bwl-secret-key-mto-act-1993-hyderabad-banjara-hills';

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: 'usr-bwl-001',
  email: 'admin@bwl.co.in',
  name: 'BWL Central Operations Control',
  role: 'SuperAdmin'
};

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: 'admin@bwl.co.in',
  password: 'BWLadmin2025!'
};

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signAdminToken(user: AdminUser): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (err) {
    console.warn("JWT verification failed:", err);
    return null;
  }
}
