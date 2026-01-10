// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Check if user sends a valid Token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (looks like "Bearer eyJhbGciOi...")
      token = req.headers.authorization.split(" ")[1];

      // Decode token to get User ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user in DB and attach to the request object
      // .select('-password') means "don't give me the password"
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the controller
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 2. Check if the user is an Admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, adminOnly };
