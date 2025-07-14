const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");
const Subscription = require("../models/subscriptions");
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

module.exports.getUserStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments();

  // Users from last month for comparison
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const usersLastMonth = await User.countDocuments({
    createdAt: { $gte: lastMonth },
  });

  // Calculate percentage change
  const userChangePercentage =
    totalUsers > 0 ? Math.round((usersLastMonth / totalUsers) * 100) : 0;

  const activeSubscriptions = await User.countDocuments({
    plan: { $nin: ["starter", "free"] },
  });

  const result = await Subscription.aggregate([
    {
      $match: { paymentStatus: "Success" },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$fullFormData.amount" },
      },
    },
  ]);

  const total = result[0]?.totalRevenue || 0;

  const currentRevenue = total; 
  const revenueChange = 0; 

  res.status(200).json({
    totalUsers,
    userChangePercentage,
    activeSubscriptions,
    currentRevenue,
    revenueChange,
  });
});

module.exports.getUserDistribution = asyncHandler(async (req, res, next) => {
  const distribution = await User.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: "$_id",
        value: "$count",
        _id: 0,
      },
    },
  ]);

  // Calculate percentages
  const totalUsers = await User.countDocuments();
  const distributionWithPercentages = distribution.map((item) => ({
    ...item,
    percentage: Math.round((item.value / totalUsers) * 100),
  }));

  // Add colors for each category
  const colors = {
    Student: "#3B82F6",
    Professional: "#10B981",
    Agency: "#F59E0B",
  };

  const result = distributionWithPercentages.map((item) => ({
    ...item,
    color: colors[item.name] || "#6B7280",
  }));

  res.status(200).json(result);
});

module.exports.getRevenueTrends = asyncHandler(async (req, res, next) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const revenueData = [];

  for (let i = 6; i >= 0; i--) {
    const targetMonth = (currentMonth - i + 12) % 12;
    const targetYear = currentMonth - i < 0 ? currentYear - 1 : currentYear;

    const start = new Date(targetYear, targetMonth, 1);
    const end = new Date(targetYear, targetMonth + 1, 1);

    const result = await Subscription.aggregate([
      {
        $match: {
          paymentStatus: "Success",
          paymentDate: {
            $gte: start,
            $lt: end
          }
        }
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: "$fullFormData.amount" }
        }
      }
    ]);

    revenueData.push({
      month: months[targetMonth],
      revenue: result[0]?.monthlyRevenue || 0
    });
  }

  res.status(200).json(revenueData);
});
module.exports.getPlanDistribution = asyncHandler(async (req, res, next) => {
  const planDistribution = await User.aggregate([
    {
      $group: {
        _id: "$plan",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: "$_id",
        value: "$count",
        _id: 0,
      },
    },
  ]);

  res.status(200).json(planDistribution);
});

module.exports.getRecentUsers = asyncHandler(async (req, res, next) => {
  const recentUsers = await User.find(
    {},
    {
      name: 1,
      email: 1,
      category: 1,
      plan: 1,
      createdAt: 1,
      isVerified: 1,
    }
  )
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json(recentUsers);
});
