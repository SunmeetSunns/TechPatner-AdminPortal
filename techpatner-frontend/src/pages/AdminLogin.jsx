import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Mail, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  const fillDemoCredentials = () => {
    setEmail('admin@company.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-300 text-sm">Sign in to access the admin panel</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>

            {/* Demo Credentials */}
            <div className="mt-6">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full bg-gray-700 bg-opacity-50 text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-600 hover:bg-gray-600 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              >
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Demo credentials:</div>
                  <div className="text-sm">admin@company.com / admin123</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}