import express, { Request, Response } from 'express';
import cors from 'cors';
import { CONFIG } from './config/config';
import { connectDB } from './config/db';
import apiRoutes from './routes';

const app = express();

// Middlewares
app.use(cors({
  origin: [CONFIG.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());

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

// Start Server
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

startServer().catch((err) => {
  console.error('Fatal error starting backend server:', err);
  process.exit(1);
});

export default app;
