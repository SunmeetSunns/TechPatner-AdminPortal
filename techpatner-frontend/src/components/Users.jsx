import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Calendar } from 'lucide-react';

const UsersComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPlan, setSelectedPlan] = useState('All Plans');

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      category: 'Developer',
      plan: 'Premium',
      status: 'Active',
      joinDate: '1/15/2024'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      category: 'Designer',
      plan: 'Enterprise',
      status: 'Active',
      joinDate: '2/20/2024'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      category: 'Manager',
      plan: 'Basic',
      status: 'Inactive',
      joinDate: '3/10/2024'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      category: 'Analyst',
      plan: 'Premium',
      status: 'Active',
      joinDate: '3/25/2024'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.brown@email.com',
      category: 'Developer',
      plan: 'Enterprise',
      status: 'Active',
      joinDate: '4/05/2024'
    }
  ];

  const categories = ['All Categories', 'Developer', 'Designer', 'Manager', 'Analyst'];
  const statuses = ['All Statuses', 'Active', 'Inactive'];
  const plans = ['All Plans', 'Basic', 'Premium', 'Enterprise'];

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || user.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Statuses' || user.status === selectedStatus;
    const matchesPlan = selectedPlan === 'All Plans' || user.plan === selectedPlan;

    return matchesSearch && matchesCategory && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 text-white';
      case 'Inactive':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Basic':
        return 'bg-gray-500 text-white';
      case 'Premium':
        return 'bg-blue-500 text-white';
      case 'Enterprise':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleViewUser = (userId) => {
    console.log('View user:', userId);
  };

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId);
  };

  return (
    <div className="p-6 ml-64 bg-gray-900 min-h-screen text-white">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">USERS</h2>
        <p className="text-gray-400">Manage all registered users</p>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-700">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-gray-700">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Plan</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {plans.map(plan => (
                <option key={plan} value={plan} className="bg-gray-700">
                  {plan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold">All Users ({filteredUsers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 bg-opacity-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  USER
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  PLAN
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  JOIN DATE
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700 hover:bg-opacity-30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{user.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{user.joinDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
                        title="View User"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500 hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No users found</div>
              <div className="text-gray-500 text-sm mt-2">
                Try adjusting your filters or search criteria
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;