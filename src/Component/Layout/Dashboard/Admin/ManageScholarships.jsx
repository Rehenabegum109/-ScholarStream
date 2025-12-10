import { useState, useEffect } from "react";
import axios from "axios";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const res = await axios.get("http://localhost:3000/scholarships");
      setScholarships(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Delete scholarship
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) return;
    try {
      await axios.delete(`http://localhost:3000/scholarships/${id}`);
      alert("Scholarship deleted");
      setScholarships(scholarships.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete scholarship");
    }
  };

  // Update scholarship (simple prompt example)
  const handleUpdate = async (sch) => {
    const newName = window.prompt("Enter new scholarship name", sch.name);
    if (!newName) return;

    try {
      await axios.put(`http://localhost:3000/scholarships/${sch._id}`, { ...sch, name: newName });
      alert("Scholarship updated");
      fetchScholarships();
    } catch (err) {
      console.error(err);
      alert("Failed to update scholarship");
    }
  };

  if (loading) return <p>Loading scholarships...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
  <th className="py-2 px-4 border">University</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Subject</th>
               <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Deadline</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((sch) => (
            <tr key={sch._id} className="text-center">
   <td className="py-2 px-4 border">{sch.universityName}</td>
              <td className="py-2 px-4 border">{sch.scholarshipCategory}</td>
              <td className="py-2 px-4 border">{sch.subject}</td>
              <td className="py-2 px-4 border">{sch.location}</td>
              <td className="py-2 px-4 border">{sch.deadline}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button
                  onClick={() => handleUpdate(sch)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(sch._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {scholarships.length === 0 && (
            <tr>
              <td colSpan="6" className="py-4 text-center">No scholarships found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
