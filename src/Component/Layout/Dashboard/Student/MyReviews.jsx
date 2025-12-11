import React, { useEffect, useState } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";


const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await AxiosSecure.get("/reviews"); // user filter লাগলে যোগ করতে হবে
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

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
              <td className="border p-2">{new Date(review.reviewDate).toLocaleDateString()}</td>
              <td className="border p-2">{review.ratingPoint} ⭐</td>
              <td className="border p-2 space-x-1">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
