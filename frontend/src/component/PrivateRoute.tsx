import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../utils/tokenUtils";
import { RootState } from "../store";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.authReducer);

  // Check if user is authenticated and token is valid
  const isAuthenticated =
    userInfo && userInfo.access && !isTokenExpired(userInfo.access);

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-900">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
