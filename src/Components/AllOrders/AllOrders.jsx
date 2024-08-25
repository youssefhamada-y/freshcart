import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function AllOrders() {
  const { id } = jwtDecode(localStorage.getItem("token"));

  const [load, setload] = useState(false);
  const [allorder, setallorder] = useState(null);

  async function getAllOrders() {
    setload(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      setallorder(data);
      setload(false);
    } catch (error) {}
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (load) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="py-10 ">
        <div className="w-full md:w-[80%] mx-auto">
          {allorder
            ? allorder.map((order, index) => {
                return (
                  <div key={index} className="p-12 mb-3 bg-slate-200 rounded-md ">
                      <h1 className="text-center text-[35px] font-sans mb-2 ">All Orders</h1>
                    <div className="flex md:flex-row lg:flex-row sm:flex-col bg-gray-100  justify-center items-center shadow-lg shadow-green-600 p-[60px]" >
                      <div className="flex flex-row justify-start w-[80%]">
                        {order.cartItems?.map((item, index) => {
                          return (
                            <div key={index} className="w-[35%]  flex flex-row  ">
                              <img
                                src={item.product.imageCover}
                                className="w-full"
                                alt=""
                              />
                             <div className="flex flex-col justify-center p-7 ">
                             <h2 className="p-1 text-green-600 line-clamp-2 ">  {item.product.title}</h2>
                             <h2 className=" p-1 ">{item.product.brand.name}</h2>
                             <h2 className=" p-1  "> Count:{item.count}</h2>
                             <h2 className=" p-1  "> price:{item.price}$</h2>
                             
                             </div>

                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[35%] text-center border border-1px border-gray-500 rounded-md p-5">
                        <h2 className=""><span>Payment Method : {order.paymentMethodType}</span></h2>
                        <h2 className=""><span>TotalOrderPrice : {order.totalOrderPrice} $</span></h2>
                        <h2 className=""><span>Shipping Price : {order.shippingPrice}</span></h2>

                      </div>
            
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
}
