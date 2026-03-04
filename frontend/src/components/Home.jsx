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

export default function Home() {
  const products = useLoaderData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images - using product images or placeholder
  const heroImages = products.slice(0, 6).map((p) => p.imageUrl);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 overflow-hidden">
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

            {/* Right - Scrolling Images Grid */}
            <div className="relative h-[500px] hidden md:block">
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Column 1 - Scroll Up */}
                <div className="flex flex-col gap-4 animate-scroll-up">
                  {heroImages.slice(0, 2).map((img, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                  {heroImages.slice(0, 2).map((img, idx) => (
                    <div
                      key={`col1-repeat-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Column 2 - Scroll Down */}
                <div className="flex flex-col gap-4 animate-scroll-down">
                  {heroImages.slice(2, 4).map((img, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 3}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                  {heroImages.slice(2, 4).map((img, idx) => (
                    <div
                      key={`col2-repeat-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 3}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Column 3 - Scroll Up */}
                <div className="flex flex-col gap-4 animate-scroll-up">
                  {heroImages.slice(4, 6).map((img, idx) => (
                    <div
                      key={`col3-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 5}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                  {heroImages.slice(4, 6).map((img, idx) => (
                    <div
                      key={`col3-repeat-${idx}`}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`Sticker ${idx + 5}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 blur-3xl"></div>
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
      <section id="products" className="bg-white dark:bg-darkbg py-16">
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

      {/* CTA Section */}
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
