import express from 'express';
import {
  getProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects
} from '../controllers/projectController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/projects', getProjects);

// Admin routes (require authentication)
router.get('/admin/projects', adminAuth, getAllProjects);
router.post('/admin/projects', adminAuth, createProject);
router.put('/admin/projects/:id', adminAuth, updateProject);
router.delete('/admin/projects/:id', adminAuth, deleteProject);
router.post('/admin/projects/reorder', adminAuth, reorderProjects);

export default router;
