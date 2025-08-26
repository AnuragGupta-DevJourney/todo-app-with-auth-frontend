import React, { useState } from "react";
import axiosBaseURL from "../util/axiosBaseURL";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function SignUp() {
  const navigate = useNavigate();

  const initlizeFormDetails = {
    fullname: "",
    email: "",
    password: "",
  };

  const [signUpDetails, setSignUpDetails] = useState(initlizeFormDetails);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handlePasswordToggler = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const loaderId = toast.loading("processing....");
    try {
      const user = await axiosBaseURL.post("/user/signup", signUpDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (user.status === 201) {
        toast.success("Signup sucessfully", { id: loaderId, duration: 1000 });
        setSignUpDetails(initlizeFormDetails);
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }

      console.log(user);
    } catch (error) {
      console.log("Internal Server Error While Signing", error);
      if (error.status === 409) {
        return toast.error("Contained email user already exist!", {
          id: loaderId,
        });
      }
      toast.error("Internal Server Error", { id: loaderId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-32">
      <form
        className="text-white flex flex-col gap-4 justify-center px-4 bg-slate-900 p-8"
        onSubmit={handleLoginFormSubmit}
      >
        <div className="flex justify-center py-4">
          <h1 className="text-5xl font-bold text-white max-sm:text-2xl">
            &lt;Todo<span className="text-blue-600">App</span> /&gt;
          </h1>
        </div>
        <h1 className="text-3xl font-black text-center">SignUp Page</h1>

        <input
          type="text"
          name="fullname"
          value={signUpDetails.fullname}
          onChange={handleChange}
          className="bg-white text-black px-2 py-0.5"
          placeholder="Enter your full name"
        />

        <input
          type="email"
          name="email"
          value={signUpDetails.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="px-2 py-0.5 bg-white text-black"
        />

        <div className="relative">
          <input
            type={isPasswordShow ? "text" : "password"}
            name="password"
            value={signUpDetails.password}
            onChange={handleChange}
            placeholder="**********"
            className="px-2 py-0.5 bg-white text-black w-full"
          />
          <button
            type="button"
            onClick={handlePasswordToggler}
            className="absolute right-2 cursor-pointer bottom-1 text-black text-2xl"
          >
            <i>{isPasswordShow ? <FaEye /> : <FaEyeSlash />}</i>
          </button>
        </div>

        <p>
          already have an account ?{" "}
          <Link className="text-blue-500 underline" to={"/login"}>
            Login Here
          </Link>
        </p>

        <button
          className="px-6 py-1.5 bg-blue-700 text-white font-semibold cursor-pointer w-fit"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default SignUp;
