const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register student
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { registrationId, name, email, password, confirmPassword, mobileNumber } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ 
      $or: [{ email }, { registrationId }] 
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email or registration ID already exists'
      });
    }

    // Create student
    const student = await Student.create({
      registrationId,
      name,
      email,
      password,
      mobileNumber
    });

    sendTokenResponse(student, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user (student or guard)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, isGuard } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    let user;

    // Check if it's a guard login
    if (isGuard) {
      user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Check if password matches for guard
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } else {
      // Check for student
      user = await Student.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Check if password matches for student
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  let token;
  if (user.role === 'guard') {
    token = User.getSignedJwtToken(user);
  } else {
    // Use the Student model's getSignedJwtToken method
    token = user.getSignedJwtToken();
  }

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Prepare user data based on role
  let userData = {
    id: user._id || user.id,
    email: user.email,
    role: user.role || 'student'
  };

  // Add additional fields for students
  if (user.role !== 'guard') {
    userData = {
      ...userData,
      name: user.name,
      registrationId: user.registrationId,
      mobileNumber: user.mobileNumber
    };
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: userData
    });
}; 