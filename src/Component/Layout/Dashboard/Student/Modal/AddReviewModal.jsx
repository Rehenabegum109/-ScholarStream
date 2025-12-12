import { useState } from "react";
import AxiosSecure from "../../../../Hook/AxiosSecore";


const AddReviewModal = ({ application, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AxiosSecure.post(`/reviews`, {
        applicationId: application._id,
        rating,
        comment,
      });
      alert("Review submitted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 relative">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 rounded w-full"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;
