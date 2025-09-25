import React from "react";

const Offer = () => {
  return (
    <div className="flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-5xl h-[450px] flex items-center justify-center bg-gradient-to-b from-pink-100 to-white shadow-lg rounded-2xl px-6 sm:px-10">
        <div className="text-center w-full">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Get Exclusive Offers On Your Email
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Subscribe to our newsletter and stay updated.
          </p>

          {/* Input + Button */}
          <form className="mt-6 flex items-center justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email id"
              className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-r-full font-medium hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Offer;
