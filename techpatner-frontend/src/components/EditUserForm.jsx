import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, X, User, Mail, Calendar, Tag, Phone, Globe, Link, Upload } from 'lucide-react';
import { createValidationRules } from '../validator/editUserValidator';



const EditUserForm = ({ user, onSave, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  console.log("first",user.id)
  const categories = ['student', 'agency', 'professional'];
  const countryCodes = ['+1', '+44', '+91', '+86', '+33', '+49', '+81', '+61'];

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      country_code: '+91',
      category: 'professional',
      portfolioLink: '',
      isVerified: false,
      havePreference: false,
      planPurchased: false
    },
    mode: 'onChange'
  });

  // Update form when user prop changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        country_code: user.country_code || '+91',
        category: user.category || 'professional',
        portfolioLink: user.portfolioLink || '',
        isVerified: user.isVerified || false,
        havePreference: user.havePreference || false,
        planPurchased: user.planPurchased || false
      });
    }
  }, [user, reset]);

  const validationRules = createValidationRules();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        onSave(result.data.user);
      } else {
        setApiError(result.message || 'Failed to update user');
      }
    } catch (error) {
      setApiError('Network error. Please try again.');
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    return status ? 'text-white-400 bg-green-500 bg-opacity-20' : 'text-white-400 bg-red-500 bg-opacity-20';
  };

  const getPlanColor = (hasPlan) => {
    return hasPlan ? 'text-white-400 bg-blue-500 bg-opacity-20' : 'text-white-400 bg-gray-500 bg-opacity-20';
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

      {/* API Error Alert */}
      {apiError && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
          {apiError}
        </div>
      )}

      {/* User Info Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            {user?.profilePic?.url ? (
              <img 
                src={user.profilePic.url} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
            <p className="text-gray-400">{user?.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.isVerified)}`}>
                {user?.isVerified ? 'Verified' : 'Not Verified'}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user?.planPurchased)}`}>
                {user?.planPurchased ? 'Premium' : 'Free'}
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
                  {...register('name', validationRules.name)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
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
                  {...register('email', validationRules.email)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Country Code Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country Code *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  {...register('country_code', validationRules.country_code)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.country_code ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  {countryCodes.map(code => (
                    <option key={code} value={code} className="bg-gray-700">
                      {code}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country_code && <p className="text-red-400 text-sm mt-1">{errors.country_code.message}</p>}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  {...register('mobile', validationRules.mobile)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.mobile ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  {...register('category', validationRules.category)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-700">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Portfolio Link Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio Link
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="url"
                  {...register('portfolioLink', validationRules.portfolioLink)}
                  className={`w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.portfolioLink ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="https://your-portfolio.com"
                />
              </div>
              {errors.portfolioLink && <p className="text-red-400 text-sm mt-1">{errors.portfolioLink.message}</p>}
            </div>
          </div>
        </div>

        {/* User Status Settings */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            User Status & Preferences
          </h3>

          <div className="space-y-4">
            {/* Verified Status */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Email Verified</label>
                <p className="text-gray-400 text-xs">Whether the user's email is verified</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isVerified')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Have Preference */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Has Preferences</label>
                <p className="text-gray-400 text-xs">Whether the user has set their preferences</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('havePreference')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Plan Purchased */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Premium Plan</label>
                <p className="text-gray-400 text-xs">Whether the user has purchased a premium plan</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('planPurchased')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
              isSubmitting || !isDirty
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50"
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