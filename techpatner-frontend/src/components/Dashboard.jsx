import React, { useState, useEffect } from "react";
import {
  User,
  DollarSign,
  CreditCard,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    userDistribution: [],
    revenueData: [],
    planDistribution: [],
    recentUsers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // API base URL - adjust according to your backend
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setError(null);

      const [statsRes, distributionRes, revenueRes, planRes, usersRes] =
        await Promise.all([
          fetch(`${API_BASE_URL}/user/stats`),
          fetch(`${API_BASE_URL}/user/user-distribution`),
          fetch(`${API_BASE_URL}/user/revenue-trends`),
          fetch(`${API_BASE_URL}/user/plan-distribution`),
          fetch(`${API_BASE_URL}/user/recent-users`),
        ]);

      if (!statsRes.ok || !distributionRes.ok || !revenueRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const [
        stats,
        userDistribution,
        revenueData,
        planDistribution,
        recentUsers,
      ] = await Promise.all([
        statsRes.json(),
        distributionRes.json(),
        revenueRes.json(),
        planRes.json(),
        usersRes.json(),
      ]);

      setDashboardData({
        stats,
        userDistribution,
        revenueData,
        planDistribution,
        recentUsers,
      });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 md:ml-64 bg-gray-900 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2 text-gray-400">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading dashboard data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 md:ml-64 bg-gray-900 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { stats, userDistribution, revenueData } = dashboardData;

  // Stats cards configuration
  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      change: `+${stats?.userChangePercentage || 0}% from last month`,
      changeType: "positive",
      icon: User,
      iconBg: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `${stats?.currentRevenue?.toLocaleString() || "0"}`,
      change: `+${stats?.revenueChange || 0}% from last month`,
      changeType: "positive",
      icon: IndianRupee,
      iconBg: "bg-green-500",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions?.toLocaleString() || "0",
      change: "+0% from last month",
      changeType: "positive",
      icon: CreditCard,
      iconBg: "bg-blue-500",
    },
  ];

  return (
    <div className="p-6 md:ml-64 bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Dashboard</h2>
          <p className="text-gray-400">Welcome to your admin dashboard</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Distribution Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-white">
            User Distribution by Category
          </h3>
          {userDistribution.length > 0 ? (
            <>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {userDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-300">
                      {item.name} {item.percentage}% ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No user distribution data available
            </div>
          )}
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Revenue Trend
          </h3>
          {revenueData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#8B5CF6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No revenue data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6 text-white">Recent Users</h3>
        {dashboardData.recentUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentUsers.map((user, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-gray-300">{user.category}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.isVerified
                            ? "bg-green-600 text-white"
                            : "bg-yellow-600 text-white"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No recent users to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
