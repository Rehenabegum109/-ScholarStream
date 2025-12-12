import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../assets/image/images (1).jpg';
import { UseAuth } from "../Hook/AuthProvider";

const Navbar = () => {
  const { user, logout } = UseAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-[#0A2540] text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div>
          <img className="w-[100px] h-[50px]" src={logo} alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="hover:text-gray-100">Home</Link>
          <Link to="/scholarship" className="hover:text-gray-100">All Scholarships</Link>

          {/* Payment Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenPayment(!openPayment)}
              className="hover:text-gray-100 focus:outline-none"
            >
              Payment ▼
            </button>

            {openPayment && (
              <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg right-0 transition-all duration-200">
                <Link
                  to="/checkout"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenPayment(false)}
                >
                 Payment Checkout
                </Link>
                <Link
                  to="/payment-success"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenPayment(false)}
                >
                  Payment Success
                </Link>
                <Link
                  to="/payment-cancle"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenPayment(false)}
                >
                  Payment Failed
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded mr-2">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">Register</Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photo || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpenProfile(!openProfile)}
              />
              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenProfile(false)}
                  >
                    Dashboard
                  </Link>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-[#0A2540] mt-2 p-4 space-y-2">
          <Link to="/" className="block hover:text-gray-100">Home</Link>
          <Link to="/scholarship" className="block hover:text-gray-100">All Scholarships</Link>

          {/* Payment Dropdown Mobile */}
          <div>
            <button
              onClick={() => setOpenPayment(!openPayment)}
              className="w-full text-left hover:text-gray-100"
            >
              Payment ▼
            </button>
            {openPayment && (
              <div className="pl-4 mt-2 space-y-1">
                <Link
                  to="/checkout"
                  className="block hover:text-gray-100"
                  onClick={() => setMobileMenu(false)}
                >
                  Checkout
                </Link>
                <Link
                  to="/payment-success"
                  className="block hover:text-gray-100"
                  onClick={() => setMobileMenu(false)}
                >
                  Success
                </Link>
                <Link
                  to="/payment-failed"
                  className="block hover:text-gray-100"
                  onClick={() => setMobileMenu(false)}
                >
                  Failed
                </Link>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link to="/login" className="block px-4 py-2 bg-white text-blue-600 rounded">Login</Link>
              <Link to="/register" className="block px-4 py-2 bg-white text-blue-600 rounded">Register</Link>
            </>
          ) : (
            <div>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => { logout(); setMobileMenu(false); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
