import React from "react";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import WishList from "./Components/WishList/WishList";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishlistContextProvider from "./Context/WishListContext";
import Orders from "./Components/Orders/Orders";
import Adress from "./Components/Adress/Adress";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/adress",
          element: (
            <ProtectedRoute>
              <Adress />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <WishlistContextProvider>

  <CartContextProvider>
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </CounterContextProvider>
      </UserContextProvider>
      <Toaster />
    </CartContextProvider>
  </WishlistContextProvider> 

  ;
}
