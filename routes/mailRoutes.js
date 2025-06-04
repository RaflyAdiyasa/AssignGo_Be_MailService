import { Router } from 'express';
import { 
  createMail, 
  getMailsByUser, 
  getMailById, 
  getMailHistory 
} from '../controllers/mailController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = Router();

// User routes
router.post('/', verifyUser, createMail);
router.get('/user/:id_pengirim', verifyUser, getMailsByUser);
router.get('/:id', verifyUser, getMailById);
router.get('/:id/history', verifyUser, getMailHistory);

export default router;