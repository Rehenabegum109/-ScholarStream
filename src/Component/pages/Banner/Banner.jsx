// import { motion } from "framer-motion";

// const Banner = () => {
//   const bgUrl = "https://plus.unsplash.com/premium_photo-1682284548131-58cb47f6ab2b?w=1200&auto=format&fit=crop&q=80"; // external URL

//   return (
//     <motion.section
//       className="relative text-white py-24 px-6 text-center bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${bgUrl})` }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Optional dark overlay for readability */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>

//       <div className="relative z-10">
//         <motion.h1
//           className="text-5xl md:text-6xl font-bold mb-6"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//         >
//           Find Your Dream Scholarship
//         </motion.h1>

//         <motion.p
//           className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.4 }}
//         >
//           Browse, Apply, and Achieve your education goals worldwide!
//         </motion.p>

//         <motion.button
//           className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           Search Scholarship
//         </motion.button>
//       </div>
//     </motion.section>
//   );
// };

// export default Banner;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://plus.unsplash.com/premium_photo-1677572452964-91e968d02d6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Nob2xhcnNoaXB8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1677572452954-1643aa6b84e3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682075199514-0cf57960bfa5?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center">
      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-red bg-opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-6 max-w-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in animate-delay-200">
          Unlock Your Educational Potential
        </h1>
        <p className="text-lg md:text-xl mb-6 animate-fade-in animate-delay-400">
          Explore scholarships, apply confidently, and achieve your educational dreams with ease.
        </p>
        <Link
          to="/scholarship"
          className="btn btn-primary btn-lg animate-fade-in animate-delay-600"
        >
          Explore Scholarships
        </Link>
      </div>

      {/* Bouncing arrow */}
      <div className="absolute bottom-4 w-full flex justify-center animate-bounce z-20">
        <span className="text-white text-3xl">⬇️</span>
      </div>
    </section>
  );
};

export default Banner;
