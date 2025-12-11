import React, { useEffect, useState } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";


const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get("/reviews"); // all reviews
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await AxiosSecure.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading reviews...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Scholarship ID</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="text-center">
                  <td className="px-4 py-2 border">{review.userName}</td>
                  <td className="px-4 py-2 border">{review.userEmail}</td>
                  <td className="px-4 py-2 border">{review.scholarshipId}</td>
                  <td className="px-4 py-2 border">{review.ratingPoint} ⭐</td>
                  <td className="px-4 py-2 border">{review.reviewComment}</td>
                  <td className="px-4 py-2 border">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
