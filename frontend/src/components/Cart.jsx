import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalPrice } from "../store/cart-slice";
import CartTable from "./CartTable";
import { selectUser, selectIsAuthenticated } from "../store/auth-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faLock,
  faExclamationTriangle,
  faArrowLeft,
  faShoppingCart,
  faTruck,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const cart = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const totalPrice = useSelector(selectTotalPrice);

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [user]);

  // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-screen py-3 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 font-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Page Title */}
        <div className="text-center mb-3">
          <PageTitle title="Shopping Cart" />
          {!isCartEmpty && (
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </div>

        {!isCartEmpty ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Side - Cart Table */}
            <div className="lg:col-span-2">
              {/* Address Warning Alert */}
              {isAddressIncomplete && (
                <div className="mb-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-lg p-2 shadow-md animate-pulse">
                  <div className="flex items-start">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-amber-600 dark:text-amber-500 text-base mt-0.5 mr-2"
                    />
                    <div>
                      <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-0.5 text-sm">
                        Address Required
                      </h3>
                      <p className="text-amber-800 dark:text-amber-300 text-xs">
                        Please update your address in your{" "}
                        <Link
                          to="/profile"
                          className="underline font-semibold hover:text-amber-900 dark:hover:text-amber-100"
                        >
                          profile
                        </Link>{" "}
                        to proceed to checkout.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Table */}
              <CartTable />
            </div>

            {/* Right Side - Order Summary & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-2">
                {/* Order Summary Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3">
                  <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-cyan-600 dark:text-cyan-400"
                    />
                    Order Summary
                  </h2>

                  <div className="space-y-2 mb-2">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-xs">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-semibold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-xs">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {totalPrice >= 50 ? "FREE" : "Calculated at checkout"}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                          Total
                        </span>
                        <span className="text-lg font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Taxes calculated at checkout
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Proceed to Checkout Button */}
                    <Link
                      to={isAddressIncomplete ? "#" : "/checkout"}
                      className={`w-full py-2 px-4 text-sm font-bold rounded-xl flex justify-center items-center gap-2 transition-all duration-300 transform ${
                        isAddressIncomplete
                          ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-500 opacity-60"
                          : "bg-gradient-to-r bg-blue-500 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-900/50 hover:-translate-y-1 group"
                      }`}
                      onClick={(e) => {
                        if (isAddressIncomplete) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faLock} />
                      <span>Secure Checkout</span>
                      {!isAddressIncomplete && (
                        <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      )}
                    </Link>

                    {/* Continue Shopping Button */}
                    <Link
                      to="/home"
                      className="w-full py-2 px-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400 flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                      />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-2">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-green-600 dark:text-green-500 text-sm"
                      />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-blue-600 dark:text-blue-500 text-sm"
                      />
                      <span className="font-medium">
                        Free Shipping Over $50
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon
                        icon={faHeadset}
                        className="text-purple-600 dark:text-purple-500 text-sm"
                      />
                      <span className="font-medium">24/7 Customer Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center text-gray-600 dark:text-gray-300 flex flex-col items-center py-16">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={emptyCartImage}
                alt="Empty Cart"
                className="relative max-w-[340px] mx-auto drop-shadow-2xl dark:bg-gray-800 dark:rounded-2xl dark:p-4"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Your Cart is Empty
            </h2>
            <p className="max-w-md px-4 mx-auto text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any stickers yet. Explore our
              collection and find your favorites!
            </p>
            <Link
              to="/home"
              className="group py-4 px-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-900/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
              <span>Start Shopping</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
