
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const AxiosSecure = useAxiosSecure();

  // Fetch scholarships
  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get("/scholarships");
      setScholarships(Array.isArray(res.data.scholarships) ? res.data.scholarships : []);
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

  // Open update form
  const openUpdateForm = (scholarship) => {
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

  const closeUpdateForm = () => setSelectedScholarship(null);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedScholarship((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updateData } = selectedScholarship;

      if (updateData.applicationDeadline)
        updateData.applicationDeadline = new Date(updateData.applicationDeadline);
      if (updateData.scholarshipPostDate)
        updateData.scholarshipPostDate = new Date(updateData.scholarshipPostDate);

      await AxiosSecure.patch(`/scholarships/${_id}`, updateData);
      Swal.fire("Success", "Scholarship updated successfully", "success");
      fetchScholarships();
      closeUpdateForm();
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      Swal.fire("Error", "Failed to update scholarship", "error");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Manage Scholarships
      </h1>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
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
                    {Array.from({ length: 5 }).map((__, i) => (
                      <td key={i} className="px-4 py-2 border bg-gray-200 h-6" />
                    ))}
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
                  <React.Fragment key={s._id}>
                    <tr className="text-center">
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
                          onClick={() => openUpdateForm(s)}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center gap-1"
                        >
                          <FaEdit /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>

                    {/* Inline update form for desktop/tablet */}
                    {selectedScholarship?._id === s._id && (
                      <tr className="bg-gray-50">
                        <td colSpan={5}>
                          <form onSubmit={handleUpdateSubmit} className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-medium mb-1">Scholarship Name</label>
                                <input
                                  type="text"
                                  name="scholarshipName"
                                  value={selectedScholarship.scholarshipName}
                                  onChange={handleChange}
                                  className="w-full border rounded px-2 py-1"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block font-medium mb-1">University Name</label>
                                <input
                                  type="text"
                                  name="universityName"
                                  value={selectedScholarship.universityName}
                                  onChange={handleChange}
                                  className="w-full border rounded px-2 py-1"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block font-medium mb-1">Country</label>
                                <input
                                  type="text"
                                  name="universityCountry"
                                  value={selectedScholarship.universityCountry}
                                  onChange={handleChange}
                                  className="w-full border rounded px-2 py-1"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block font-medium mb-1">Application Deadline</label>
                                <input
                                  type="date"
                                  name="applicationDeadline"
                                  value={selectedScholarship.applicationDeadline}
                                  onChange={handleChange}
                                  className="w-full border rounded px-2 py-1"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                type="button"
                                onClick={closeUpdateForm}
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
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="animate-pulse border rounded p-4 bg-gray-200" />
            ))
          : scholarships.length === 0
          ? <p className="text-center">No scholarships available.</p>
          : scholarships.map((s) => (
              <div key={s._id} className="border rounded p-4 shadow-sm bg-white">
                <p className="font-semibold">{s.scholarshipName}</p>
                <p className="text-sm text-gray-600">{s.universityName}</p>
                <p className="text-sm text-gray-600">{s.universityCountry}</p>
                <p className="text-sm text-gray-500">
                  Deadline: {s.applicationDeadline ? new Date(s.applicationDeadline).toLocaleDateString() : "-"}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => setSelectedScholarship(selectedScholarship?._id === s._id ? null : s)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> {selectedScholarship?._id === s._id ? "Close" : "Update"}
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>

                {/* Inline update form */}
                {selectedScholarship?._id === s._id && (
                  <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-3 bg-gray-50 p-3 rounded">
                    <div>
                      <label className="block font-medium mb-1">Scholarship Name</label>
                      <input
                        type="text"
                        name="scholarshipName"
                        value={selectedScholarship.scholarshipName}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">University Name</label>
                      <input
                        type="text"
                        name="universityName"
                        value={selectedScholarship.universityName}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Country</label>
                      <input
                        type="text"
                        name="universityCountry"
                        value={selectedScholarship.universityCountry}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Application Deadline</label>
                      <input
                        type="date"
                        name="applicationDeadline"
                        value={selectedScholarship.applicationDeadline}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        type="button"
                        onClick={closeUpdateForm}
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
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ManageScholarships;
