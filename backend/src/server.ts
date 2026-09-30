import express, { Request, Response } from 'express';
import cors from 'cors';
import { CONFIG } from './config/config';
import { connectDB } from './config/db';
import apiRoutes from './routes';

const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.endsWith('.vercel.app') ||
      (CONFIG.CORS_ORIGIN && origin === CONFIG.CORS_ORIGIN)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// Serverless DB connection check
app.use(async (_req, _res, next) => {
  if (CONFIG.MONGODB_URI) {
    try {
      await connectDB();
    } catch {
      // Handled inside connectDB fallback
    }
  }
  next();
});

// Healthcheck & Info
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Blue Water Logistics Backend Server',
    cin: 'L63030TG2022PLC165815',
    mtoRegistration: 'MTO/DGS/2012/1048',
    activeTanks: '1,708+',
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found on BWL API server.`,
  });
});

// Start Server when running standalone (not inside Vercel serverless)
async function startServer() {
  await connectDB();

  app.listen(CONFIG.PORT, () => {
    console.log(`
=====================================================================
⚓  BLUE WATER LOGISTICS LIMITED (BWL) - BACKEND API SERVER
🏢  CIN: L63030TG2022PLC165815 | MTO Act 1993 Registered
🌐  Server running on: http://localhost:${CONFIG.PORT}
📊  Healthcheck:       http://localhost:${CONFIG.PORT}/health
📡  Tracking API:      http://localhost:${CONFIG.PORT}/api/tracking
🧮  Quote API:         http://localhost:${CONFIG.PORT}/api/quote
📨  Inquiries CRM:     http://localhost:${CONFIG.PORT}/api/inquiries
🔒  Auth API:          http://localhost:${CONFIG.PORT}/api/auth
=====================================================================
    `);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Fatal error starting backend server:', err);
    process.exit(1);
  });
} else {
  // Pre-warm database connection when loaded inside Vercel
  connectDB().catch((err) => console.warn('MongoDB connection warning:', err));
}

export default app;
// Export CommonJS for Vercel Node runtime
if (typeof module !== 'undefined' && module.exports) {
  module.exports = app;
  module.exports.default = app;
}
