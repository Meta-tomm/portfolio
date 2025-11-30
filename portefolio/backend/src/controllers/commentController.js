import Comment from '../models/Comment.js';
import { validationResult } from 'express-validator';

// Récupérer tous les commentaires approuvés (pour affichage public)
export const getApprovedComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .select('-email'); // Ne pas exposer les emails publiquement

    // Calculer la moyenne des notes
    const avgRating = comments.length > 0
      ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
      : 0;

    res.json({
      success: true,
      count: comments.length,
      avgRating: parseFloat(avgRating),
      comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

// Créer un nouveau commentaire
export const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, rating, comment } = req.body;

    const newComment = await Comment.create({
      name,
      email,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Comment submitted successfully and is pending approval',
      comment: {
        id: newComment._id,
        name: newComment.name,
        rating: newComment.rating,
        comment: newComment.comment,
        createdAt: newComment.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message
    });
  }
};

// Récupérer tous les commentaires (admin seulement)
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

// Approuver un commentaire (admin seulement)
export const approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment approved',
      comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving comment',
      error: error.message
    });
  }
};

// Supprimer un commentaire (admin seulement)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
};
