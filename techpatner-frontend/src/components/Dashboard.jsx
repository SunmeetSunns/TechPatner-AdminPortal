import React from 'react';
import { 
  User, 
  DollarSign, 
  CreditCard, 
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data for the revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 59000 },
    { month: 'Mar', revenue: 72000 },
    { month: 'Apr', revenue: 68000 },
    { month: 'May', revenue: 84000 },
    { month: 'Jun', revenue: 92000 },
    { month: 'Jul', revenue: 98750 }
  ];

  // Sample data for the pie chart
  const userDistributionData = [
    { name: 'Developers', value: 36, color: '#3B82F6' },
    { name: 'Designers', value: 26, color: '#10B981' },
    { name: 'Managers', value: 22, color: '#F59E0B' },
    { name: 'Analysts', value: 16, color: '#EF4444' }
  ];

  const statsCards = [
    {
      title: 'Total Users',
      value: '1,245',
      change: '+12% from last month',
      changeType: 'positive',
      icon: User,
      iconBg: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: '$98,750',
      change: '+8% from last month',
      changeType: 'positive',
      icon: DollarSign,
      iconBg: 'bg-green-500'
    },
    {
      title: 'Active Subscriptions',
      value: '892',
      change: '+5% from last month',
      changeType: 'positive',
      icon: CreditCard,
      iconBg: 'bg-blue-500'
    }
  ];

  return (
    <div className="p-6 ml-64 bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 text-white">Dashboard</h2>
        <p className="text-gray-400">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
                <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-white">User Distribution by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {userDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-300">{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-white">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;