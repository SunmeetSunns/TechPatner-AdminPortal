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
  if (req.query.plan) filter.plan = req.query.plan;

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