import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/cart/CartSlice";
const BaseUrl = import.meta.env.VITE_API_URL;
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ Fetch product from backend
  useEffect(() => {
    fetch(`${BaseUrl}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data?.images ? data.images[0] : data?.image);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 text-lg">⏳ Loading...</div>;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.new_price,
      image: product.images?.[0] || product.image,
      size: selectedSize,
    };

    dispatch(addToCart(productToAdd));
    alert("✅ Added to cart!");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-25">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">
          HOME
        </Link>{" "}
        &gt;{" "}
        <Link to="/shop" className="hover:underline">
          SHOP
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-medium">{product.name}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex gap-4">
          {product.images && (
            <div className="h-[420px] overflow-y-auto pr-1 flex flex-col gap-3">
              {product.images.map((img, index) => (
                <img
                  key={`${index}`}
                  src={`${BaseUrl}${img}`}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80 ${
                    mainImage === img ? "ring-2 ring-red-500" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md h-[420px] bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={`${BaseUrl}${mainImage}`}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="text-sm text-gray-600">(122)</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-500 line-through text-lg">
              {formatPrice(product.old_price)}
            </span>
            <span className="text-red-600 text-2xl font-bold">
              {formatPrice(product.new_price)}
            </span>
          </div>

          <p className="text-gray-600 mb-6">
            A lightweight, knitted pullover shirt with a round neckline and short
            sleeves.
          </p>

          {/* Size Selection */}
          <h3 className="font-semibold mb-2">Select Size</h3>
          <div className="flex gap-2 mb-6">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 rounded-md transition ${
                  selectedSize === size
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-600 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            ADD TO CART
          </button>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Tags:</strong> Modern, Latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
