import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

// ✅ Helper to format INR
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // no decimals
  }).format(price);
};

const Products = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;
  const { women } = useSelector((state) => state.products);
  const data = women.slice(0, 4);

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12 md:py-16 bg-white">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-14">
        POPULAR IN WOMEN
        <div className="w-12 sm:w-16 h-1 bg-black mx-auto mt-2"></div>
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {data.map((item) => (
          <Link key={item.id} to={`/product/${item._id}`} className="block">
            <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition duration-300 p-3 sm:p-4 flex flex-col">
              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-50">
                <img
                  src={`${BaseUrl}${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Product Name */}
              <h3 className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 font-medium text-center hover:text-red-600 transition">
                {item.name}
              </h3>

              {/* Price */}
              <div className="flex justify-center gap-2 mt-2 text-sm sm:text-base md:text-lg font-semibold">
                <span className="text-gray-900">
                  {formatPrice(item.new_price)}
                </span>
                <span className="line-through text-gray-400 font-normal">
                  {formatPrice(item.old_price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
