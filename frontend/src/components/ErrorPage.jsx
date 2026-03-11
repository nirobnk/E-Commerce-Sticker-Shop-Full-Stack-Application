import React from "react";
import Header from "./Header";
import Footer from "./footer/Footer";
import errorImage from "../assets/util/error.png";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status;
    errorMessage = routeError.data;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main Content */}
      <main className="flex-grow">
        <div className="py-6 bg-normalbg dark:bg-darkbg font-primary">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-3">
              <h1 className="text-2xl font-bold text-primary dark:text-light text-center">{errorTitle}</h1>
            </div>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-300 flex flex-col items-center">
            <p className="max-w-[500px] px-2 mx-auto text-sm leading-5 mb-3">
              {errorMessage}
            </p>
            <img
              src={errorImage}
              alt="Error"
              className="w-full max-w-[400px] mx-auto mb-4"
            />
            <Link
              to="/home"
              className="py-2 px-6 text-white dark:text-black text-sm rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}