import { useEffect, useState } from "react";
import { FaRegCommentDots, FaInfoCircle, FaSpinner } from "react-icons/fa";
import { MdOutlineDoneAll, MdCancel } from "react-icons/md";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axiosSecure.get("/applications/moderator");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Submit feedback
  const handleFeedback = async () => {
    if (!feedbackText) return alert("Feedback is required");

    await axiosSecure.patch(`/applications/${selectedFeedbackId}/feedback`, {
      feedback: feedbackText,
    });

    setFeedbackText("");
    setSelectedFeedbackId(null);
    fetchApplications();
  };

  // Status update
  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/applications/${id}`, { status });
    fetchApplications();
  };

  // Reject application
  const handleReject = async (id) => {
    const confirm = window.confirm("Reject this application?");
    if (!confirm) return;

    await axiosSecure.patch(`/applications/${id}/reject`);
    fetchApplications();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6  text-black">
      <h2 className="text-2xl font-bold mb-4">Manage Applied Applications</h2>

      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Applicant Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">University</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-t">
              <td className="border p-2">{app.studentName}</td>
              <td className="border p-2 break-all">{app.studentEmail}</td>
              <td className="border p-2">{app.universityName}</td>
              <td className="border p-2">{app.applicationFeedback || "—"}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    app.applicationStatus === "rejected"
                      ? "bg-red-500"
                      : app.applicationStatus === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {app.applicationStatus}
                </span>
              </td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    app.paymentStatus === "paid" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {app.paymentStatus || "pending"}
                </span>
              </td>
              <td className="border p-2 flex justify-center gap-2 flex-wrap">
                {/* Details */}
                <button
                  onClick={() => setDetailsId(app._id)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  title="View Details"
                >
                  <FaInfoCircle />
                </button>
                {/* Feedback */}
                <button
                  onClick={() => setSelectedFeedbackId(app._id)}
                  className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  title="Give Feedback"
                >
                  <FaRegCommentDots />
                </button>
                {/* Status */}
                <button
                  onClick={() => handleStatusChange(app._id, "processing")}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  title="Set Processing"
                >
                  <FaSpinner />
                </button>
                <button
                  onClick={() => handleStatusChange(app._id, "completed")}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  title="Set Completed"
                >
                  <MdOutlineDoneAll />
                </button>
                {/* Cancel */}
                <button
                  onClick={() => handleReject(app._id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  title="Reject Application"
                >
                  <MdCancel />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Modal */}
      {selectedFeedbackId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-2">Give Feedback</h3>
            <textarea
              className="w-full border p-2"
              rows="4"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end mt-3 space-x-2">
              <button
                onClick={() => setSelectedFeedbackId(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedback}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailsId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold mb-2">Application Details</h3>
            {applications
              .filter((app) => app._id === detailsId)
              .map((app) => (
                <div key={app._id} className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {app.studentName}</p>
                  <p><strong>Email:</strong> {app.studentEmail}</p>
                  <p><strong>University:</strong> {app.universityName}</p>
                  <p><strong>Scholarship:</strong> {app.scholarshipName || "—"}</p>
                  <p><strong>Feedback:</strong> {app.applicationFeedback || "—"}</p>
                  <p><strong>Status:</strong> {app.applicationStatus}</p>
                  <p><strong>Payment:</strong> {app.paymentStatus || "pending"}</p>
                </div>
              ))}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setDetailsId(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
