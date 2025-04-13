const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const config = require('../config/config');

// @desc    Authenticate guard
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check for guard
  const guard = await User.findByEmail(email);
  
  if (!guard) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check password
  const isMatch = await User.comparePassword(password, guard.password);
  
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Create token
  const token = User.getSignedJwtToken(guard);

  res.status(200).json({
    success: true,
    token,
    user: {
      email: guard.email,
      role: guard.role
    }
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    email: req.user.email,
    role: req.user.role
  };

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = {
  login,
  getMe
};