import { Link } from "react-router-dom";
import { useState } from "react";

import { UseAuth } from "../Hook/AuthProvider";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0A2540] text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <img src='https://w7.pngwing.com/pngs/24/161/png-transparent-greed-scholarship-miscellaneous-angle-logo-thumbnail.png' alt="Logo" className="w-[100px] h-[50px]" />
        </Link>

        {/* Center Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/scholarship" className="hover:text-gray-200">
            All Scholarships
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side */}
        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-blue-600 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-blue-600 rounded"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* Profile Image */}
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1E90FF]  text-white rounded shadow">
                
                <button
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
