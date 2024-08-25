import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import ProductSlider from "./../ProductSlider/ProductSlider";
import Relatedproducts from './../Relatedproducts/Relatedproducts';
import { addProductToCart } from "../../cartServices";
import { AuthContext } from "../../Contexts/AuthContext";

export default function ProductsDetails() {
  let { id } = useParams();

  const [productdetails, setproductdetails] = useState(null);
  const [relatedproducts, setrelatedproducts] = useState([]);
  const [isloading, setisloading] = useState(true);
 let {usertoken}= useContext(AuthContext)

  useEffect(() => {
    getdetails();
  }, [id]);
  async function getdetails() {
    setisloading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setproductdetails(data.data);
    getrelatedproducts(data.data?.category._id)
    setisloading(false);
  }

  async function getrelatedproducts(categoryid) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/",{
       params:{
        "category":categoryid
       }
      }
    );
    setrelatedproducts(data.data)
  }

  return (
    <>
      {isloading ? (
        <LoadingScreen />
      ) : (
        <div x-data="{ cartOpen: false , isOpen: false }" class="bg-white">
          {/* <div  class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300">
        <div class="flex items-center justify-between">
            <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
            <button  class="text-gray-600 focus:outline-none">
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <hr class="my-3"/>
        <div class="flex justify-between mt-6">
            <div class="flex">
                <img class="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt=""/>
                <div class="mx-3">
                    <h3 class="text-sm text-gray-600">Mac Book Pro</h3>
                    <div class="flex items-center mt-2">
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span class="text-gray-700 mx-2">2</span>
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <span class="text-gray-600">20$</span>
        </div>
        <div class="flex justify-between mt-6">
            <div class="flex">
                <img class="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt=""/>
                <div class="mx-3">
                    <h3 class="text-sm text-gray-600">Mac Book Pro</h3>
                    <div class="flex items-center mt-2">
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span class="text-gray-700 mx-2">2</span>
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <span class="text-gray-600">20$</span>
        </div>
        <div class="flex justify-between mt-6">
            <div class="flex">
                <img class="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt=""/>
                <div class="mx-3">
                    <h3 class="text-sm text-gray-600">Mac Book Pro</h3>
                    <div class="flex items-center mt-2">
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span class="text-gray-700 mx-2">2</span>
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <span class="text-gray-600">20$</span>
        </div>
        <div class="mt-8">
            <form class="flex items-center justify-center">
                <input class="form-input w-48" type="text" placeholder="Add promocode"/>
                <button class="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Apply</span>
                </button>
            </form>
        </div>
        <a class="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            <span>Chechout</span>
            <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
    </div> */}
          <main className="my-8">
            <div className="container mx-auto px-6">
              <div className="md:flex md:items-center">
                <div className="w-full  md:w-3/12 lg:h-96">
                  {/* <img
                    className="h-full  rounded-md object-contain max-w-lg mx-auto"
                    src={productdetails?.imageCover}
                    alt="Nike Air"
                  /> */}
                  <ProductSlider images={productdetails?.images} />
                </div>

                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                  <h3 className="text-gray-700 uppercase text-lg mb-3">
                    {" "}
                    {productdetails?.title}
                  </h3>
                  <span className="text-gray-700 mt-3 text-[20px]">
                    ${productdetails?.price}
                  </span>
                  <hr className="my-3" />
                  {/* <div className="mt-2">
                        <label className="text-gray-700 text-sm" for="count">Count:</label>
                        <div className="flex items-center mt-1">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-gray-700 text-lg mx-2">20</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div> */}
                  {/* <div className="mt-3">
                        <label className="text-gray-700 text-sm" for="count">Color:</label>
                        <div className="flex items-center mt-1">
                            <button className="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                            <button className="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                            <button className="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                        </div>
                    </div> */}
                  <div className="flex items-center mt-2.5 mb-5">
                    {[1, 2, 3, 4, 5].map((rate) => {
                      return (
                        <svg
                          className={
                            productdetails?.ratingsAverage >= rate
                              ? "w-5 h-5 text-yellow-300"
                              : "w-5 h-5 text-gray-300"
                          }
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      );
                    })}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      {productdetails?.ratingsAverage}
                    </span>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" for="count">
                      Brand:
                    </label>
                    <div className="flex items-center mt-1">
                      <h3 className=" ">{productdetails?.brand.name}</h3>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" for="count">
                      Description:
                    </label>
                    <div className="flex items-center mt-1">
                      <h3 className=" ">{productdetails?.description}</h3>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" for="count">
                      Category:
                    </label>
                    <div className="flex items-center mt-1">
                      <h3>{productdetails?.category.name}</h3>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" for="count">
                      sub category:
                    </label>
                    <div className="flex items-center mt-1">
                      <h3>{productdetails?.subcategory[0].name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center mt-6">
                    <button 
                    onClick={()=>addProductToCart(productdetails._id,usertoken)}
                    className="mx-2  text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                      <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
             <Relatedproducts products={relatedproducts}/>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
