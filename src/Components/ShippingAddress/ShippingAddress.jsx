import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ShippingAddress() {
  const {cartId} =  useParams()
  const [isloading, setisloading] = useState(false);

  function onsubmit() {
    setisloading(true);
    
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then(({ data }) => {
        setisloading(false);
        
        location.href=data.session.url
      })
      .catch((err) => {
        setisloading(false);
      });
  }

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        city: "",
        phone: "",
        details: "",
      },
      onSubmit: onsubmit,
      validationSchema: Yup.object({
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone is required"),
        details: Yup.string().required("Details is required"),
      }),
    });

  return (
    <>
      <div className="  mx-auto w-full  bg-white dark:bg-gray-800 rounded-lg  px-8 py-10 flex flex-col items-center">
        <h1 className="md:text-[40px] lg:text-[40px] xl:text-[40px] sm:text-[30px] font-bold text-center text-green-700 dark:text-gray-200 mb-8">
          Add Your Shipping Address
        </h1>
        {/* <div className=" flex justify-start self-start">
          <h1 className=" text-[30px] pb-4">Login Now</h1>
        </div> */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start ">
            <label
              htmlFor="city"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              City:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              type="text"
              id="city"
              name="city"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.city && errors.city && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.city}
              </p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start ">
            <label
              htmlFor="details"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Details:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.details}
              type="text"
              id="details"
              name="details"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.details && errors.details && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.details}
              </p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start ">
            <label
              htmlFor="phone"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Phone:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.phone && errors.phone && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.phone}
              </p>
            )}
          </div>
          <button
            disabled={isloading}
            type="submit"
            className="bg-green-900 hover:bg-green-600 text-white font-medium  p-[10px]  rounded-md shadow-sm w-[100px] disabled:bg-gray-500 "
          >
            Check Out
            {isloading && <i className=" fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
