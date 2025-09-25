import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MansCategory from "./components/MansCategory/MansCategory";
import WomansCategory from "./components/WomansCategory/WomansCategory";
import KitsCategory from "./components/KitsCategory/KitsCategory";
import Login from "./components/Login/Login";
import Shop from "./components/Shop/Shop";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartPage from "./components/CardPage/CardPage";
import NewCollections from "./components/NewCollection/NewCollection";
import Test from "./components/test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMansCollection, getNewProduct, getWomenProduct } from "./Redux/features/Product/ProductSlice";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMansCollection());
      dispatch(getWomenProduct());
      dispatch(getNewProduct());
    }
  }, [dispatch, status]);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Shop /> },
        { path: "/shop", element: <Shop /> },
        { path: "/men", element: <MansCategory /> },
        { path: "/woman", element: <WomansCategory /> },
        { path: "/kids", element: <KitsCategory /> },
        { path: "/login", element: <Login /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/newcollection", element: <NewCollections /> },
        { path: "/test", element: <Test /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
