import { Router } from 'express';
import { 
  getInquiriesHandler, 
  createInquiryHandler, 
  updateInquiryStatusHandler 
} from '../controllers/inquiry.controller';

const router = Router();

router.get('/', getInquiriesHandler);
router.post('/', createInquiryHandler);
router.patch('/', updateInquiryStatusHandler);

export default router;
