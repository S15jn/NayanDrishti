export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};