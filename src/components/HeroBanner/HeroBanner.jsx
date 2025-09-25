import React from "react";
import exclusiveImage from "/assets/images/exclusive_image.png"; // Import image directly

const HeroBanner = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
      <section className="relative bg-gradient-to-r from-pink-50 via-white to-purple-50 
                          px-4 sm:px-6 md:px-10 lg:px-14 py-10 sm:py-14 lg:py-20 
                          flex flex-col-reverse md:flex-row items-center justify-between 
                          rounded-2xl shadow-lg overflow-hidden max-w-7xl w-full">

        {/* Decorative Background */}
        <div className="absolute -top-10 -left-10 w-36 h-36 sm:w-48 sm:h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-36 h-36 sm:w-48 sm:h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

        {/* Left Side - Text */}
        <div className="max-w-md lg:max-w-lg z-10 order-2 md:order-1 mt-10 md:mt-0 text-center md:text-left">
          <p className="text-pink-600 font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base mb-3">
            Limited Time Offer
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Exclusive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Offers
            </span>{" "}
            <br />
            For You
          </h1>

          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            ONLY ON BEST SELLERS PRODUCTS. Don’t miss out on our special deals curated just for you.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Check Now
            </button>

            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-gray-50 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="mt-8 flex gap-3 justify-center md:justify-start text-center">
            {["02", "12", "45", "30"].map((time, idx) => (
              <div
                key={idx}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm w-16 sm:w-20"
              >
                <div className="text-lg sm:text-xl font-bold text-gray-800">{time}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {["Days", "Hours", "Mins", "Secs"][idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 z-10 mb-8 md:mb-0">
          <img
            src={exclusiveImage}
            alt="Exclusive Offer"
            className="w-[75%] sm:w-[65%] md:w-[80%] max-w-[450px] lg:max-w-[500px] object-contain drop-shadow-xl"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=774&q=80";
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
