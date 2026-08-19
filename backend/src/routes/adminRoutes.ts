import { Router } from 'express';
import { getPendingUsers, approveUser, rejectUser } from '../controllers/adminController';
import { requireAuth } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

// Protect all admin routes: must be authenticated and have SuperAdmin role
router.use(requireAuth);
// @ts-ignore
router.use(requireRole('SuperAdmin'));

router.get('/users/pending', getPendingUsers);
router.put('/users/:id/approve', approveUser);
router.put('/users/:id/reject', rejectUser);

export default router;
