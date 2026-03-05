import React from "react";
import apiClient from "../api/apiClient";
import { useLoaderData, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCalendar,
  faDollarSign,
  faCheckCircle,
  faShoppingBag,
  faClock,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  const orders = useLoaderData();

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "processing":
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h py-2 bg-slate-50 dark:bg-gray-900 font-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <PageTitle title="My Orders" />
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-2">
            View and track all your orders in one place
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <FontAwesomeIcon
                icon={faBox}
                className="text-gray-400 dark:text-gray-600 text-4xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Order Header */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faReceipt}
                        className="text-cyan-600 dark:text-cyan-400 text-lg"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          Order #{order.orderId}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-xs"
                          />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyles(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 truncate">
                            {item.productName}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span className="font-medium">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Order Total
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Need help with an order?
            </p>
            <Link
              to="/contact"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold text-sm hover:underline"
            >
              Contact Support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch orders. Please try again.",
      { status: error.status || 500 },
    );
  }
}
