import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  credentials: "include", // Necessary for cookies to be included
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token =
      state.authReducer.userInfo?.access ||
      localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
