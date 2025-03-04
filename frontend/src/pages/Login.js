import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 relative overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-transparent to-pink-100 animate-pulse opacity-50"></div>

      <div className="shadow-xl rounded-lg bg-white p-8 w-full max-w-md mx-auto relative z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl text-pink-600 font-bold mt-4 animate-bounce">
            Welcome Back!
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="bg-white rounded-lg p-3 shadow-sm">
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-sm text-gray-800 border border-gray-300 rounded-full py-3 px-4 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                required
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer hover:text-pink-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-pink-600 hover:underline mt-2 block text-right"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white rounded-full w-full py-3 font-semibold shadow-md hover:bg-pink-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-pink-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
