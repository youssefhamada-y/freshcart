import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Notfound from "./Components/Notfound/Notfound";
import CounterContextProvider from "./Contexts/CounterContext";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoutes from "./Components/ProtectedAuthRoutes/ProtectedAuthRoutes";
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import { ToastContainer } from 'react-toastify';
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";

import { Offline, Online } from "react-detect-offline";
import AllOrders from "./Components/AllOrders/AllOrders";
function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "login", element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes> },
        { path: "register", element: <ProtectedAuthRoutes><Register /></ProtectedAuthRoutes> },
        { path: "cart", element: <ProtectedRoute><Cart /> </ProtectedRoute>},
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /> </ProtectedRoute>},
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        {path:"allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
        {path:"shippingaddress/:cartId",element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:"productsdetails/:id",element: <ProtectedRoute><ProductsDetails/></ProtectedRoute>},
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer/>
          {/* <Online>Only shown when you're online</Online> */}
          <Offline>
            <div className="fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200 ">
            Only shown offline (surprise!)
            </div>
            

          </Offline>
        </CounterContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
