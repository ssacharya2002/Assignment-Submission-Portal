import express from 'express';
import { body } from 'express-validator';
import { 
  uploadAssignment, 
  getAssignments, 
  acceptAssignment, 
  rejectAssignment 
} from '../controllers/assignmentController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/upload', [
  auth,
  body('task').notEmpty(),
  body('adminId').notEmpty()
], uploadAssignment);

router.get('/', adminAuth, getAssignments);
router.post('/:id/accept', adminAuth, acceptAssignment);
router.post('/:id/reject', adminAuth, rejectAssignment);

export default router;