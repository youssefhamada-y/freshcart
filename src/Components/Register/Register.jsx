import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { data } from "autoprefixer";
export default function Register() {

 const [isloading,setisloading]=useState(false)
 const [errmesg,seterrmesg]=useState("")
 const [succrmesg,setsuccmesg]=useState("")
 const navigate=useNavigate()

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: register,
      validationSchema:Yup.object({
        name:Yup.string().required("Name is required").min(3,"Name must be more than 2").max(20,"Name must be less than 20"),
        email:Yup.string().required("Email is required").email("Enter valid email"),
        password:Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
        rePassword:Yup.string().required("RePassword is required").oneOf([Yup.ref("password")]),
        phone:Yup.string().required("Phone is required")
      })
    });
  function validateData(values) {
    let errors = {};

    if (values.name == "") {
      errors.name = "Name is required";
    } else if (values.name.length <=2) {
      errors.name = "Name must be more than 2";
    } else if (values.name.length > 20) {
      errors.name = "Name must be less than 20";
    }

    if (values.email == "") {
      errors.email = "Email is required";
    }

    if (values.password == "") {
      errors.password = "Password is required";
    } else if (
      !/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(
        values.password
      )
    ) {
      errors.password =
        "matches a password containing atleast 1 lower case letter, 1 upper case letter, 1 digit and one of the mentioned special characters and which must be between 8 to 128 characters in length";
    }

    if (values.rePassword == "") {
      errors.rePassword = "RePassword is required";
    } else if (values.rePassword != values.password) {
      errors.rePassword = "Password and rePassword must matched";
    }

    if (values.phone == "") {
      errors.phone = "Phone is required";
    }

    console.log(errors);

    return errors;
  }

  async function register() {
    setsuccmesg("");
    seterrmesg("");
    setisloading(true)
   await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(({data})=>{
      setisloading(false)
      setsuccmesg(data.message)
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    }).catch((err)=>{
      setisloading(false)
      seterrmesg(err.response.data.message)
    })
    
    
  }
  return (
    <>
      <div className=" w-full mx-auto  bg-white dark:bg-gray-800 rounded-lg  px-8 py-10 flex flex-col items-center">
        <h1 className="text-[40px] font-bold text-center text-green-700 dark:text-gray-200 mb-8">
          Welcome To Freshcart
        </h1>
        <div className=" flex justify-start self-start">
        <h1 className=" text-[30px] pb-4">Register Now</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="Name"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Name:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              type="text"
              id="name"
              name="name"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.name && errors.name && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start ">
            <label
              htmlFor="email"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Email:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.email && errors.email && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="Password"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Password:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type="Password"
              id="Password"
              name="password"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.password && errors.password && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="Re-password"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Re-password:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rePassword}
              type="password"
              id="Re-password"
              name="rePassword"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.rePassword && errors.rePassword && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.rePassword}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="Phone"
              className="text-lg text-gray-700 dark:text-gray-200 mr-2"
            >
              Phone:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              type="Phone"
              id="Phone"
              name="phone"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {touched.phone && errors.phone && (
              <p className=" text-red-500 bg-[#F8D7DA] w-full rounded-md p-3 mt-4 border-2 border-red-100">
                {errors.phone}
              </p>
            )}
          </div>

          <div className=" flex justify-end">
            
            <button
            disabled={isloading}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm w-[100px] ms-96 disabled:bg-gray-500 "
            >
              Register
             { isloading && <i className="fas fa-spinner fa-spin"></i>}
            </button>
            
          </div>
        <div className=" flex justify-end">
        {errmesg && <p className=" text-red-500 text-center ">{errmesg}</p>}
        { succrmesg && <p className=" text-green-500 text-center me-5">{succrmesg}</p>}
        </div>
        </form>
      </div>
    </>
  );
}
