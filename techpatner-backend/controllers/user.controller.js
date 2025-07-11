const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");

module.exports.listUser = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.isVerified !== undefined)
    filter.isVerified = req.query.isVerified === "true";
  if (req.query.planPurchased !== undefined)
    filter.planPurchased = req.query.planPurchased === "true";

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { mobile: searchRegex },
    ];
  }

  const users = await User.find(filter)
    .select("-password -unhashedPassword -resetToken -resetTokenExpiry")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalUsers = await User.countDocuments(filter);
  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  });
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  // Remove sensitive fields that shouldn't be updated directly
  delete updates.resetToken;
  delete updates.resetTokenExpiry;

  // Check if user exists
  const existingUser = await User.findById(id);
  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check for duplicate email (if email is being updated)
  if (updates.email && updates.email !== existingUser.email) {
    const emailExists = await User.findOne({
      email: updates.email,
      _id: { $ne: id },
    });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
  }

  // Check for duplicate mobile (if mobile is being updated)
  if (updates.mobile && updates.mobile !== existingUser.mobile) {
    const mobileExists = await User.findOne({
      mobile: updates.mobile,
      _id: { $ne: id },
    });
    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists",
      });
    }
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -unhashedPassword -resetToken -resetTokenExpiry");

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: { user: updatedUser },
  });
});
