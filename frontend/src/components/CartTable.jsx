import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  addToCart,
  clearCart,
  removeFromCart,
} from "../store/cart-slice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    dispatch(
      addToCart({ product, quantity: quantity - (product?.quantity || 0) }),
    );
  };

  return (
    <div className="min-h-80 max-w-5xl mx-auto my-8 w-full font-primary bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
          <tr className="uppercase text-sm font-bold text-primary dark:text-light border-b-2 border-primary dark:border-accent">
            <th className="px-6 py-5 text-left">Product</th>
            <th className="px-6 py-5">Quantity</th>
            <th className="px-6 py-5">Price</th>
            <th className="px-6 py-5">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item) => (
            <tr
              key={item.productId}
              className="text-sm sm:text-base text-primary dark:text-light text-center"
            >
              <td className="px-4 sm:px-6 py-4 flex items-center">
                <Link
                  to={`/products/${item.productId}`}
                  state={{ product: item }}
                  className="flex items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                  />
                  <span className="text-primary dark:text-light hover:underline">
                    {item.name}
                  </span>
                </Link>
              </td>
              <td className="px-4 sm:px-6 py-5">
                <input
                  type="number"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartQuantity(
                      item.productId,
                      parseInt(e.target.value, 10) || 1,
                    )
                  }
                  className="w-20 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center font-semibold transition-smooth"
                />
              </td>
              <td className="px-4 sm:px-6 py-5 text-base font-semibold text-primary dark:text-accent">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 sm:px-6 py-5">
                <button
                  aria-label="delete-item"
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.productId }))
                  }
                  className="text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-smooth transform hover:scale-110"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}
          {cart.length > 0 && (
            <tr className="text-center bg-cyan-50 dark:bg-gray-700/50">
              <td></td>
              <td className="text-lg text-gray-800 dark:text-gray-200 font-bold uppercase px-4 sm:px-6 py-5">
                Subtotal
              </td>
              <td className="text-2xl text-primary dark:text-accent font-bold px-4 sm:px-6 py-5">
                ${subtotal}
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
