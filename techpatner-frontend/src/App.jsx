import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // ✅ Add Navigate import

import AdminLoginPage from "./pages/AdminLogin";
import Index from "./pages/Index"; // ✅ Make sure you import Index component
import UsersPage from "./pages/User";

const isAuthenticated = () => {
  // Temporary hardcoded true
  return true;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Index />} />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/user" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
