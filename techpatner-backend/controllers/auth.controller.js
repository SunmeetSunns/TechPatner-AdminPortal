const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  }

  if (!user.isVerified) {
    return res.status(401).json({
      success: false,
      error: "Please verify your email before logging in",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      category: user.category,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: user,
    },
  });
});
