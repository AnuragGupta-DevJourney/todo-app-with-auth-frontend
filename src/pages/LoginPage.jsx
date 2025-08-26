import React, { useState } from "react";
import axiosBaseURL from "../util/axiosBaseURL";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function LoginPage() {
  const initlizeFormDetails = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(initlizeFormDetails);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handlePasswordToggler = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const loaderId = toast.loading("Processing....");
    try {
      const response = await axiosBaseURL.post("/user/login", loginDetails);
      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        toast.success("Login Succesfully", { duration: 800, id: loaderId });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if(error.status === 409){
        toast.error("Incorrect Password" , {id : loaderId})
        return
      }
      if(error.status===404){
        toast.error("check email or sign up" , {id : loaderId})
        return
      }
      console.log("Internal Server Error while logging", error);
      toast.error("Internal Server Error while logging", { id: loaderId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-32">
      <form
        className="text-white flex flex-col gap-4 justify-center px-4 bg-slate-900 p-8 rounded-md"
        onSubmit={handleLoginFormSubmit}
      >
        <div className="flex justify-center py-4">
          <h1 className="text-5xl font-bold text-white max-sm:text-2xl">
            &lt;Todo<span className="text-blue-600">App</span> /&gt;
          </h1>
        </div>
        <h1 className="text-3xl font-black text-center">Login Page</h1>
        <input
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          className="px-2 py-0.5 bg-white text-black "
          placeholder="Enter your email"
          required
        />
        <div className="relative">
          <input
            type={isPasswordShow ? "text" : "password"}
            name="password"
            value={loginDetails.password}
            onChange={handleChange}
            placeholder="*******" 
            required
            className="px-2 py-0.5 bg-white text-black w-full" 
          />
          <button onClick={handlePasswordToggler} type="button" className=" cursor-pointer absolute right-2 text-2xl bottom-1 text-black">
            <i>
              { isPasswordShow ? <FaEye/> : <FaEyeSlash/> }
            </i>
          </button>
        </div>
        <p className="">
          Not have an account?{" "}
          <Link className="text-blue-600  underline" to={"/signup"}>
            SignUp
          </Link>
        </p>
        <button
          className="px-6 py-1.5 bg-blue-700 text-white font-semibold cursor-pointer w-fit"
          type="submit"
        >
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default LoginPage;
