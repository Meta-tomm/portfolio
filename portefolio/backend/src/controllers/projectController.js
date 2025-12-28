import Project from '../models/Project.js';

// Get all visible projects (public endpoint)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get all projects including hidden (admin endpoint)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Create new project (admin endpoint)
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

// Update project (admin endpoint)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

// Delete project (admin endpoint)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

// Reorder projects (admin endpoint)
export const reorderProjects = async (req, res) => {
  try {
    const { projects } = req.body; // Array of {id, order}

    const updatePromises = projects.map(({ id, order }) =>
      Project.findByIdAndUpdate(id, { order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Projects reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder projects'
    });
  }
};
