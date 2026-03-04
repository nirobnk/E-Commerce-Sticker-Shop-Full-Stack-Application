import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="group w-full max-w-sm mx-auto">
      {/* Card Container */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
        {/* Image Section */}
        <Link
          to={`/products/${product.productId}`}
          state={{ product }}
          className="relative block w-full h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Quick view badge */}
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-primary dark:text-accent px-3 py-1.5 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            Quick View
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <Link to={`/products/${product.productId}`} state={{ product }}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h2>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed min-h-[40px]">
            {product.description}
          </p>

          {/* Price and Action Row */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                Price
              </span>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <Price currency="$" price={product.price} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
              className="relative flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold text-sm px-5 py-3 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 overflow-hidden group/btn"
            >
              <span className="relative z-10">Add to Cart</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
}
