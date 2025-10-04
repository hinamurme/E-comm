import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ✅ Helper to format INR currency
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // no decimals
  }).format(price);
};

const NewCollection = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;
  const { kids } = useSelector((state) => state.products);

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-14 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl py-10 font-bold text-center mb-10 tracking-wide">
        NEW COLLECTIONS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {kids.map((product) => (
          <Link key={product.id} to={`/product/${product._id}`} className="block">
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
              {/* Image Box */}
              <div className="w-full aspect-[3/4] flex items-center justify-center bg-gray-50">
                <img
                  src={`${BaseUrl}${product.image}`}
                  alt={product.name || "Product"}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-lg font-bold text-gray-900">
                    {formatPrice(product.new_price)}
                  </span>
                  <span className="text-xs sm:text-sm line-through text-gray-400">
                    {formatPrice(product.old_price)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewCollection;
