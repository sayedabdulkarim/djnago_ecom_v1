import { apiSlice } from "../apiSlice";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from "../../types/auth";

const USERS_URL = "api/auth";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/login/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: `${USERS_URL}/register/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `${USERS_URL}/logout/`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    refreshToken: builder.mutation<TokenRefreshResponse, TokenRefreshRequest>({
      query: (data) => ({
        url: `${USERS_URL}/token/refresh/`,
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: `${USERS_URL}/me/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = userApiSlice;
