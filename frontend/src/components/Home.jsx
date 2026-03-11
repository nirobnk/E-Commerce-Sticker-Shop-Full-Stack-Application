import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldAlt,
  faRotateLeft,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth-slice";

export default function Home() {
  const products = useLoaderData();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images - using specific stickers (13, 13, 24, 25, 26, 27, 29, 30)
  const selectedIndices = [10, 11, 23, 20, 21, 26, 28, 22, 19]; // 0-based indices
  const heroImages = selectedIndices.map(
    (index) => products[index]?.imageUrl || products[0]?.imageUrl,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-7 items-center">
            {/* Left Content */}
            <div className="text-white z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                Express Yourself with
                <span className="block text-yellow-300">Premium Stickers</span>
              </h1>
              <p className="text-base md:text-lg mb-5 text-blue-50 leading-5">
                Discover unique, high-quality stickers that bring your
                personality to life. Perfect for laptops, water bottles, and
                more!
              </p>
              <Link
                to="#products"
                className="inline-block bg-white text-blue-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:scale-105"
              >
                Shop Stickers
              </Link>
            </div>

            {/* Right - Professional Circular Floating Layout */}
            <div className="relative h-[450px] hidden md:flex items-center justify-center">
              {/* Center large sticker */}
              <div className="absolute z-10 w-[270px] h-[270px] group animate-float">
                <img
                  src={heroImages[0]}
                  alt="Featured Sticker"
                  className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_40px_40px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Circular orbit stickers */}
              {/* Top sticker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[170px] h-[170px] group animate-float-delayed-1">
                <img
                  src={heroImages[1]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Top right sticker */}
              <div className="absolute top-4 right-0 w-[165px] h-[165px] group animate-float-delayed-2">
                <img
                  src={heroImages[2]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Right sticker */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-[175px] h-[175px] group animate-float-delayed-3">
                <img
                  src={heroImages[3]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Bottom right sticker */}
              <div className="absolute bottom-6 right-2 w-[160px] h-[160px] group animate-float-delayed-4">
                <img
                  src={heroImages[4]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Bottom sticker */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[180px] h-[180px] group animate-float-delayed-5">
                <img
                  src={heroImages[5]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Bottom left sticker */}
              <div className="absolute bottom-8 left-0 w-[165px] h-[165px] group animate-float-delayed-6">
                <img
                  src={heroImages[6]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Left sticker */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-[172px] h-[172px] group animate-float-delayed-7">
                <img
                  src={heroImages[7]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Top left sticker */}
              <div className="absolute top-6 left-2 w-[158px] h-[158px] group animate-float-delayed-8">
                <img
                  src={heroImages[8]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-300 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-5 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-2">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-2xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                Worldwide Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Available as standard or express delivery
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-2">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-2xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                Secure Payments
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                100% Secure Payment with SSL certification
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-2">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  className="text-2xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                Free Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Exchange or money back guarantee for all orders
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-2">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="text-2xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Dedicated support team ready to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="bg-blue-50 dark:from-gray-900 dark:to-gray-800 py-6"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Shop Our Collection
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated selection of premium stickers designed to
              express your unique style
            </p>
          </div>
          <ProductListings products={products} />
        </div>
      </section>

      {/* CTA Section - Only show for non-logged-in users */}
      {!isAuthenticated && (
        <section className="bg-gradient-to-r from-primary to-accent py-6">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-base text-blue-50 mb-4 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have personalized their
              world with our premium stickers
            </p>
            <Link
              to="/register"
              className="inline-block px-6 py-2 rounded-full text-sm font-bold bg-yellow-300 text-blue-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              Create Account & Get 10% Off
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch products. Please try again.",
      { status: error.status || 500 },
    );
  }
}
