import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { UseAuth } from "../Hook/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, googleLogin } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#E8F1FF]">
      <div className="bg-white p-8 rounded shadow-md w-96">
             <h2 className="text-2xl font-bold text-blue-500 text-center dark:text-blue-500">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

    <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border py-2 p-5 rounded dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition-colors"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border py-2 p-5 rounded w-full pr-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
<button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center text-black gap-2 border py-2 rounded hover:bg-gray-100"
>
  <FcGoogle size={20} /> Login with Google
</button>


        <p className="mt-4 text-center text-black text-sm">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


