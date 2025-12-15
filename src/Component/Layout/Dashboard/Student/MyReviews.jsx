import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1);
  const AxiosSecure = useAxiosSecure();

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
  }, [AxiosSecure]);

  // Handle edit
  const handleEdit = (review) => {
    setEditingReview(review);
    setNewComment(review.reviewComment);
    setNewRating(review.ratingPoint);
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      await AxiosSecure.patch(`/reviews/${editingReview._id}`, {
        reviewComment: newComment,
        ratingPoint: newRating,
      });
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

  if (loading)
    return <p className="text-center mt-6 text-blue-600 font-semibold">Loading...</p>;

  return (
    <div className="p-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Scholarship Name</th>
              <th className="border p-2 text-left">University Name</th>
              <th className="border p-2 text-left">Comment</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Rating</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="text-center md:text-left">
                <td className="border p-2">{review.scholarshipName}</td>
                <td className="border p-2">{review.universityName}</td>
                <td className="border p-2">{review.reviewComment}</td>
                <td className="border p-2">{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td className="border p-2">{review.ratingPoint} ⭐</td>
                <td className="border p-2 flex justify-center md:justify-start gap-2">
                  <button onClick={() => handleEdit(review)} className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="border rounded shadow p-4 bg-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{review.scholarshipName}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(review)} className="text-yellow-500 hover:text-yellow-700">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{review.reviewComment}</p>
            <p className="text-sm text-gray-500">
              {review.universityName} | {new Date(review.reviewDate).toLocaleDateString()} | {review.ratingPoint} ⭐
            </p>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>
            <textarea
              className="w-full border p-2 mb-3 rounded resize-none"
              rows={4}
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
            <div className="flex justify-end gap-2">
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
