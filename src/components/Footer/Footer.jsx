import React from "react";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/logo.png" // replace with your logo path
              alt="Shopper Logo"
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-gray-800">SHOPPER</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-gray-600 font-medium">
            <a href="#">Company</a>
            <a href="#">Products</a>
            <a href="#">Offices</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-5 text-gray-700 text-xl">
            <a href="#">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
            <a href="#">
              <FaPinterest className="hover:text-red-500 transition" />
            </a>
            <a href="#">
              <FaWhatsapp className="hover:text-green-500 transition" />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Shopper. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
