
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { UseAuth } from "../Hook/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isDark, setIsDark] = useState(false);

  
 const toggleTheme = () => {
  const html = document.documentElement;

  if (isDark) {
    html.classList.remove("dark");
    setIsDark(false);
  } else {
    html.classList.add("dark");
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
    // <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b p-3 border-gray-100">
    <nav className="w-full fixed top-0 left-0 z-50 
bg-white/20 dark:bg-gray-900/30 
backdrop-blur-xl 
border-b border-white/10 
shadow-md
text-gray-800 p-3 dark:text-white
transition-all duration-300">
      <div className="max-w-7xl mx-auto text-black flex justify-between items-center">

        
        <div className="flex items-center gap-3">
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </div>

          <Link to="/" className="flex items-center gap-3">
  
  {/* Icon Logo */}
  <FontAwesomeIcon
  icon={faGraduationCap}
  className="text-blue-600 text-2xl hover:scale-110 transition"
/>

  {/* Text + Tagline */}
  <div className="flex flex-col leading-tight">
    <span className="text-xl font-bold tracking-wide text-gray-800">
      Scholar<span className="text-blue-600">Hub</span>
    </span>

    <span className="text-xs text-black-500">
      Your future, our mission
    </span>
  </div>
</Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setActiveLink(link.path)}
              className={`transition-colors hover:text-black ${
                activeLink === link.path ? "text-black font-semibold" : "text-black"
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
                  activeLink === link.path ? "text-black font-semibold" : "text-black"
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





// import { useState, useEffect } from "react";
// import { Link } from "react-router";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { FiMoon, FiSun } from "react-icons/fi";
// import { UseAuth } from "../Hook/AuthProvider";

// const Navbar = () => {
//   const { user, logOut } = UseAuth();
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState("/");
//   const [isDark, setIsDark] = useState(false);

//   const toggleTheme = () => {
//     const html = document.documentElement;
//     if (isDark) {
//       html.setAttribute("data-theme", "light");
//       setIsDark(false);
//     } else {
//       html.setAttribute("data-theme", "dark");
//       setIsDark(true);
//     }
//   };

//   const createdDate = user?.metadata?.creationTime
//     ? new Date(user.metadata.creationTime).toDateString()
//     : "";

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) setMobileMenu(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const navLinks = [
//     { path: "/", name: "Home" },
//     { path: "/about", name: "About" },
//     { path: "/scholarship", name: "Scholarships" },
//   ];

//   const authLinks = [
//     { path: "/dashboard", name: "Dashboard" },
//     { path: "/resources", name: "Resources" },
//     { path: "/help", name: "Help" },
//   ];

//   return (
//   //  <nav className="bg-white/70 backdrop-blur-xl  supports-[backdrop-filter]:bg-white/60 text-[#111827] p-4 sticky top-0 z-50 border-b border-gray-100 shadow-sm font-sans">

//    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b p-3 border-gray-100">
    
//       <div className="max-w-7xl mx-auto flex justify-between items-center">

//         {/* Left Side */}
//         <div className="flex items-center gap-3">
//           <div
//             className="md:hidden text-2xl cursor-pointer text-gray-800"
//             onClick={() => setMobileMenu(!mobileMenu)}
//           >
//             {mobileMenu ? <FaTimes /> : <FaBars />}
//           </div>
//           <Link to="/">
//          <img
//              src="https://w7.pngwing.com/pngs/24/161/png-transparent-greed-scholarship-miscellaneous-angle-logo-thumbnail.png"
//              alt="Logo"
//               className="w-[100px] h-[50px]"
//            />
//            </Link>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               onClick={() => setActiveLink(link.path)}
//               className={`transition-colors hover:text-red-500 ${
//                 activeLink === link.path
//                   ? "text-red-500 font-semibold"
//                   : "text-gray-700"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {user &&
//             authLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setActiveLink(link.path)}
//                 className={`transition-colors hover:text-red-500 ${
//                   activeLink === link.path
//                     ? "text-red-500 font-semibold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-3">

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//           >
//             {isDark ? <FiSun /> : <FiMoon />}
//           </button>

//           {/* Login/Register */}
//           {!user && (
//             <div className="hidden md:flex gap-3">
//               <Link
//                 to="/login"
//                 className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-1.5 border border-gray-300 hover:border-red-500 rounded"
//               >
//                 Register
//               </Link>
//             </div>
//           )}

//           {/* Profile */}
//           {user && (
//             <div className="relative">
//               <img
//                 src={user.photoURL || "https://via.placeholder.com/40"}
//                 alt="Profile"
//                 className="w-9 h-9 rounded-full border cursor-pointer"
//                 onClick={() => setProfileOpen(!profileOpen)}
//               />

//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-64 bg-white border text-gray-800 rounded-lg shadow-lg p-4">
                  
//                   <div className="flex items-center gap-3 border-b pb-3">
//                     <img
//                       src={user.photoURL || "https://via.placeholder.com/50"}
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <p className="font-semibold">
//                         {user.displayName || "User"}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Joined: {createdDate}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={logOut}
//                     className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenu && (
//         <div className="md:hidden mt-4 bg-white border px-4 py-3 space-y-3 rounded">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               onClick={() => {
//                 setMobileMenu(false);
//                 setActiveLink(link.path);
//               }}
//               className={`block transition hover:text-red-500 ${
//                 activeLink === link.path
//                   ? "text-red-500 font-semibold"
//                   : "text-gray-700"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {user &&
//             authLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => {
//                   setMobileMenu(false);
//                   setActiveLink(link.path);
//                 }}
//                 className={`block transition hover:text-red-500 ${
//                   activeLink === link.path
//                     ? "text-red-500 font-semibold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//           {!user && (
//             <div className="flex flex-col gap-2 pt-2">
//               <Link
//                 to="/login"
//                 className="bg-red-500 text-white text-center py-2 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="border border-gray-300 text-center py-2 rounded"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


