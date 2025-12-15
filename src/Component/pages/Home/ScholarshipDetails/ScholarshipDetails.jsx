
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import AxiosSecure from "../../../Hook/AxiosSecore";
import { UseAuth } from "../../../Hook/AuthProvider";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth(); 

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedScholarships, setRelatedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        setError(null);

        // Scholarship details
        const res = await AxiosSecure.get(`/scholarships/${id}`);
        setScholarship(res.data);

        // Reviews
        const reviewsRes = await AxiosSecure.get(`/reviews?scholarshipId=${id}`);
        setReviews(reviewsRes.data || []);

        // Related scholarships
        const relatedRes = await AxiosSecure.get(`/scholarships`);
        const relatedArray = Array.isArray(relatedRes.data)
          ? relatedRes.data
          : relatedRes.data.data || [];

        const related = relatedArray
          .filter(
            (s) => s._id !== id && s.scholarshipCategory === res.data.scholarshipCategory
          )
          .slice(0, 3);
        setRelatedScholarships(related);
      } catch (err) {
        console.error("Error fetching scholarship details:", err);
        setError("Failed to load scholarship details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  // Apply button logic
  const handleApply = () => {
    if (user && user.email) {
      navigate(`/checkout/${id}`);
    } else {
      navigate("/login");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-blue-600 font-semibold">Loading scholarship details...</p>;

  if (error)
    return <p className="p-6 text-center text-red-500 font-semibold">{error}</p>;

  if (!scholarship)
    return <p className="p-6 text-center text-red-500 font-semibold">Scholarship not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Scholarship Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-6 items-center"
      >
        <img
          src={scholarship.universityImage || "https://via.placeholder.com/300"}
          alt={scholarship.universityName}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
          <p className="text-xl mt-2 font-semibold">{scholarship.scholarshipCategory} Scholarship</p>
          <p>World Rank: {scholarship.universityWorldRank || "N/A"}</p>
          <p>Degree: {scholarship.degree || "N/A"}</p>
          <p>Location: {scholarship.universityCity || "N/A"}, {scholarship.universityCountry || "N/A"}</p>
          <p>Application Deadline: {scholarship.applicationDeadline ? new Date(scholarship.applicationDeadline).toLocaleDateString() : "N/A"}</p>
          <p>Application Fees: ${scholarship.applicationFees || 0}</p>
          <p>Tuition Fees: ${scholarship.tuitionFees || 0}</p>
          <p className="mt-4">{scholarship.description || "No description available."}</p>
          <p className="mt-2 font-semibold">Coverage: {scholarship.benefits || "N/A"}</p>

          {/* Apply Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApply}
            className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Apply for Scholarship
          </motion.button>
        </div>
      </motion.div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Student Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet for this scholarship.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.userImage || "https://via.placeholder.com/50"}
                    alt={review.userName || "User"}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-blue-700">{review.userName || "Anonymous"}</p>
                    <p className="text-gray-400 text-sm italic">
                      {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.ratingPoint ? "text-yellow-400" : "text-gray-300"}>&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-700 mt-2">{review.reviewComment || "No comment provided."}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Related Scholarships IDs */}
        {relatedScholarships.length > 0 && (
          <div className="mt-4 text-gray-600">
            <strong>Related Scholarship IDs:</strong>{" "}
            {relatedScholarships.map((s, index) => (
              <span key={s._id}>
                <button
                  onClick={() => navigate(`/scholarship/${s._id}`)}
                  className="text-blue-500 hover:underline"
                >
                  {s._id}
                </button>
                {index < relatedScholarships.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Scholarships Cards */}
      {relatedScholarships.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Related Scholarships</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedScholarships.map((s) => (
              <motion.div
                key={s._id}
                whileHover={{ scale: 1.03 }}
                className="p-4 border rounded flex flex-col items-start gap-2 shadow hover:shadow-lg transition"
              >
                <img
                  src={s.universityImage || "https://via.placeholder.com/150"}
                  alt={s.scholarshipName}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="font-semibold">{s.scholarshipName}</p>
                <p>Application Fees: ${s.applicationFees || 0}</p>
                <button
                  onClick={() => navigate(`/scholarship/${s._id}`)}
                  className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipDetails;
