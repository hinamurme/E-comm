import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh] md:min-h-screen px-6 sm:px-10 lg:px-20 bg-gradient-to-b  from-pink-200 to-white pt-15 md:pt-0">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
        <p className="text-xs sm:text-sm lg:text-base font-semibold mb-3 tracking-widest text-gray-700">
          NEW ARRIVALS ONLY
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-snug md:leading-tight text-gray-900 mb-6">
          new <span role="img" aria-label="waving hand">👋</span>
          <br className="hidden sm:block" />
          collections
          <br className="hidden sm:block" />
          for everyone
        </h1>
        <Link to='./NewCollection' className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg rounded-full shadow-md hover:shadow-lg transition">
          Latest Collection →
        </Link>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 py-10 flex justify-center items-center mt-6 md:mt-0">
        <img
          src="/assets/images/hero_image.png"
          alt="Fashion model"
          className="object-contain w-[80%] sm:w-[65%] md:w-[85%] lg:w-[80%] max-w-[500px] h-auto drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
