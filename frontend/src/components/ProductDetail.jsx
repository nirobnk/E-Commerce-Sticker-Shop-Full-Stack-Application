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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent font-semibold text-sm mb-4 group transition-all duration-300"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Products</span>
        </Link>

        {/* Product Detail Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - Product Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6">
              <div
                ref={zoomRef}
                onMouseMove={isHovering ? handleMouseMove : null}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl cursor-zoom-in"
                style={{
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: isHovering ? "200%" : "contain",
                  backgroundPosition: backgroundPosition,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full opacity-0"
                />

                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-lg">
                  🔍 Hover to zoom
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right - Product Info */}
            <div className="p-6 flex flex-col justify-center">
              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1">
                  Price
                </span>
                <div className="text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  ${product.price}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6"></div>

              {/* Quantity Selector */}
              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-3 font-semibold"
                >
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-all duration-300 hover:scale-110"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 h-12 text-center text-xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-primary/20 dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-all duration-300 hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="group relative w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-xl"
                    />
                    <span>Add to Cart</span>
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                {/* View Cart */}
                <button
                  onClick={handleViewCart}
                  className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-base font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    className="text-xl"
                  />
                  <span>View Cart</span>
                </button>
              </div>

              {/* Product Features */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Quality
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Premium
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-lg">🚚</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Shipping
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Free
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
