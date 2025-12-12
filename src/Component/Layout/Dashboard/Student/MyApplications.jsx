
import React, { useEffect, useState } from "react";
import { UseAuth } from "../../../Hook/AuthProvider";
import ApplicationDetailsModal from "./Modal/ApplicationDetailsModal";
import AddReviewModal from "./Modal/AddReviewModal";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { FaCreditCard, FaInfoCircle, FaPencilAlt, FaStar, FaTrash } from "react-icons/fa";

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
        const apps = res.data || [];

        // প্রতিটি application এর সাথে scholarship details fetch
        const appsWithDetails = await Promise.all(
          apps.map(async (app) => {
            if (app.scholarshipId) {
              try {
                const scholarshipRes = await axiosSecure.get(`/scholarships/${app.scholarshipId}`);
                return { ...app, ...scholarshipRes.data };
              } catch (err) {
                console.error("Failed to fetch scholarship:", err);
                return app;
              }
            }
            return app;
          })
        );

        setApplications(appsWithDetails);
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

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this application?")) return;

  try {
    const res = await axiosSecure.delete(`/applications/${id}`);
    if (res.data.success) {
      setApplications(prev => prev.filter(app => app._id !== id));
    } else {
      alert("Failed to delete application");
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
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
                <td className="p-2 border">{app.universityCity || "N/A"}</td>
                <td className="p-2 border">{app.subjectCategory || "N/A"}</td>
                <td className="p-2 border">{app.applicationFeedback || "N/A"}</td>
                <td className="p-2 border">{app.applicationFees || 0}</td>
                <td className="p-2 border">{app.applicationStatus}</td>
                <td className="p-2 border">{app.paymentStatus}</td>
                <td className="p-2 border flex justify-center items-center space-x-2">
                  <button onClick={() => handleOpenDetails(app)} className="text-blue-500 hover:text-blue-700">
                    <FaInfoCircle size={18} />
                  </button>

                  {app.applicationStatus === "pending" && (
                    <>
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <FaPencilAlt size={18} />
                      </button>

                      {app.paymentStatus === "unpaid" && (
                        <button className="text-green-500 hover:text-green-700">
                          <FaCreditCard size={18} />
                        </button>
                      )}
                      <button
  title="Delete"
  onClick={() => handleDelete(app._id)}
  className="text-red-500 hover:text-red-700"
>
  <FaTrash size={18} />
</button>

                    </>
                  )}

                  {app.applicationStatus === "completed" && (
                    <button onClick={() => handleOpenReview(app)} className="text-purple-500 hover:text-purple-700">
                      <FaStar size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailsModal && <ApplicationDetailsModal application={selectedApp} onClose={handleCloseModals} />}
      {showReviewModal && <AddReviewModal application={selectedApp} onClose={handleCloseModals} />}
    </div>
  );
};

export default MyApplications;
