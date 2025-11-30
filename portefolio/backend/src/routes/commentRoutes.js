import express from 'express';
import {
  getApprovedComments,
  createComment,
  getAllComments,
  approveComment,
  deleteComment
} from '../controllers/commentController.js';
import { adminAuth } from '../middleware/auth.js';
import { commentValidation } from '../middleware/validation.js';

const router = express.Router();

// Routes publiques
router.get('/comments', getApprovedComments);
router.post('/comments', commentValidation, createComment);

// Routes admin (protégées)
router.get('/admin/comments', adminAuth, getAllComments);
router.patch('/admin/comments/:id/approve', adminAuth, approveComment);
router.delete('/admin/comments/:id', adminAuth, deleteComment);

export default router;
