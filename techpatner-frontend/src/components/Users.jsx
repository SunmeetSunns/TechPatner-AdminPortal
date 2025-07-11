import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, Eye, Edit, Calendar, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import EditUserForm from "./EditUserForm";
import ViewUserForm from "./ViewUser";

const UsersComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [currentView, setCurrentView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNextPage: false,
    hasPrevPage: false
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const categories = ["All Categories", "professional", "student", "freelancer", "business"];
  const statuses = ["All Statuses", "Active", "Inactive"];
  const plans = ["All Plans", "Basic", "Premium", "Enterprise"];



  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });


      if (debouncedSearchTerm.trim()) {
        queryParams.append('search', debouncedSearchTerm.trim());
      }

      // Add category filter
      if (selectedCategory !== "All Categories") {
        queryParams.append('category', selectedCategory);
      }


      if (selectedStatus !== "All Statuses") {
        queryParams.append('isVerified', selectedStatus === "Active" ? "true" : "false");
      }


      if (selectedPlan !== "All Plans") {
        queryParams.append('planPurchased', selectedPlan !== "Basic" ? "true" : "false");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {

        const transformedUsers = data.data.users.map(user => ({
          id: user._id,
          name: user.name || 'N/A',
          email: user.email,
          category: user.category,
          plan: user.planPurchased ? 'Premium' : 'Basic',
          status: user.isVerified ? 'Active' : 'Inactive',
          joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
          mobile: user.mobile,
          country_code: user.country_code,
          portfolioLink: user.portfolioLink,
          profilePic: user.profilePic,
          resume: user.resume,
          havePreference: user.havePreference,
          originalData: user 
        }));

        setUsers(transformedUsers);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearchTerm, selectedCategory, selectedStatus, selectedPlan]);


  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, selectedCategory, selectedStatus, selectedPlan]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Inactive":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case "Basic":
        return "bg-gray-500 text-white";
      case "Premium":
        return "bg-blue-500 text-white";
      case "Enterprise":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      // Call your update API here
      console.log("Saving user:", updatedUser);
      
      // Refresh the users list after successful update
      await fetchUsers();
      
      setCurrentView("list");
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      // Handle error appropriately
    }
  };

  const handleCancelEdit = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setCurrentView("view");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setCurrentView("edit");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (currentView === "edit") {
    return (
      <EditUserForm
        user={selectedUser}
        onSave={handleSaveUser}
        onCancel={handleCancelEdit}
      />
    );
  } 
  
  if (currentView === "view") {
    return (
      <ViewUserForm
        user={selectedUser}
        onSave={handleSaveUser}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="p-6 ml-64 bg-gray-900 min-h-screen text-white">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">USERS</h2>
        <p className="text-gray-400">Manage all registered users</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Error: {error}</span>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-700">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status} className="bg-gray-700">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan} className="bg-gray-700">
                  {plan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            All Users ({pagination.totalUsers})
          </h3>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 bg-opacity-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  USER
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  PLAN
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  JOIN DATE
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                      <span className="text-gray-400">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-lg">No users found</div>
                    <div className="text-gray-500 text-sm mt-2">
                      Try adjusting your filters or search criteria
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 capitalize">{user.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(
                          user.plan
                        )}`}
                      >
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
                          title="View User"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500 hover:bg-opacity-20 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.totalUsers)} of {pagination.totalUsers} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        pageNum === currentPage
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersComponent;