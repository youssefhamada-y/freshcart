import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Product from "./../Product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from './../MainSlider/MainSlider';

export default function Home() {
  const [products, setproducts] = useState([]);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setisloading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .finally(() => {
        setisloading(false);
      });
    setproducts(data.data);
  }

  if (isloading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <MainSlider></MainSlider>
    <h2 className="text-[20px] text-center py-5 capitalize my-3 font-semibold">Shop Category Slider</h2>
    <CategoriesSlider></CategoriesSlider>
      <div className=" grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1  gap-4 py-8 ">
        <Helmet>
          <title>Home</title>
        </Helmet>
        {products.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </>
  );
}
