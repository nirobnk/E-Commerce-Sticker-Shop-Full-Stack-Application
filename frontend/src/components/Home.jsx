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
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white z-10">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Express Yourself with
                <span className="block text-yellow-300">Premium Stickers</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
                Discover unique, high-quality stickers that bring your
                personality to life. Perfect for laptops, water bottles, and
                more!
              </p>
              <Link
                to="#products"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:scale-105"
              >
                Shop Stickers
              </Link>
            </div>

            {/* Right - Professional Circular Floating Layout */}
            <div className="relative h-[550px] hidden md:flex items-center justify-center">
              {/* Center large sticker */}
              <div className="absolute z-10 w-[260px] h-[260px] group animate-float">
                <img
                  src={heroImages[0]}
                  alt="Featured Sticker"
                  className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_40px_40px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Circular orbit stickers */}
              {/* Top sticker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[180px] h-[180px] group animate-float-delayed-1">
                <img
                  src={heroImages[1]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Top right sticker */}
              <div className="absolute top-8 right-4 w-[160px] h-[160px] group animate-float-delayed-2">
                <img
                  src={heroImages[2]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Right sticker */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[170px] h-[170px] group animate-float-delayed-3">
                <img
                  src={heroImages[3]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Bottom right sticker */}
              <div className="absolute bottom-10 right-6 w-[155px] h-[155px] group animate-float-delayed-4">
                <img
                  src={heroImages[4]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Bottom sticker */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[175px] h-[175px] group animate-float-delayed-5">
                <img
                  src={heroImages[5]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Bottom left sticker */}
              <div className="absolute bottom-12 left-4 w-[158px] h-[158px] group animate-float-delayed-6">
                <img
                  src={heroImages[6]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Left sticker */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-[168px] h-[168px] group animate-float-delayed-7">
                <img
                  src={heroImages[7]}
                  alt="Sticker"
                  className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Top left sticker */}
              <div className="absolute top-12 left-6 w-[150px] h-[150px] group animate-float-delayed-8">
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
      <section className="bg-gray-50 dark:bg-gray-900 py-12 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-3xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                Worldwide Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Available as standard or express delivery
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-3xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                100% Secure Payment with 256-bit SSL encryption
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  className="text-3xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                Free Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Exchange or money back guarantee for all orders
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="text-3xl text-primary dark:text-cyan-400"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Dedicated support team ready to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Shop Our Collection
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated selection of premium stickers designed to
              express your unique style
            </p>
          </div>
          <ProductListings products={products} />
        </div>
      </section>

      {/* CTA Section - Only show for non-logged-in users */}
      {!isAuthenticated && (
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have personalized their
              world with our premium stickers
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
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
