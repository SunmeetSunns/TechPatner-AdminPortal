
export const authUtils = {
    // Check if user is authenticated
    isAuthenticated: () => {
      const token = localStorage.getItem("authToken");
      return !!token;
    },
  
    // Get stored user data
    getUser: () => {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    },
  
    // Get auth token
    getToken: () => {
      return localStorage.getItem("authToken");
    },
  
    // Logout user
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("password"); // Remove legacy storage
    },
  
    // Get authorization headers for API requests
    getAuthHeaders: () => {
      const token = localStorage.getItem("authToken");
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
  };