import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'academic'],
    default: 'in-progress'
  },
  github: {
    type: String,
    trim: true
  },
  demo: {
    type: String,
    trim: true
  },
  gradient: {
    type: String,
    default: 'from-blue-600 to-purple-600'
  },
  order: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for ordering
projectSchema.index({ order: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
