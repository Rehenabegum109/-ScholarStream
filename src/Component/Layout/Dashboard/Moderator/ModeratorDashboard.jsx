import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ModeratorDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Moderator Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome! You can review, approve, or reject scholarship applications.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Approve Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow flex items-center gap-4"
        >
          <FaCheckCircle className="text-green-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Approve Applications</h3>
            <p className="text-gray-600">
              Review scholarship applications and approve eligible candidates.
            </p>
          </div>
        </motion.div>

        {/* Reject Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow flex items-center gap-4"
        >
          <FaTimesCircle className="text-red-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Reject Applications</h3>
            <p className="text-gray-600">
              Reject applications that do not meet the requirements.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 bg-white p-6 rounded-2xl shadow"
      >
        <h3 className="text-xl font-semibold mb-2">Moderator Responsibilities</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Verify applicant information</li>
          <li>Approve or reject applications</li>
          <li>Ensure fair scholarship evaluation</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ModeratorDashboard;
