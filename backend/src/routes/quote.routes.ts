import { Router } from 'express';
import { calculateQuoteHandler } from '../controllers/quote.controller';

const router = Router();

router.post('/', calculateQuoteHandler);

export default router;
