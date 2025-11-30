// Middleware simple pour vérifier le secret admin
export const adminAuth = (req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'];

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid admin credentials'
    });
  }

  next();
};
