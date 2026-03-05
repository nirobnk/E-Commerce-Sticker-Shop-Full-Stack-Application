import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHome,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export default function OrderSuccess() {
  return (
    <div className="min-h py-9 font-primary bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 dark:bg-green-400/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-full p-6 shadow-2xl shadow-green-500/50 dark:shadow-green-900/50">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-white text-6xl animate-bounce"
                style={{
                  animationDuration: "1s",
                  animationIterationCount: "3",
                }}
              />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r  bg-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-2">
            Thank you for your purchase
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Your order has been successfully placed and is being processed.
            We've sent a confirmation email with your order details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/orders"
            className="flex-1 group py-4 px-6 bg-gradient-to-r bg-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-500/50 dark:hover:shadow-green-900/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faReceipt} />
            <span>View Order Details</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
          <Link
            to="/home"
            className="flex-1 py-4 px-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-base font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <FontAwesomeIcon
              icon={faHome}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Additional Help Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-cyan-200 dark:border-gray-700 p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Need help with your order?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/contact"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold hover:underline"
            >
              Contact Support
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/orders"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold hover:underline"
            >
              Track Order
            </Link>
            <span className="text-gray-400">•</span>
            <a
              href="mailto:support@stickervault.com"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold hover:underline"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
