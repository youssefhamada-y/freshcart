import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import CartProduct from './../CartProduct/CartProduct';
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cart, setcart] = useState(null);
const [isloading, setisloading] = useState(true)
  useEffect(() => {
    getUserCart();
  }, []);

 

  async function getUserCart() {
    setisloading(true)
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).finally(()=>{

      setisloading(false)
    })
    setcart(data);
  }

 function ClearCart() {
  
   axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,{
    headers:{
      token:localStorage.getItem("token")
    }
  }).finally(()=>{
    setcart(null);
  })
 
}



if (isloading) {
  return <LoadingScreen/>
}

  
  return (
  
cart ? <div className="pt-20">
    <Helmet>
    <title>Cart</title>
  </Helmet>
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {cart?.data.products.map((product, index) => {
          return (
            <CartProduct key={index} product={product } setcart={setcart} cart={cart}/>
          );
        })}
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">
              ${cart?.data.totalCartPrice} USD
            </p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <Link to={"/shippingaddress/"+cart?.data._id} className="mt-6 block text-center rounded-md bg-blue-500 p-2 font-medium text-blue-50 hover:bg-blue-600">
          Check out
        </Link>
      </div>
    </div>
    <button onClick={ClearCart} className=" text-red-500 border-2 border-red-500 rounded-md px-2 py-4 hover:text-white  hover:bg-red-500 mx-auto block   ">Clear Cart</button>
  </div> :<h1 className=" text-[40px] text-center p-4"> No Products In Your Cart</h1>

  )
}
