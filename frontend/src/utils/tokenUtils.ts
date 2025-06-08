import store from "../store";
import { updateTokens, logoutUser } from "../slices/auth/authSlice";
import { userApiSlice } from "../slices/auth/authApiSlice";

// Function to check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Function to refresh access token
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const state = store.getState();
    const refreshToken =
      state.authReducer.userInfo?.refresh ||
      localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Check if refresh token is expired
    if (isTokenExpired(refreshToken)) {
      throw new Error("Refresh token expired");
    }

    const response = await store
      .dispatch(
        userApiSlice.endpoints.refreshToken.initiate({ refresh: refreshToken })
      )
      .unwrap();

    // Update tokens in store and localStorage
    store.dispatch(updateTokens({ access: response.access }));

    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    // If refresh fails, logout user
    store.dispatch(logoutUser());
    window.location.href = "/login";
    return false;
  }
};

// Function to automatically refresh token before it expires
export const setupTokenRefresh = () => {
  const checkAndRefreshToken = async () => {
    const state = store.getState();
    const accessToken = state.authReducer.userInfo?.access;

    if (accessToken && isTokenExpired(accessToken)) {
      await refreshAccessToken();
    }
  };

  // Check token every 5 minutes
  setInterval(checkAndRefreshToken, 5 * 60 * 1000);

  // Check token on page load
  checkAndRefreshToken();
};
