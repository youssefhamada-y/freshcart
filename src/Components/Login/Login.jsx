import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../Contexts/AuthContext';
export default function Login() {
  const [isloading, setisloading] = useState(false);
  const [errmesg, seterrmesg] = useState("");
  const navigate = useNavigate();
 const {setusertoken}= useContext(AuthContext)

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: Login,
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Enter valid email"),
        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Minimum eight characters, at least one letter, one number and one special character"
          ),
      }),
    });
  async function Login() {
    seterrmesg('')
    setisloading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({data}) => {
        setisloading;(false)
        setusertoken(data.token)
        localStorage.setItem("token",data.token)
        if (location.pathname == "/login") {
          navigate("/")
        } else {
          navigate(location.pathname)
        }
       
      })
      .catch((err) => {
        setisloading(false)
        seterrmesg(err.response.data.message)
      });
  }
  return (
    <>
      <div className="  mx-auto w-full  bg-white dark:bg-gray-800 rounded-lg  px-8 py-10 flex flex-col items-center">
        <h1 className="text-[40px] font-bold text-center text-green-700 dark:text-gray-200 mb-8">
          Welcome To Freshcart
        </h1>
        <div className=" flex justify-start self-start">
          <h1 className=" text-[30px] pb-4">Login Now</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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

          <div className=" flex flex-row justify-between">
            <button
            disabled={isloading}
              type="submit"
              className="bg-green-900 hover:bg-green-600 text-white font-medium  p-[10px]  rounded-md shadow-sm w-[100px] disabled:bg-gray-500 "
            >
              Login Now
              {isloading && <i className=" fas fa-spinner fa-spin"></i>}
            </button>
          </div>
          <div className=" flex justify-end">
            <p className=" text-red-500">{errmesg}</p>
          </div>
        </form>
      </div>
    </>
  );
}
