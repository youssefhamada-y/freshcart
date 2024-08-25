import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Brands() {
  const [isloading, setisloading] = useState(true);
  const [brand, setbrand] = useState([]);

  useEffect(() => {
    getbrands();
  }, []);

  async function getbrands() {
    setisloading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .finally(() => {
        setisloading(false);
      });
    setbrand(data.data);
  }

  if (isloading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1  gap-4">
        <Helmet>
          <title>Brands</title>
        </Helmet>
        {brand.map((product, index) => {
          return (
            <div className="max-w-2xl mx-auto gap-5">
              <div className="bg-white border-[1px] border-gray-400 rounded-md   hover:shadow-blue-600 hover:shadow-2xl transition-all duration-[0.5s]  hover:rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg p-8  "
                  src={product.image}
                  alt="product image"
                />
                <h1 className=" text-center text-[20px] text-black  py-4">
                  {product.name}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
