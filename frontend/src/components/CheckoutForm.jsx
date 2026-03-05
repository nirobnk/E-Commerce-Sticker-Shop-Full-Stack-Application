import React, { useState } from "react";
import { selectUser } from "../store/auth-slice";
import apiClient from "../api/apiClient";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  clearCart,
} from "../store/cart-slice";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [elementErrors, setElementErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const isDarkMode = localStorage.getItem("theme") === "dark";

  const labelStyle =
    "block text-sm font-semibold text-primary dark:text-light mb-1.5";
  const fieldBaseClass =
    "w-full px-3 py-2.5 text-base border-2 rounded-lg transition border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400";
  const fieldErrorClass =
    "border-red-400 dark:border-red-500 focus:ring-red-400 focus:border-red-400";
  const fieldValidClass = "border-gray-300 dark:border-gray-600";

  const getClassForElement = (field) =>
    `${fieldBaseClass} ${
      elementErrors[field] ? fieldErrorClass : fieldValidClass
    }`;

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: isDarkMode ? "#F3F4F6" : "#1F2937",
        backgroundColor: isDarkMode ? "#374151" : "#FFFFFF",
        "::placeholder": {
          color: isDarkMode ? "#9CA3AF" : "#9CA3AF",
        },
      },
      invalid: {
        color: "#EF4444",
        backgroundColor: isDarkMode ? "#374151" : "#FFFFFF",
      },
    },
  };

  function handleCardChange(field, event) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js is not loaded yet.");
      return;
    }

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage("Please correct the highlighted errors.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await apiClient.post("/payment/create-payment-intent", {
        amount: totalPrice * 100,
        currency: "usd",
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              phone: user.mobileNumber,
              address: {
                line1: user.street,
                city: user.city,
                state: user.state,
                postal_code: user.postalCode,
                country: user.country,
              },
            },
          },
        },
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        try {
          await apiClient.post("/orders", {
            totalPrice: totalPrice,
            paymentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            items: cart.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          });
          sessionStorage.setItem("skipRedirectPath", "true");
          dispatch(clearCart());
          navigate("/order-success");
        } catch (orderError) {
          console.error("Failed to create order:", orderError);
          setErrorMessage("Order creation failed. Please contact support.");
        }
      }
    } catch (error) {
      setErrorMessage("Error processing payment. Please try again later.");
      console.error("Error creating PaymentIntent:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h flex items-center justify-center font-primary bg-gradient-to-br from-slate-50 via-cyan-50/40 to-blue-50/60 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 py-6 px-4">
      <div
        className={
          isProcessing
            ? "visible flex flex-col justify-center items-center my-[200px]"
            : "hidden"
        }
      >
        <p className="mt-4 text-3xl font-bold text-primary dark:text-accent animate-pulse">
          Processing Payment.... Don't refresh the page
        </p>
      </div>
      <div
        className={
          isProcessing
            ? "hidden"
            : "visible bg-white dark:bg-gray-800 shadow-2xl rounded-2xl max-w-md w-full px-6 py-5 border border-gray-200 dark:border-gray-700"
        }
      >
        {/* Compact Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Secure checkout powered by Stripe
          </p>
        </div>

        {/* Amount Display */}
        <div className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-lg py-3 px-4 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-0.5">
            Amount to be charged
          </p>
          <p className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg py-2 px-3">
              {errorMessage}
            </div>
          )}
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className={labelStyle}>
              Card Number
            </label>
            <div id="cardNumber" className={getClassForElement("cardNumber")}>
              <CardNumberElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardNumber", event)}
              />
            </div>
            {elementErrors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">
                {elementErrors.cardNumber}
              </p>
            )}
          </div>

          {/* Expiry and CVC in one row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card Expiry */}
            <div>
              <label htmlFor="cardExpiry" className={labelStyle}>
                Expiry Date
              </label>
              <div id="cardExpiry" className={getClassForElement("cardExpiry")}>
                <CardExpiryElement
                  options={elementOptions}
                  onChange={(event) => handleCardChange("cardExpiry", event)}
                />
              </div>
              {elementErrors.cardExpiry && (
                <p className="text-red-500 text-xs mt-1">
                  {elementErrors.cardExpiry}
                </p>
              )}
            </div>

            {/* Card CVC */}
            <div>
              <label htmlFor="cardCvc" className={labelStyle}>
                CVC
              </label>
              <div id="cardCvc" className={getClassForElement("cardCvc")}>
                <CardCvcElement
                  options={elementOptions}
                  onChange={(event) => handleCardChange("cardCvc", event)}
                />
              </div>
              {elementErrors.cardCvc && (
                <p className="text-red-500 text-xs mt-1">
                  {elementErrors.cardCvc}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full px-6 py-3 text-white text-base font-bold rounded-xl transition-all duration-300 bg-gradient-to-r bg-blue-500 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-900/50 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2">
            <svg
              className="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secured by Stripe | 256-bit SSL encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
}
