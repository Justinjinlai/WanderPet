const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username OR email already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already registered' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({ message: 'User registered successfully', user });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body; // login can be username OR email

    // Look up user by email OR username
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!user) return res.status(400).json({ message: 'Invalid username/email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username/email or password' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
