
import React, { useState } from 'react';
import { ArrowLeft, Save, X, User, Mail, Calendar, Tag, CreditCard, Activity } from 'lucide-react';

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    category: user?.category || 'Student',
    plan: user?.plan || 'Basic',
    status: user?.status || 'Active',
    joinDate: user?.joinDate || ''
  });

  const [errors, setErrors] = useState({});

  const categories = ['Student', 'Agency', 'Professional'];
  const plans = ['Basic', 'Premium', 'Enterprise'];
  const statuses = ['Active', 'Inactive'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...user,
        ...formData
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-white-400 bg-green-500 bg-opacity-20';
      case 'Inactive':
        return 'text-red-400 bg-red-500 bg-opacity-20';
      default:
        return 'text-gray-400 bg-gray-500 bg-opacity-20';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Basic':
        return 'text-white-400 bg-gray-500 bg-opacity-20';
      case 'Premium':
        return 'text-white-400 bg-blue-500 bg-opacity-20';
      case 'Enterprise':
        return 'text-white-400 bg-purple-500 bg-opacity-20';
      default:
        return 'text-white-400 bg-gray-500 bg-opacity-20';
    }
  };

  return (
    <div className="p-6 ml-64 bg-gray-900 min-h-screen text-white">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Users</span>
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-2">Edit User</h2>
        <p className="text-gray-400">Update user information and settings</p>
      </div>

      {/* User Info Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
            <p className="text-gray-400">{user?.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                {user?.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user?.plan)}`}>
                {user?.plan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-700">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Plan Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Plan
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {plans.map(plan => (
                    <option key={plan} value={plan} className="bg-gray-700">
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-gray-700">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Join Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Join Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.joinDate ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
              </div>
              {errors.joinDate && <p className="text-red-400 text-sm mt-1">{errors.joinDate}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;