
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { UseAuth } from "../Hook/AuthProvider";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isDark, setIsDark] = useState(false);

  
  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute("data-theme", "light");
      setIsDark(false);
    } else {
      html.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  };

  const createdDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toDateString()
    : "";

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenu(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/scholarship", name: "All Scholarships" },
  ];

  const authLinks = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/resources", name: "Resources" },
    { path: "/help", name: "Help" },
  ];

  return (
    <nav className="bg-primary dark:bg-gray-900 text-white dark:text-white p-4 sticky top-0 z-50 shadow-md transition-colors duration-300 font-sans">
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
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setActiveLink(link.path)}
              className={`transition-colors hover:text-black ${
                activeLink === link.path ? "text-black font-semibold" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user &&
            authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setActiveLink(link.path)}
                className={`transition-colors hover:text-black ${
                  activeLink === link.path ? "text-black font-semibold" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        
        <div className="flex items-center gap-3">

       
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full dark:bg-gray-700 text-xl transition-colors duration-300"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          
          {!user && (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="px-4 py-2 bg-white text-black rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">Register</Link>
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

          
          {user && (
            <div className="relative">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-4 transition-all duration-200">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/50"}
                      className="w-12 h-12 rounded-full"
                      alt="User"
                    />
                    <div>
                      <p className="font-semibold">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Joined: {createdDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={logOut}
                    className="mt-3 w-full btn btn-primary"
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
        <div className="md:hidden mt-4 bg-primary dark:bg-gray-900 px-4 py-3 space-y-3 rounded transition-colors duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => { setMobileMenu(false); setActiveLink(link.path); }}
              className={`block transition-colors hover:text-indigo-400 ${
                activeLink === link.path ? "text-indigo-400 font-semibold" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user &&
            authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => { setMobileMenu(false); setActiveLink(link.path); }}
                className={`block transition-colors hover:text-indigo-400 ${
                  activeLink === link.path ? "text-indigo-400 font-semibold" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          {!user && <Link to="/login" onClick={() => setMobileMenu(false)} className="block text-white hover:text-black">Login</Link>}
          {!user && <Link to="/register" onClick={() => setMobileMenu(false)} className="block text-white hover:text-black">Register</Link>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
