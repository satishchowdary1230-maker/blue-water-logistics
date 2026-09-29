import { Router } from 'express';
import trackingRoutes from './tracking.routes';
import inquiryRoutes from './inquiry.routes';
import quoteRoutes from './quote.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/tracking', trackingRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/quote', quoteRoutes);
router.use('/auth', authRoutes);

export default router;
