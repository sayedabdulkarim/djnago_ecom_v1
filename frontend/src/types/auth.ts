// Types for authentication
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserWithToken extends User {
  access: string;
  refresh: string;
}

export interface AuthState {
  userInfo: UserWithToken | null;
  userDetails: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}
