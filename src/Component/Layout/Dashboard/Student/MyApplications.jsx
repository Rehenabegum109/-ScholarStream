import React, { useEffect, useState } from "react";
import { UseAuth } from "../../../Hook/AuthProvider";
import ApplicationDetailsModal from "./Modal/ApplicationDetailsModal";
import AddReviewModal from "./Modal/AddReviewModal";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const MyApplications = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosSecure.get(`/applications/student/${user.email}`);
        setApplications(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!user) return <p className="text-center mt-10">Please login to view your applications.</p>;

  const handleOpenDetails = (app) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  const handleOpenReview = (app) => {
    setSelectedApp(app);
    setShowReviewModal(true);
  };

  const handleCloseModals = () => {
    setSelectedApp(null);
    setShowDetailsModal(false);
    setShowReviewModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">University Name</th>
              <th className="p-2 border">University Address</th>
              <th className="p-2 border">Subject Category</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Application Fees</th>
              <th className="p-2 border">Application Status</th>
              <th className="p-2 border">Payment Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-600">
                  No applications found.
                </td>
              </tr>
            )}
            {applications.map((app) => (
              <tr key={app._id} className="text-center border">
                <td className="p-2 border">{app.universityName}</td>
                <td className="p-2 border">{app.location || "N/A"}</td>
                <td className="p-2 border">{app.subject}</td>
                <td className="p-2 border">{app.applicationFeedback || "N/A"}</td>
                <td className="p-2 border">{app.fee || 0}</td>
                <td className="p-2 border">{app.applicationStatus}</td>
                <td className="p-2 border">{app.paymentStatus}</td>
                <td className="p-2 border space-x-1">
                  <button
                    onClick={() => handleOpenDetails(app)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Details
                  </button>

                  {app.applicationStatus === "pending" && (
                    <>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                      {app.paymentStatus === "unpaid" && (
                        <button className="bg-green-500 text-white px-2 py-1 rounded">Pay</button>
                      )}
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </>
                  )}

                  {app.applicationStatus === "completed" && (
                    <button
                      onClick={() => handleOpenReview(app)}
                      className="bg-purple-500 text-white px-2 py-1 rounded"
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailsModal && (
        <ApplicationDetailsModal application={selectedApp} onClose={handleCloseModals} />
      )}
      {showReviewModal && (
        <AddReviewModal application={selectedApp} onClose={handleCloseModals} />
      )}
    </div>
  );
};

export default MyApplications;
