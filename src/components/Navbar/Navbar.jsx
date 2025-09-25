import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../../Redux/features/cart/CartSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    dispatch(clearcart());
    navigate("/login");
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/images/logo_big.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg">SHOPPER</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center w-full px-6">
          <div className="flex space-x-6 items-center justify-center flex-1">
            <NavLink to="/shop" className="hover:text-red-600">
              Shop
            </NavLink>
            <NavLink to="/men" className="hover:text-red-600">
              Men
            </NavLink>
            <NavLink to="/woman" className="hover:text-red-600">
              Women
            </NavLink>
            <NavLink to="/kids" className="hover:text-red-600">
              Kids
            </NavLink>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-gray-700 cursor-pointer hover:text-black">
              <FaSearch />
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded-full hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border rounded-full hover:bg-gray-100"
              >
                Login
              </button>
            )}

            <Link to="/cart" className="relative text-2xl">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden flex flex-col space-y-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </div>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-red-600"
          >
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="block hover:text-red-600"
          >
            Shop
          </NavLink>
          <NavLink
            to="/men"
            onClick={() => setIsOpen(false)}
            className="block hover:text-red-600"
          >
            Men
          </NavLink>
          <NavLink
            to="/woman"
            onClick={() => setIsOpen(false)}
            className="block hover:text-red-600"
          >
            Women
          </NavLink>
          <NavLink
            to="/kids"
            onClick={() => setIsOpen(false)}
            className="block hover:text-red-600"
          >
            Kids
          </NavLink>

          {/* ✅ LOGIN BUTTON WITH MARK */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 border rounded-full hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false); // ✅ CLOSE MENU on Login tap
                navigate("/login");
              }}
              className="w-full text-left px-4 py-2 border rounded-full hover:bg-gray-100"
            >
            Login
            </button>
          )}

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="relative text-2xl block"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
