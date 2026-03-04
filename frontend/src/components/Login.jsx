import React, { useEffect } from "react";
import PageTitle from "./PageTitle";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/auth-slice";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      dispatch(
        loginSuccess({ jwtToken: actionData.jwtToken, user: actionData.user }),
      );
      sessionStorage.removeItem("redirectPath");
      setTimeout(() => {
        navigate(from);
      }, 100);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData]);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-3 text-base border-2 rounded-lg transition-smooth border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900 focus:outline-none text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400";
  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-darkbg dark:to-gray-900 py-12">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl max-w-md w-full px-10 py-8">
        {/* Title */}
        <PageTitle title="Login" />
        {/* Form */}
        <Form method="POST" className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              autoComplete="username"
              required
              className={textFieldStyle}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              autoComplete="current-password"
              required
              minLength={4}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white text-lg font-semibold rounded-lg transition-smooth bg-gradient-to-r from-primary to-accent hover:from-dark hover:to-primary hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed btn-modern"
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>
          </div>
        </Form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary dark:text-accent hover:text-accent dark:hover:text-light transition-smooth font-semibold"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 },
    );
  }
}
