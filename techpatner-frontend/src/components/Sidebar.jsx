import React, { useState, useEffect } from "react";
import { Shield, LayoutDashboard, Users, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/" },
    { id: "users", label: "Users", icon: Users, route: "/user" },
  ];
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = sidebarItems.find(item => item.route === currentPath);
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, []);

  // Close mobile sidebar when clicking on a menu item
  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.route);
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      const mobileMenuButton = document.querySelector(".mobile-menu-button");

      if (
        isMobileOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        mobileMenuButton &&
        !mobileMenuButton.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white mobile-menu-button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-700">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-purple-600 text-white border-r-2 border-purple-400"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}
    </>
  );
};

export default Sidebar;
