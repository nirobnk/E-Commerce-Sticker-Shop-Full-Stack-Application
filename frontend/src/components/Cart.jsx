import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cart-slice";
import CartTable from "./CartTable";
import { selectUser, selectIsAuthenticated } from "../store/auth-slice";

export default function Cart() {
  const cart = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [user]);

  // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-12 bg-gradient-to-b from-normalbg to-cyan-50/30 dark:from-darkbg dark:to-gray-900 font-primary">
      <div className="max-w-5xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            {isAddressIncomplete && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please update your address in your profile to proceed to
                checkout.
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/home"
                className="py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-lg font-semibold rounded-lg flex justify-center items-center hover:shadow-lg transition-smooth transform hover:-translate-y-0.5"
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <Link
                to={isAddressIncomplete ? "#" : "/checkout"}
                className={`py-3 px-6 text-lg font-semibold rounded-lg flex justify-center items-center transition-smooth
                                    ${
                                      isAddressIncomplete
                                        ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                                        : "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transform hover:-translate-y-0.5 btn-modern"
                                    }`}
                onClick={(e) => {
                  if (isAddressIncomplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 flex flex-col items-center py-12">
            <p className="max-w-[576px] px-2 mx-auto text-lg mb-6">
              Oops... Your cart is empty. Continue shopping to add items!
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[320px] mx-auto mb-8 dark:bg-gray-700 dark:rounded-xl shadow-lg"
            />
            <Link
              to="/home"
              className="py-3 px-8 bg-gradient-to-r from-primary to-accent text-white text-lg font-semibold rounded-lg flex justify-center items-center hover:shadow-xl transition-smooth transform hover:-translate-y-0.5 btn-modern"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
