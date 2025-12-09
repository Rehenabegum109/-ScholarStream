import { motion } from "framer-motion";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship, index }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* University Image */}
      <img
        src={scholarship.universityImage}
        alt={scholarship.universityName}
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{scholarship.universityName}</h3>
        <p className="text-gray-600 mt-2">{scholarship.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Fee: ${scholarship.fee}</span>
          <Link 
            to={`/ScholarShipDetails/${scholarship._id}`} 
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
