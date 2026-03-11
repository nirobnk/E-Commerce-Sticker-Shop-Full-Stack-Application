import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSun,
  faMoon,
  faAngleDown,
  faUser,
  faBox,
  faRightFromBracket,
  faGauge,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalQuantity } from "../store/cart-slice";
import { selectIsAuthenticated, selectUser, logout } from "../store/auth-slice";

import { toast } from "react-toastify";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/home");
  };

  const navLinkClass =
    "relative text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent transition-all duration-300 py-2 px-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary dark:after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

  const navLinkActiveClass =
    "relative text-base font-bold text-primary dark:text-accent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary dark:after:bg-accent py-2 px-1";

  const dropdownLinkClass =
    "flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-50/95 dark:bg-slate-900/98 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm overflow-visible">
      <div className="max-w-[1400px] mx-auto px-6 overflow-visible">
        <div className="flex items-center justify-between h-20 overflow-visible">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <span className="text-white text-xl font-extrabold">S</span>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              StickerVault
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8 overflow-visible">
            <ul className="hidden md:flex items-center gap-8">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? navLinkActiveClass : navLinkClass
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? navLinkActiveClass : navLinkClass
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? navLinkActiveClass : navLinkClass
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:text-white transition-all duration-300 group"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? faMoon : faSun}
                  className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"
                />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:text-white transition-all duration-300 group"
              >
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"
                />
                {totalQuantity > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg animate-pulse">
                    {totalQuantity}
                  </div>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">
                      {user.name.length > 8
                        ? `${user.name.slice(0, 8)}...`
                        : user.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`w-3 h-3 transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in z-[100]">
                      <div className="p-4 bg-gradient-to-r from-primary to-accent">
                        <p className="text-white font-bold text-sm">
                          {user.name}
                        </p>
                        <p className="text-blue-100 text-xs mt-1">
                          {user.email}
                        </p>
                      </div>
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className={dropdownLinkClass}>
                            <FontAwesomeIcon
                              icon={faUser}
                              className="w-4 h-4 text-primary dark:text-accent"
                            />
                            <span>My Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className={dropdownLinkClass}>
                            <FontAwesomeIcon
                              icon={faBox}
                              className="w-4 h-4 text-primary dark:text-accent"
                            />
                            <span>My Orders</span>
                          </Link>
                        </li>
                        {isAdmin && (
                          <>
                            <li className="border-t border-gray-200 dark:border-gray-700 my-2"></li>
                            <li>
                              <button
                                onClick={toggleAdminMenu}
                                className={`${dropdownLinkClass} justify-between`}
                              >
                                <div className="flex items-center gap-3">
                                  <FontAwesomeIcon
                                    icon={faGauge}
                                    className="w-4 h-4 text-primary dark:text-accent"
                                  />
                                  <span>Admin Panel</span>
                                </div>
                                <FontAwesomeIcon
                                  icon={faAngleDown}
                                  className={`w-3 h-3 transition-transform ${
                                    isAdminMenuOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {isAdminMenuOpen && (
                                <ul className="bg-gray-50 dark:bg-gray-900">
                                  <li>
                                    <Link
                                      to="/admin/products"
                                      className="flex items-center gap-3 pl-12 pr-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors"
                                    >
                                      <span>Manage Products</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/orders"
                                      className="flex items-center gap-3 pl-12 pr-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors"
                                    >
                                      <span>Manage Orders</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/messages"
                                      className="flex items-center gap-3 pl-12 pr-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors"
                                    >
                                      <span>Messages</span>
                                    </Link>
                                  </li>
                                </ul>
                              )}
                            </li>
                          </>
                        )}
                        <li className="border-t border-gray-200 dark:border-gray-700 my-2"></li>
                        <li>
                          <Link
                            to="/home"
                            onClick={handleLogout}
                            className={`${dropdownLinkClass} text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20`}
                          >
                            <FontAwesomeIcon
                              icon={faRightFromBracket}
                              className="w-4 h-4"
                            />
                            <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
