import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check Passwords and Confirm Password.");
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 relative overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-300 via-transparent to-red-100 animate-pulse opacity-50"></div>

      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md mx-auto z-10 relative animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl text-pink-500 font-bold mt-4 animate-bounce">
            Create Your Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="rounded-lg p-3 shadow-sm">
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none text-sm text-gray-800 border border-gray-300 rounded-full py-3 px-4 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className=" rounded-lg p-3 shadow-sm">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-sm text-gray-800 border border-gray-300 rounded-full py-3 px-4 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none text-sm text-gray-800 border border-gray-300 rounded-full py-3 px-4 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                required
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer hover:text-red-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none text-sm text-gray-800 border border-gray-300 rounded-full py-3 px-4 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                required
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer hover:text-red-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-pink-600 text-white rounded-full w-full py-3 font-semibold shadow-md hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
