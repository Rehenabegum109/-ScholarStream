import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch scholarship details
        const resScholarship = await fetch(`${backendURL}/scholarships/${id}`);
        const dataScholarship = await resScholarship.json();
        setScholarship(dataScholarship);

        // Fetch reviews
        const resReviews = await fetch(`${backendURL}/reviews?scholarshipId=${id}`);
        const dataReviews = await resReviews.json();
        setReviews(dataReviews);

      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!scholarship) return <p className="p-6">Scholarship not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Scholarship Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
          <p className="text-xl mt-2 font-semibold">{scholarship.scholarshipCategory} Scholarship</p>
          <p className="mt-2 text-gray-600">World Rank: {scholarship.worldRank}</p>
          <p className="mt-2 text-gray-600">Location: {scholarship.location}</p>
          <p className="mt-2 text-gray-600">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-600">Application Fee: ${scholarship.fee}</p>
          <p className="mt-4">{scholarship.description}</p>
          <p className="mt-2 font-semibold">Coverage: {scholarship.benefits}</p>

          <button
            onClick={() => navigate(`/checkout/${id}`)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded flex gap-4">
                <img
                  src={review.userImage || "https://via.placeholder.com/50"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{review.userName}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                  <p className="text-yellow-500">Rating: {review.ratingPoint} ⭐</p>
                  <p>{review.reviewComment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
