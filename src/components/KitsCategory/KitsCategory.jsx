import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BaseUrl = import.meta.env.VITE_API_URL;
const KitsCategory = () => {
  const { kids } = useSelector((state)=>state.products)
  const kidsProducts = kids.filter((product) => product.category === "kids");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="mb-8">
        <img
          src="/assets/images/banner_kids.png"
          alt="Kids Sale Banner"
          className="w-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {kidsProducts.map((product) => (
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

export default KitsCategory;
