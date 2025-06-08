import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth";

// Define initial state
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  userDetails: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)?.user
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload;
      const userWithToken = { ...user, access, refresh };
      state.userInfo = userWithToken;
      state.userDetails = user;
      state.error = null;
      state.isLoading = false;
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateTokens: (state, action) => {
      const { access } = action.payload;
      if (state.userInfo) {
        state.userInfo.access = access;
        const updatedUserInfo = { ...state.userInfo, access };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        localStorage.setItem("access_token", access);
      }
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.userDetails = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const {
  setCredentials,
  setLoading,
  setError,
  updateTokens,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
