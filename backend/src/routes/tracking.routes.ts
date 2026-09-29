import { Router } from 'express';
import { getShipmentHandler, updateMilestoneHandler } from '../controllers/tracking.controller';

const router = Router();

router.get('/', getShipmentHandler);
router.put('/', updateMilestoneHandler);

export default router;
