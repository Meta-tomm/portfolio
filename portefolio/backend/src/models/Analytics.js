import mongoose from 'mongoose';

// Analytics schema for tracking portfolio visitors
// Privacy-first: no IP addresses stored, user agent hashed
const analyticsSchema = new mongoose.Schema({
  // Page view tracking
  page: {
    type: String,
    required: true,
    enum: ['home', 'projects', 'project-detail', 'skills', 'about', 'contact', 'admin'],
  },

  // Project-specific tracking (for project detail pages)
  projectId: {
    type: String,
    default: null,
  },

  // Session tracking (hashed user agent for privacy)
  sessionHash: {
    type: String,
    required: true,
  },

  // Time tracking
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // Index for efficient date queries
  },

  // Duration on page (in seconds)
  duration: {
    type: Number,
    default: 0,
  },

  // Referrer (where visitor came from)
  referrer: {
    type: String,
    default: 'direct',
  },

  // Device info (simplified)
  device: {
    type: String,
    enum: ['mobile', 'tablet', 'desktop'],
    default: 'desktop',
  },
});

// Compound index for efficient aggregation queries
analyticsSchema.index({ page: 1, timestamp: -1 });
analyticsSchema.index({ projectId: 1, timestamp: -1 });

// Static method to get page views for last N days
analyticsSchema.statics.getPageViewsLastDays = async function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
        },
        views: { $sum: 1 },
        uniqueSessions: { $addToSet: "$sessionHash" }
      }
    },
    {
      $project: {
        date: "$_id",
        views: 1,
        uniqueVisitors: { $size: "$uniqueSessions" },
        _id: 0
      }
    },
    {
      $sort: { date: 1 }
    }
  ]);
};

// Static method to get top viewed projects
analyticsSchema.statics.getTopProjects = async function(limit = 5) {
  return this.aggregate([
    {
      $match: {
        page: 'project-detail',
        projectId: { $ne: null }
      }
    },
    {
      $group: {
        _id: "$projectId",
        views: { $sum: 1 },
        uniqueVisitors: { $addToSet: "$sessionHash" }
      }
    },
    {
      $project: {
        projectId: "$_id",
        views: 1,
        uniqueVisitors: { $size: "$uniqueVisitors" },
        _id: 0
      }
    },
    {
      $sort: { views: -1 }
    },
    {
      $limit: limit
    }
  ]);
};

// Static method to get overall statistics
analyticsSchema.statics.getOverallStats = async function() {
  const totalViews = await this.countDocuments();

  const uniqueVisitors = await this.aggregate([
    {
      $group: {
        _id: "$sessionHash"
      }
    },
    {
      $count: "total"
    }
  ]);

  const avgDuration = await this.aggregate([
    {
      $match: {
        duration: { $gt: 0 }
      }
    },
    {
      $group: {
        _id: null,
        avgDuration: { $avg: "$duration" }
      }
    }
  ]);

  return {
    totalPageViews: totalViews,
    uniqueVisitors: uniqueVisitors[0]?.total || 0,
    avgDuration: Math.round(avgDuration[0]?.avgDuration || 0),
  };
};

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
