import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLogin";
import Index from "./pages/Index";
import UsersPage from "./pages/User";
import { authUtils } from "./utils/authUtils";



const ProtectedRoute = ({ element }) => {
  return authUtils.isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Index />} />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/user" element={<ProtectedRoute element={<UsersPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { authUtils };