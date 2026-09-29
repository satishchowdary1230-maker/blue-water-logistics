import { Router } from 'express';
import { loginHandler, verifySessionHandler } from '../controllers/auth.controller';

const router = Router();

router.post('/', loginHandler);
router.get('/', verifySessionHandler);

export default router;
