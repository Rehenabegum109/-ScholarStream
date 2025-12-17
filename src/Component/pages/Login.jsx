import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // correct Google icon
import { FaEye, FaEyeSlash } from "react-icons/fa"; // for password toggle
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full pr-10"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

       <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded"
>
  Login
</button>
</form>
<button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100"
>
  <FcGoogle size={20} /> Login with Google
</button>


        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
