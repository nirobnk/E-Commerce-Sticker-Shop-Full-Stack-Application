import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="w-full max-w-sm rounded-xl mx-auto border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden flex flex-col bg-white dark:bg-gray-800 hover:shadow-2xl hover:border-primary dark:hover:border-accent transition-smooth transform hover:-translate-y-2">
      <Link
        to={`/products/${product.productId}`}
        state={{ product }}
        className="relative w-full h-64 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
        />
      </Link>
      <div className="relative p-5 flex flex-col font-primary min-h-[180px]">
        <h2 className="text-lg font-bold text-primary dark:text-light mb-2 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="bg-cyan-100 dark:bg-cyan-900 text-primary dark:text-cyan-200 font-bold text-lg py-2 px-4 rounded-lg">
            <Price currency="$" price={product.price} />
          </div>
          <button
            className="bg-gradient-to-r from-primary to-accent hover:from-dark hover:to-primary text-white font-semibold text-sm py-2 px-4 rounded-lg hover:shadow-lg transition-smooth btn-modern"
            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
