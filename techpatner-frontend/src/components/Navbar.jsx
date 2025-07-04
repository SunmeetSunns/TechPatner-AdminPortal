import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userEmail = 'admin@company.com', userName = 'Admin User' }) => {
  const navigate=useNavigate()
  const handleLogout = () => {
   navigate("/login")
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 md:px-6 py-4 md:ml-64">
      <div className="flex items-center justify-between">
        <div className="ml-12 md:ml-0">
          <h1 className="text-lg md:text-2xl font-semibold text-white">
            Welcome back, <span className="hidden sm:inline">{userName}</span>
            <span className="sm:hidden">Admin</span>
          </h1>
        </div>
                
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-300">
            <User className="w-4 h-4" />
            <span className="text-sm">{userEmail}</span>
          </div>
          
          {/* Mobile user info */}
          <div className="md:hidden flex items-center text-gray-300">
            <User className="w-4 h-4" />
          </div>
                    
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 md:gap-2 bg-gray-700 hover:bg-gray-600 px-2 md:px-4 py-2 rounded-lg transition-colors text-white text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;