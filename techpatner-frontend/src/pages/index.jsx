import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <Navbar userEmail="admin@company.com" userName="Admin User" />
      <Dashboard />
    </div>
  );
};

export default App;
