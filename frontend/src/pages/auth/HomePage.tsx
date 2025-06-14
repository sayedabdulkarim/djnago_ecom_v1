import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/auth/authSlice";
import { useLogoutUserMutation } from "../../slices/auth/authApiSlice";
import { RootState } from "../../store";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUserAPI] = useLogoutUserMutation();

  const { userDetails, userInfo } = useSelector(
    (state: RootState) => state.authReducer
  );

  const handleLogout = async () => {
    try {
      // Call logout API (optional, depends on backend implementation)
      await logoutUserAPI();
    } catch (error) {
      // Even if API call fails, we still want to logout on frontend
      console.log("Logout API call failed, but continuing with local logout");
    } finally {
      // Clear local storage and Redux state
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome,{" "}
                <span className="font-medium text-white">
                  {userDetails?.username}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-600 rounded-lg min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-800 mb-4">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome, you are logged in!
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                You have successfully authenticated and can access protected
                content.
              </p>
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">
                  User Information
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Username:</span>
                    <span className="font-medium text-white">
                      {userDetails?.username}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-medium text-white">
                      {userDetails?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="font-medium text-white">
                      {userDetails?.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
