import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    setisloading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .finally(() => {
        setisloading(false);
      });
    setcategories(data.data);
  }

  if (isloading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1  gap-4 ">
        <Helmet>
          <title>Categories</title>
        </Helmet>
        {categories.map((product, index) => {
          return (
            <div key={index} className="max-w-2xl mx-auto gap-5 ">
              <div className="bg-white border-[1px] border-gray-400 rounded-md   hover:shadow-green-600 hover:shadow-2xl transition-all duration-[0.5s]  hover:rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg p-8 w-full h-[500px]  "src={product.image}alt="product image" />
                <h1 className=" text-center text-[30px] text-green-700 py-4">{product.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
