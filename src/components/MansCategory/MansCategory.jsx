import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const MansCategory = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;
  const { men, status } = useSelector((state) => state.products);
  // ✅ Always keep men as array
  const data = Array.isArray(men) ? men : [];
  return (
    <div className="max-w-screen-xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <img
          src="/assets/images/banner_mens.png"
          alt="Men's Sale Banner"
          className="w-full max-h-[350px] object-cover rounded-lg shadow-md"
        />
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load products.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {data.map((product) => (
          <Link key={product.id} to={`/product/${product._id}`}>
            <div className="border rounded-lg shadow-sm p-3 hover:shadow-md transition flex flex-col">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={`${BaseUrl}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mt-3 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base sm:text-lg font-bold text-gray-800">
                  {formatPrice(product.new_price)}
                </span>
                <span className="text-xs sm:text-sm line-through text-gray-400">
                  {formatPrice(product.old_price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MansCategory;
