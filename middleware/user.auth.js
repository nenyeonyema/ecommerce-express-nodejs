const jwt = require("jsonwebtoken");
const configVariables = require('../config/config');
const User = require('../schema/user.schema');  

const authenticate = async (req, res, next) => {
  console.log("Headers:", req.headers);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  console.log("Extracted Token:", token);
  console.log("JWT Secret:", configVariables.JWT_TOKEN);
  try {
    const decoded = jwt.verify(token, configVariables.JWT_TOKEN);
    console.log(decoded);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired' });
    }
    return res.status(401).json({ message: err.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

module.exports = { authenticate, isAdmin };
