import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useLoaderData, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCalendar,
  faShoppingBag,
  faReceipt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  const orders = useLoaderData();
  const [expandedOrders, setExpandedOrders] = useState([]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

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
    <div className="min-h-[calc(100vh-80px)] py-4 bg-gray-100 dark:bg-gray-900 font-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-4">
          <PageTitle title="My Orders" />
          <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-1">
            Click on an order to view details
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <FontAwesomeIcon
                icon={faBox}
                className="text-gray-400 dark:text-gray-600 text-2xl"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-3">
            {orders.map((order) => {
              const isExpanded = expandedOrders.includes(order.orderId);
              return (
                <div
                  key={order.orderId}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {/* Order Header - Clickable */}
                  <button
                    onClick={() => toggleOrder(order.orderId)}
                    className="w-full bg-cyan-50 dark:bg-gray-700/50 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FontAwesomeIcon
                          icon={faReceipt}
                          className="text-cyan-600 dark:text-cyan-400 text-sm flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            Order #{order.orderId}
                          </h2>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="text-[10px]"
                            />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                        <FontAwesomeIcon
                          icon={isExpanded ? faChevronUp : faChevronDown}
                          className="text-gray-400 text-xs ml-1"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Order Items - Expandable */}
                  {isExpanded && (
                    <div className="p-4">
                      <div className="space-y-3 mb-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded border border-gray-200 dark:border-gray-600 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                                {item.productName}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                <span>Qty: {item.quantity}</span>
                                <span>•</span>
                                <span>${item.price.toFixed(2)} each</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Order Total
                        </span>
                        <p className="text-base font-bold text-cyan-600 dark:text-cyan-400">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        {orders.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Need help with an order?
            </p>
            <Link
              to="/contact"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold text-xs hover:underline"
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
