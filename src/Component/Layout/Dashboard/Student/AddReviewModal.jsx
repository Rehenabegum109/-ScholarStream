import React, { useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AddReviewModal = ({ application, onClose, fetchApplications }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1) {
      Swal.fire("Error", "Please provide a rating", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.post(`/reviews`, {
        applicationId: application._id,
        rating,
        comment,
      });

      if (res.data.success) {
        Swal.fire("Success", "Review submitted successfully", "success");
        fetchApplications(); 
        onClose();
      } else {
        Swal.fire("Error", "Failed to submit review", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="border rounded p-2 w-full"
              placeholder="Write your feedback..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;
