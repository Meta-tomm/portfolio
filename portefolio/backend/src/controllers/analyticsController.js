import Analytics from '../models/Analytics.js';
import crypto from 'crypto';

// Helper to hash user agent for privacy
const hashUserAgent = (userAgent) => {
  return crypto.createHash('sha256').update(userAgent || 'unknown').digest('hex');
};

// Helper to detect device type from user agent
const detectDevice = (userAgent = '') => {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Track a page view
// POST /api/analytics/track
export const trackPageView = async (req, res) => {
  try {
    const { page, projectId, referrer, duration } = req.body;

    // Validate required fields
    if (!page) {
      return res.status(400).json({ error: 'Page is required' });
    }

    // Hash user agent for privacy (no IP stored)
    const userAgent = req.get('user-agent');
    const sessionHash = hashUserAgent(userAgent);
    const device = detectDevice(userAgent);

    // Create analytics entry
    await Analytics.create({
      page,
      projectId: projectId || null,
      sessionHash,
      referrer: referrer || 'direct',
      duration: duration || 0,
      device,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Failed to track analytics' });
  }
};

// Get analytics statistics
// GET /api/analytics/stats
export const getStats = async (req, res) => {
  try {
    const { days = 7 } = req.query;

    // Get overall stats
    const overallStats = await Analytics.getOverallStats();

    // Get page views for last N days
    const pageViewsTimeline = await Analytics.getPageViewsLastDays(parseInt(days));

    // Get top projects
    const topProjects = await Analytics.getTopProjects(5);

    // Get page distribution
    const pageDistribution = await Analytics.aggregate([
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          page: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get device distribution
    const deviceDistribution = await Analytics.aggregate([
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          device: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      overall: overallStats,
      timeline: pageViewsTimeline,
      topProjects,
      pageDistribution,
      deviceDistribution,
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// Get real-time current visitors (active in last 5 minutes)
// GET /api/analytics/live
export const getLiveVisitors = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeVisitors = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: fiveMinutesAgo }
        }
      },
      {
        $group: {
          _id: '$sessionHash'
        }
      },
      {
        $count: 'total'
      }
    ]);

    res.json({
      liveVisitors: activeVisitors[0]?.total || 0,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Live visitors error:', error);
    res.status(500).json({ error: 'Failed to fetch live visitors' });
  }
};
