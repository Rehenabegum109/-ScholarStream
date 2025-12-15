import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { UseAuth } from "../Hook/AuthProvider";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Login = () => {
  const { loginUser, googleLogin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const AxiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/";

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const { data } = await AxiosSecure.get(
        `/users/${encodeURIComponent(user.email)}/role`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("role", data.role || "Student");
      localStorage.setItem("email", user.email);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };
const handleGoogleLogin = async () => {
  const result = await googleLogin(); 
  const user = result.user;

  try {
    // 1. Try to fetch role
    const resRole = await AxiosSecure.get(`/users/${encodeURIComponent(user.email)}/role`);
    localStorage.setItem("role", resRole.data.role || "Student");
  } catch {
    
    await AxiosSecure.post("/users", {
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    });
    localStorage.setItem("role", "Student");
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>Email</label>
            <input type="email" name="email" required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4 relative">
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} name="password" required className="w-full px-3 py-2 border rounded" />
            <span className="absolute right-3 top-9 cursor-pointer" onClick={togglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100">
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-600">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

