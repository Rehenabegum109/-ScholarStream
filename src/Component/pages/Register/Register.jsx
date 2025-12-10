import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UseAuth } from "../../Hook/AuthProvider";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = UseAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password Validation
  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const capitalLetter = /[A-Z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) return "Password must be at least 6 characters.";
    if (!capitalLetter.test(password)) return "Password must include at least one capital letter.";
    if (!specialChar.test(password)) return "Password must include at least one special character.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password Validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Register user with Firebase Auth
      await registerUser(email, password);

      // 2️⃣ Update Firebase profile
      await updateUserProfile(name, photo);

      // 3️⃣ Save user to MongoDB
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        photo,
        role: "Student"
      });

      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" name="name" required className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Photo URL</label>
            <input type="text" name="photo" className="w-full px-3 py-2 border rounded" placeholder="https://..." />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" required className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full px-3 py-2 border rounded" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
