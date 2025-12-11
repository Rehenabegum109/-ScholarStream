import React, { useEffect, useState } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";


const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await AxiosSecure.get("/applications"); // user filter লাগলে যোগ করতে হবে
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">University Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="border p-2">{app.universityName}</td>
              <td className="border p-2">{app.universityAddress}</td>
              <td className="border p-2">{app.feedback || "N/A"}</td>
              <td className="border p-2">{app.subjectCategory}</td>
              <td className="border p-2">${app.applicationFees + app.serviceCharge}</td>
              <td className="border p-2">{app.applicationStatus}</td>
              <td className="border p-2 space-x-1">
                {/* সবসময় */}
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Details</button>

                {/* Pending Action */}
                {app.applicationStatus === "pending" && (
                  <>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    {app.paymentStatus === "unpaid" && (
                      <button className="bg-green-500 text-white px-2 py-1 rounded">Pay</button>
                    )}
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </>
                )}

                {/* Completed Action */}
                {app.applicationStatus === "completed" && (
                  <button className="bg-purple-500 text-white px-2 py-1 rounded">
                    Add Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
