
import { Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { UseAuth } from "../Hook/AuthProvider";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const createdDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toDateString()
    : "";

  return (
    <nav className="bg-[#0A2540] text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

    
        <div className="flex items-center gap-3">
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </div>

          <Link to="/">
            <img
              src="https://w7.pngwing.com/pngs/24/161/png-transparent-greed-scholarship-miscellaneous-angle-logo-thumbnail.png"
              alt="Logo"
              className="w-[100px] h-[50px]"
            />
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/scholarship" className="hover:text-gray-300">
            All Scholarships
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          )}
        </div>

      
        <div className="flex items-center gap-3">
        
          {!user && (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">
                Register
              </Link>
            </div>
          )}

      
          {!user && (
            <Link
              to="/login"
              className="md:hidden px-4 py-2 bg-white text-blue-600 rounded"
            >
              Login
            </Link>
          )}

          {/* Profile */}
          {user && (
            <div className="relative">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setProfileOpen(!profileOpen)}
              />

            
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-lg shadow-lg p-4">
                  
                  <div className="flex items-center gap-3 border-b pb-3">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/50"}
                      className="w-12 h-12 rounded-full"
                      alt="User"
                    />
                    <div>
                      <p className="font-semibold">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Joined: {createdDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={logOut}
                    className="mt-3 w-full  bg-blue-700 py-2 rounded text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    
      {mobileMenu && (
        <div className="md:hidden mt-4 bg-[#0A2540] px-4 py-3 space-y-3">
          <Link to="/" onClick={() => setMobileMenu(false)} className="block">
            Home
          </Link>

          <Link to="/scholarship" onClick={() => setMobileMenu(false)} className="block">
            All Scholarships
          </Link>

          {user && (
            <Link to="/dashboard" onClick={() => setMobileMenu(false)} className="block">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
