import React, { useEffect, useState } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedbackApp, setSelectedFeedbackApp] = useState(null);
  const [selectedDetailsApp, setSelectedDetailsApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await AxiosSecure.get("/applications");
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Update application status
  const updateStatus = async (id, status) => {
    try {
      await AxiosSecure.put(`/applications/${id}`, { applicationStatus: status });
      setApplications(applications.map(app => app._id === id ? { ...app, applicationStatus: status } : app));
    } catch (err) {
      console.error(err);
    }
  };

  // Submit feedback
  const submitFeedback = async () => {
    if (!selectedFeedbackApp) return;
    try {
      await AxiosSecure.put(`/applications/${selectedFeedbackApp._id}`, { feedback: feedbackText });
      setApplications(applications.map(app => app._id === selectedFeedbackApp._id ? { ...app, feedback: feedbackText } : app));
      setFeedbackText("");
      setSelectedFeedbackApp(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Reject/Cancel application
  const cancelApplication = (id) => updateStatus(id, "rejected");

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">University</th>
              <th className="px-4 py-2">Feedback</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b">
                <td className="px-4 py-2">{app.userName}</td>
                <td className="px-4 py-2">{app.userEmail}</td>
                <td className="px-4 py-2">{app.universityName}</td>
                <td className="px-4 py-2">{app.feedback || "-"}</td>
                <td className="px-4 py-2">{app.applicationStatus}</td>
                <td className="px-4 py-2">{app.paymentStatus}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setSelectedFeedbackApp(app)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Feedback
                  </button>
                  <button
                    onClick={() => setSelectedDetailsApp(app)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Details
                  </button>
                  <select
                    value={app.applicationStatus}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => cancelApplication(app._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {selectedFeedbackApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Feedback for {selectedFeedbackApp.userName}</h2>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedFeedbackApp(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedDetailsApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            <p><span className="font-semibold">Applicant Name:</span> {selectedDetailsApp.userName}</p>
            <p><span className="font-semibold">Applicant Email:</span> {selectedDetailsApp.userEmail}</p>
            <p><span className="font-semibold">University:</span> {selectedDetailsApp.universityName}</p>
            <p><span className="font-semibold">Scholarship Category:</span> {selectedDetailsApp.scholarshipCategory}</p>
            <p><span className="font-semibold">Degree:</span> {selectedDetailsApp.degree}</p>
            <p><span className="font-semibold">Application Fees:</span> ${selectedDetailsApp.applicationFees}</p>
            <p><span className="font-semibold">Service Charge:</span> ${selectedDetailsApp.serviceCharge}</p>
            <p><span className="font-semibold">Application Status:</span> {selectedDetailsApp.applicationStatus}</p>
            <p><span className="font-semibold">Payment Status:</span> {selectedDetailsApp.paymentStatus}</p>
            <p><span className="font-semibold">Application Date:</span> {new Date(selectedDetailsApp.applicationDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Feedback:</span> {selectedDetailsApp.feedback || "-"}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedDetailsApp(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
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
