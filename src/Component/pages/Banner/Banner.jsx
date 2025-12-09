import { motion } from "framer-motion";

const Banner = () => {
  const bgUrl = "https://plus.unsplash.com/premium_photo-1682284548131-58cb47f6ab2b?w=1200&auto=format&fit=crop&q=80"; // external URL

  return (
    <motion.section
      className="relative text-white py-24 px-6 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgUrl})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Find Your Dream Scholarship
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Browse, Apply, and Achieve your education goals worldwide!
        </motion.p>

        <motion.button
          className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Search Scholarship
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Banner;
