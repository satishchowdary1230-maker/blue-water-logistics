import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'bwl-secret-key-mto-act-1993-hyderabad-banjara-hills',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  DEFAULT_ADMIN: {
    id: 'usr-bwl-001',
    email: 'admin@bwl.co.in',
    name: 'BWL Central Operations Control',
    role: 'SuperAdmin',
    password: 'BWLadmin2025!',
  }
};
