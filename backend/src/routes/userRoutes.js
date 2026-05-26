import { Router } from 'express';
import { listUsers } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorize('moderator', 'admin', 'superadmin', 'owner'), listUsers);

export default router;
