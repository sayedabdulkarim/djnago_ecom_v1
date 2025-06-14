import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../../slices/auth/authApiSlice";
import {
  setCredentials,
  setError,
  setLoading,
} from "../../slices/auth/authSlice";
import { RootState } from "../../store";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const { userInfo, isLoading, error } = useSelector(
    (state: RootState) => state.authReducer
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const result = await loginUser({ username, password }).unwrap();

      // Now the login response includes user details, so we can set everything at once
      dispatch(
        setCredentials({
          user: result.user,
          access: result.access,
          refresh: result.refresh,
        })
      );

      navigate("/");
    } catch (err: any) {
      dispatch(
        setError(
          err?.data?.error ||
            err?.data?.detail ||
            "Login failed. Please try again."
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    validationErrors.username
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded-md placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your username"
                />
                {validationErrors.username && (
                  <p className="mt-1 text-sm text-red-400">
                    {validationErrors.username}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded-md placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your password"
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
