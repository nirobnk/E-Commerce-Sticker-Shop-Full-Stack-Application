import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  addToCart,
  removeFromCart,
} from "../store/cart-slice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    const product = cart.find((item) => item.productId === productId);
    dispatch(
      addToCart({ product, quantity: quantity - (product?.quantity || 0) }),
    );
  };

  const incrementQuantity = (item) => {
    dispatch(addToCart({ product: item, quantity: 1 }));
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ product: item, quantity: -1 }));
    }
  };

  return (
    <div className="w-full font-primary">
      {/* Desktop View */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
            <tr className="text-xs uppercase font-bold tracking-wider text-gray-700 dark:text-gray-300 border-b-2 border-cyan-500/30 dark:border-cyan-600/30">
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-center">Quantity</th>
              <th className="px-3 py-2 text-center">Price</th>
              <th className="px-3 py-2 text-center">Total</th>
              <th className="px-3 py-2 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item) => (
              <tr
                key={item.productId}
                className="group hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 dark:hover:from-cyan-900/10 dark:hover:to-blue-900/10 transition-all duration-200"
              >
                {/* Product Info */}
                <td className="px-3 py-2">
                  <Link
                    to={`/products/${item.productId}`}
                    state={{ product: item }}
                    className="flex items-center gap-3 group/link"
                  >
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shadow-md group-hover/link:shadow-xl group-hover/link:scale-105 transition-all duration-300 border-2 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>
                  </Link>
                </td>

                {/* Quantity Controls */}
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => decrementQuantity(item)}
                      disabled={item.quantity <= 1}
                      className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 dark:hover:from-cyan-600 dark:hover:to-blue-600 text-gray-700 dark:text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center font-bold shadow-sm hover:shadow-md"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-xs" />
                    </button>
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
                      className="w-14 px-2 py-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center font-bold text-sm transition-all"
                      min="1"
                    />
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 dark:hover:from-cyan-600 dark:hover:to-blue-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center font-bold shadow-sm hover:shadow-md"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    </button>
                  </div>
                </td>

                {/* Unit Price */}
                <td className="px-3 py-2 text-center">
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </span>
                </td>

                {/* Total Price */}
                <td className="px-3 py-2 text-center">
                  <span className="text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>

                {/* Remove Button */}
                <td className="px-3 py-2 text-center">
                  <button
                    aria-label="Remove item from cart"
                    onClick={() =>
                      dispatch(removeFromCart({ productId: item.productId }))
                    }
                    className="group/btn w-8 h-8 text-red-600 dark:text-red-400 hover:text-white border-2 border-red-500 dark:border-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex gap-3 mb-3">
              <Link
                to={`/products/${item.productId}`}
                state={{ product: item }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover shadow-md border-2 border-gray-200 dark:border-gray-600"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/products/${item.productId}`}
                  state={{ product: item }}
                  className="font-semibold text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  ${item.price.toFixed(2)} each
                </p>
                <p className="text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQuantity(item)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 text-gray-700 dark:text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faMinus} className="text-xs" />
                </button>
                <span className="w-12 text-center font-bold text-gray-800 dark:text-gray-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => incrementQuantity(item)}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                </button>
              </div>

              <button
                aria-label="Remove item"
                onClick={() =>
                  dispatch(removeFromCart({ productId: item.productId }))
                }
                className="w-9 h-9 text-red-600 dark:text-red-400 hover:text-white border-2 border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-lg transition-all hover:shadow-lg flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
