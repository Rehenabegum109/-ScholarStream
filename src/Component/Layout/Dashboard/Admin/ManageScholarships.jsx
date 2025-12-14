
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const AxiosSecure = useAxiosSecure();

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get("/scholarships");
      const dataArray = Array.isArray(res.data.scholarships)
        ? res.data.scholarships
        : [];
      setScholarships(dataArray);
    } catch (err) {
      console.error("Fetch error:", err);
      Swal.fire("Error", "Failed to load scholarships", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Delete scholarship
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the scholarship permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await AxiosSecure.delete(`/scholarships/${id}`);
      Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
      setScholarships((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete scholarship", "error");
    }
  };

  // Open modal
  const openUpdateModal = (scholarship) => {
    setSelectedScholarship({
      ...scholarship,
      applicationDeadline: scholarship.applicationDeadline
        ? new Date(scholarship.applicationDeadline).toISOString().split("T")[0]
        : "",
      scholarshipPostDate: scholarship.scholarshipPostDate
        ? new Date(scholarship.scholarshipPostDate).toISOString().split("T")[0]
        : "",
    });
  };

  const closeModal = () => setSelectedScholarship(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedScholarship((prev) => ({ ...prev, [name]: value }));
  };

  // Update scholarship
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updateData } = selectedScholarship;

      // Convert date strings to Date objects
      if (updateData.applicationDeadline)
        updateData.applicationDeadline = new Date(updateData.applicationDeadline);
      if (updateData.scholarshipPostDate)
        updateData.scholarshipPostDate = new Date(updateData.scholarshipPostDate);

      await AxiosSecure.patch(`/scholarships/${_id}`, updateData);
      Swal.fire("Success", "Scholarship updated successfully", "success");
      fetchScholarships();
      closeModal();
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      Swal.fire("Error", "Failed to update scholarship", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Scholarships</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">University</th>
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">Deadline</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-2 border bg-gray-200">&nbsp;</td>
                    <td className="px-4 py-2 border bg-gray-200">&nbsp;</td>
                    <td className="px-4 py-2 border bg-gray-200">&nbsp;</td>
                    <td className="px-4 py-2 border bg-gray-200">&nbsp;</td>
                    <td className="px-4 py-2 border bg-gray-200">&nbsp;</td>
                  </tr>
                ))
              : scholarships.length === 0
              ? (
                <tr>
                  <td className="px-4 py-2 border text-center" colSpan={5}>
                    No scholarships available.
                  </td>
                </tr>
              )
              : scholarships.map((s) => (
                  <tr key={s._id} className="text-center">
                    <td className="px-4 py-2 border">{s.scholarshipName}</td>
                    <td className="px-4 py-2 border">{s.universityName}</td>
                    <td className="px-4 py-2 border">{s.universityCountry}</td>
                    <td className="px-4 py-2 border">
                      {s.applicationDeadline
                        ? new Date(s.applicationDeadline).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => openUpdateModal(s)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Scholarship</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Scholarship Name</label>
                <input
                  type="text"
                  name="scholarshipName"
                  value={selectedScholarship.scholarshipName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">University Name</label>
                <input
                  type="text"
                  name="universityName"
                  value={selectedScholarship.universityName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Country</label>
                <input
                  type="text"
                  name="universityCountry"
                  value={selectedScholarship.universityCountry}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={selectedScholarship.applicationDeadline}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;


