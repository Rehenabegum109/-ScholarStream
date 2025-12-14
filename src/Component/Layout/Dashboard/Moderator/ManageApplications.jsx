import { useEffect, useState } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";
import Swal from "sweetalert2";
import { FaRegCommentDots, FaSpinner, FaTimes } from "react-icons/fa";
import { MdOutlineDoneAll } from "react-icons/md";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosSecure = useAxiosSecure(); 

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get("/applications"); 
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      Swal.fire("Error", "Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await AxiosSecure.patch(`/applications/${id}`, { status: newStatus });
      Swal.fire("Success", "Status updated", "success");
      fetchApplications();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // Feedback
  const handleFeedback = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Enter feedback",
      input: "textarea",
      inputPlaceholder: "Write feedback here...",
      showCancelButton: true,
    });

    if (feedback) {
      try {
        await AxiosSecure.patch(`/applications/${id}`, { feedback });
        Swal.fire("Success", "Feedback updated", "success");
        fetchApplications();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to update feedback", "error");
      }
    }
  };

  // Cancel / Reject
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
    });

    if (confirm.isConfirmed) {
      try {
        await AxiosSecure.patch(`/applications/${id}`, { status: "rejected" });
        Swal.fire("Rejected!", "Application has been rejected.", "success");
        fetchApplications();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject application", "error");
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded shadow">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage Applications</h2>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Applicant Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">University</th>
              <th className="border p-2">Scholarship</th>
              <th className="border p-2">Feedback</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="border p-2">{app.studentName || "N/A"}</td>
                <td className="border p-2 break-all">{app.studentEmail}</td>
                <td className="border p-2">{app.universityName}</td>
                <td className="border p-2">{app.scholarshipName || "-"}</td>
                <td className="border p-2">{app.applicationFeedback || "-"}</td>
                <td className="border p-2">{app.applicationStatus}</td>
                <td className="border p-2">{app.paymentStatus}</td>
                <td className="border p-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleFeedback(app._id)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <FaRegCommentDots />
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, "processing")}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    <FaSpinner />
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, "completed")}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    <MdOutlineDoneAll />
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">{app.studentName || "N/A"}</p>
            <p className="text-sm break-all text-gray-600">{app.studentEmail}</p>
            <p className="text-sm"><span className="font-medium">University:</span> {app.universityName}</p>
            <p className="text-sm"><span className="font-medium">Scholarship:</span> {app.scholarshipName || "-"}</p>
            <p className="text-sm"><span className="font-medium">Feedback:</span> {app.applicationFeedback || "-"}</p>
            <p className="text-sm"><span className="font-medium">Status:</span> {app.applicationStatus}</p>
            <p className="text-sm"><span className="font-medium">Payment:</span> {app.paymentStatus}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => handleFeedback(app._id)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <FaRegCommentDots />
              </button>
              <button
                onClick={() => handleStatusChange(app._id, "processing")}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                <FaSpinner />
              </button>
              <button
                onClick={() => handleStatusChange(app._id, "completed")}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                <MdOutlineDoneAll />
              </button>
              <button
                onClick={() => handleCancel(app._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplications;
