import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1);
const AxiosSecure =useAxiosSecure()
  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await AxiosSecure.get("/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Handle edit button click
  const handleEdit = (review) => {
    setEditingReview(review);
    setNewComment(review.reviewComment);
    setNewRating(review.ratingPoint);
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const res = await AxiosSecure.patch(`/reviews/${editingReview._id}`, {
        reviewComment: newComment,
        ratingPoint: newRating,
      });

      // Update local state
      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReview._id
            ? { ...r, reviewComment: newComment, ratingPoint: newRating }
            : r
        )
      );

      setEditingReview(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await AxiosSecure.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Scholarship Name</th>
            <th className="border p-2">University Name</th>
            <th className="border p-2">Comment</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="text-center">
              <td className="border p-2">{review.scholarshipName}</td>
              <td className="border p-2">{review.universityName}</td>
              <td className="border p-2">{review.reviewComment}</td>
              <td className="border p-2">
                {new Date(review.reviewDate).toLocaleDateString()}
              </td>
              <td className="border p-2">{review.ratingPoint} ⭐</td>
              <td className="border p-2 space-x-2 flex justify-center">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>
            <textarea
              className="w-full border p-2 mb-3 rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <input
              type="number"
              className="w-full border p-2 mb-3 rounded"
              min={1}
              max={5}
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
