import { useLocation } from "react-router-dom";
import {
  faArrowLeft,
  faShoppingCart,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice.js";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (quantity < 1) return;
    dispatch(addToCart({ product, quantity }));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  const handleViewCart = () => navigate("/cart");

  return (
    <div className="min-h-[852px] flex items-center justify-center px-6 py-12 font-primary bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-darkbg dark:to-gray-900">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row md:space-x-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Product Image with Zoom Effect */}
        <div
          ref={zoomRef}
          onMouseMove={isHovering ? handleMouseMove : null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg overflow-hidden bg-cover"
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: isHovering ? "200%" : "cover",
            backgroundPosition: backgroundPosition,
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full opacity-0"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8 md:mt-0">
          <Link
            to="/home"
            className="inline-flex items-center text-primary dark:text-light font-medium hover:text-dark dark:hover:text-lighter"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back To All Products
          </Link>

          <div>
            <h1 className="text-4xl font-extrabold text-primary dark:text-light mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              ${product.price}
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            {/* Quantity Input */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-lg font-semibold text-primary dark:text-light"
              >
                Qty:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-24 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center font-semibold transition-smooth"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-lg font-semibold hover:shadow-xl transition-smooth transform hover:-translate-y-0.5 btn-modern"
            >
              Add to Cart
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </button>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-lg font-semibold hover:shadow-xl transition-smooth transform hover:-translate-y-0.5"
            >
              View Cart
              <FontAwesomeIcon icon={faShoppingBasket} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
