import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {/* Top Loading Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">
          <div className="h-full bg-white/30 animate-shimmer"></div>
        </div>
      )}

      <ScrollToTop />
      <Header />
      <div
        className={`transition-opacity duration-300 ${isLoading ? "opacity-60" : "opacity-100"}`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
