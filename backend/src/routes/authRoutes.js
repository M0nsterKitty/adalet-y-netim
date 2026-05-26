import { Router } from 'express';
import { login, me } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authRateLimit } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', authRateLimit, login);
router.get('/me', authenticate, me);

export default router;
