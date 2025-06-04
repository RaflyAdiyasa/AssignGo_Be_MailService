import { Router } from 'express';
import { 
  getAllMails, 
  updateMailStatus, 
  getMailStats 
} from '../controllers/mailController.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Admin routes
router.get('/', verifyAdmin, getAllMails);
router.put('/:id/status', verifyAdmin, updateMailStatus);
router.get('/stats', verifyAdmin, getMailStats);

export default router;