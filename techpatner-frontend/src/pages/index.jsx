import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const password = localStorage.getItem("password");
    if (!password) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <Navbar userEmail="admin@company.com" userName="Admin User" />
      <Dashboard />
    </div>
  );
};

export default App;
