
import React, { useEffect, useState } from "react";
import { UseAuth } from "../../../Hook/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import AddReviewModal from "./AddReviewModal";
import { FaCreditCard, FaInfoCircle, FaPencilAlt, FaStar, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch applications
  const fetchApplications = async () => {
    if (!user?.email) {
      setApplications([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosSecure.get(`/applications/student?email=${encodeURIComponent(user.email)}`);
      const apps = res.data || [];

      const appsWithDetails = await Promise.all(
        apps.map(async (app) => {
          if (app.scholarshipId) {
            try {
              const scholarshipRes = await axiosSecure.get(`/scholarships/${app.scholarshipId}`);
              return {
                ...app,
                universityName: scholarshipRes.data.universityName || app.universityName,
                universityCity: scholarshipRes.data.universityCity || app.universityCity,
              };
            } catch {
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

  useEffect(() => {
    fetchApplications();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!user) return <p className="text-center mt-10">Please login to view your applications.</p>;

  // Modal handlers
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

  // Delete application
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Your application has been deleted.", "success");
          fetchApplications();
        } else {
          Swal.fire("Error", "Failed to delete application", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  // Stripe Payment
  const handlePay = async (app) => {
  try {
    const res = await axiosSecure.post(
      "/create-checkout-session",
      {
        scholarshipId: app.scholarshipId,
        applicationId: app._id,
        amount: app.applicationFees || 0,
      }
    );

    if (res.data.url) {
      window.location.href = res.data.url; // Stripe checkout page
    }
  } catch (err) {
    console.error("Payment error:", err.response?.data || err.message);
    Swal.fire("Error", err.response?.data?.message || "Payment could not be initiated", "error");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                <td className="p-2 border">{app.universityCity || app.universityAddress || "N/A"}</td>
                <td className="p-2 border">{app.subjectCategory || "N/A"}</td>
                <td className="p-2 border">{app.applicationFeedback || "N/A"}</td>
                <td className="p-2 border">{app.applicationFees || 0}</td>
                <td className="p-2 border">{app.applicationStatus}</td>
                <td className="p-2 border">{app.paymentStatus}</td>
                <td className="p-2 border flex justify-center items-center space-x-2">
                  {/* Details */}
                  <button onClick={() => handleOpenDetails(app)} title="Details" className="text-blue-500 hover:text-blue-700">
                    <FaInfoCircle size={18} />
                  </button>

                  {/* Edit */}
                  {app.applicationStatus === "pending" && (
                    <button title="Edit" className="text-yellow-500 hover:text-yellow-700">
                      <FaPencilAlt size={18} />
                    </button>
                  )}

                  {/* Pay */}
                  {app.applicationStatus === "pending" && app.paymentStatus === "unpaid" && (
                    <button onClick={() => handlePay(app)} title="Pay" className="text-green-500 hover:text-green-700">
                      <FaCreditCard size={18} />
                    </button>
                  )}

                  {/* Delete */}
                  {app.applicationStatus === "pending" && (
                    <button title="Delete" onClick={() => handleDelete(app._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash size={18} />
                    </button>
                  )}

                  {/* Add Review */}
                  {app.applicationStatus === "completed" && (
                    <button onClick={() => handleOpenReview(app)} title="Add Review" className="text-purple-500 hover:text-purple-700">
                      <FaStar size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2">
            <p><strong>University:</strong> {app.universityName}</p>
            <p><strong>Address:</strong> {app.universityCity || app.universityAddress || "N/A"}</p>
            <p><strong>Subject:</strong> {app.subjectCategory || "N/A"}</p>
            <p><strong>Feedback:</strong> {app.applicationFeedback || "N/A"}</p>
            <p><strong>Fees:</strong> {app.applicationFees || 0}</p>
            <p><strong>Status:</strong> {app.applicationStatus}</p>
            <p><strong>Payment:</strong> {app.paymentStatus}</p>
            <div className="flex gap-3 mt-2 flex-wrap">
              <button onClick={() => handleOpenDetails(app)} title="Details" className="text-blue-500 hover:text-blue-700">
                <FaInfoCircle size={18} />
              </button>

              {app.applicationStatus === "pending" && (
                <>
                  <button title="Edit" className="text-yellow-500 hover:text-yellow-700">
                    <FaPencilAlt size={18} />
                  </button>

                  {app.paymentStatus === "unpaid" && (
                    <button onClick={() => handlePay(app)} title="Pay" className="text-green-500 hover:text-green-700">
                      <FaCreditCard size={18} />
                    </button>
                  )}

                  <button title="Delete" onClick={() => handleDelete(app._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash size={18} />
                  </button>
                </>
              )}

              {app.applicationStatus === "completed" && (
                <button onClick={() => handleOpenReview(app)} title="Add Review" className="text-purple-500 hover:text-purple-700">
                  <FaStar size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showDetailsModal && selectedApp && <ApplicationDetailsModal application={selectedApp} onClose={handleCloseModals} />}
      {showReviewModal && selectedApp && <AddReviewModal application={selectedApp} onClose={handleCloseModals} fetchApplications={fetchApplications} />}
    </div>
  );
};

export default MyApplications;
