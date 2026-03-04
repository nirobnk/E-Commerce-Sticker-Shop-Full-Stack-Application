import React, { useRef, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login..");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  /**
   * Validate Passwords Match
   */
  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-3 text-base border-2 rounded-lg transition-smooth border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900 focus:outline-none text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400";

  return (
    <div className="min-h-[752px] flex items-center justify-center font-primary bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-darkbg dark:to-gray-900 py-12">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl max-w-md w-full px-10 py-8">
        <PageTitle title="Register" />

        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              minLength={5}
              maxLength={30}
              className={textFieldStyle}
            />
            {actionData?.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                required
                className={textFieldStyle}
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                name="mobileNumber"
                placeholder="Your Mobile Number"
                required
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
                className={textFieldStyle}
              />
              {actionData?.errors?.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              autoComplete="new-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
            {actionData?.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPwd" className={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPwd"
              type="password"
              name="confirmPwd"
              placeholder="Confirm Your Password"
              required
              autoComplete="confirm-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-white text-lg font-semibold rounded-lg transition-smooth bg-gradient-to-r from-primary to-accent hover:from-dark hover:to-primary hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed btn-modern"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>

        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary dark:text-accent hover:text-accent dark:hover:text-light transition-smooth font-semibold"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 },
    );
  }
}
