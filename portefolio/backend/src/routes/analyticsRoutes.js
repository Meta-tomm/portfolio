import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

// Public routes (accessible by frontend)
router.post('/track', analyticsController.trackPageView);
router.get('/stats', analyticsController.getStats);
router.get('/live', analyticsController.getLiveVisitors);

export default router;
