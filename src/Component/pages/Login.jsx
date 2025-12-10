import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { UseAuth } from "../Hook/AuthProvider";

const Login = () => {
  const { loginUser, googleLogin } = UseAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // -------------------
  // EMAIL/PASSWORD LOGIN
  // -------------------
  const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await loginUser(email, password); // context-এ setUser করবে
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
  }
};


  // -------------------
  // GOOGLE LOGIN
  // -------------------
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const email = result.user.email;

      const { data } = await axios.get(
        `http://localhost:3000/users/${email}`
      );

      localStorage.setItem("role", data.role);

      if (data.role === "admin") navigate("/dashboard/admin");
      else if (data.role === "moderator") navigate("/dashboard/moderator");
      else navigate("/dashboard/student");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Email/Password Login */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
