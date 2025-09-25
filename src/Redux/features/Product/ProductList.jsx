import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./ProductSlice"; // make sure this matches your slice
const BaseUrl = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  console.log(items);
  

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
             src={`${BaseUrl}${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h3>
            <p className="text-indigo-600 font-bold mt-2">
              ${product.new_price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
