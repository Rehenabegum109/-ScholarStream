import { Link } from "react-router";

import { useState } from "react";

import logo from '../../assets/image/images (1).jpg'
import { UseAuth } from "../Hook/AuthProvider";

const Navbar = () => {
  const { user, logout } = UseAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0A2540] text-white p-4 px-6 py-4 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center">

    {/* LEFT — Logo */}
    <div>
      <img className="w-[100px] h-[50px]" src={logo} alt="" />
    </div>

    {/* CENTER — Menu */}
    <div className="flex items-center gap-6">
      <Link to="/" className="hover:text-gray-100">Home</Link>
      <Link to="/scholarship" className="hover:text-gray-100">All Scholarships</Link>
    </div>

    {/* RIGHT — Auth */}
    <div>
      {!user ? (
        <>
          <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded mr-2">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">Register</Link>
        </>
      ) : (
        <div className="relative inline-block">
          <img
            src={user.photo || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>

  </div>
</nav>

  );
};

export default Navbar;
