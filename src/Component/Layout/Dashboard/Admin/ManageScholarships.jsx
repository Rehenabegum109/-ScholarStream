
import { useState, useEffect } from "react";
import AxiosSecure from "../../../Hook/AxiosSecore";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const res = await AxiosSecure.get("/scholarships");
      setScholarships(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch scholarships", "error");
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Update Scholarship
  const handleEdit = (scholarship) => {
    Swal.fire({
      title: "Update Scholarship",
      html: `
        <input id="scholarshipName" class="swal2-input" placeholder="Scholarship Name" value="${scholarship.scholarshipName}" />
        <input id="universityName" class="swal2-input" placeholder="University Name" value="${scholarship.universityName}" />
        <input id="universityCountry" class="swal2-input" placeholder="Country" value="${scholarship.universityCountry}" />
        <input id="universityCity" class="swal2-input" placeholder="City" value="${scholarship.universityCity}" />
        <input id="universityWorldRank" type="number" class="swal2-input" placeholder="World Rank" value="${scholarship.universityWorldRank || ""}" />
        <input id="subjectCategory" class="swal2-input" placeholder="Subject Category" value="${scholarship.subjectCategory}" />
        <input id="scholarshipCategory" class="swal2-input" placeholder="Scholarship Category" value="${scholarship.scholarshipCategory}" />
        <input id="degree" class="swal2-input" placeholder="Degree" value="${scholarship.degree}" />
        <input id="tuitionFees" type="number" class="swal2-input" placeholder="Tuition Fees" value="${scholarship.tuitionFees || ""}" />
        <input id="applicationFees" type="number" class="swal2-input" placeholder="Application Fees" value="${scholarship.applicationFees}" />
        <input id="serviceCharge" type="number" class="swal2-input" placeholder="Service Charge" value="${scholarship.serviceCharge}" />
        <input id="applicationDeadline" type="date" class="swal2-input" placeholder="Application Deadline" value="${scholarship.applicationDeadline ? new Date(scholarship.applicationDeadline).toISOString().split('T')[0] : ""}" />
        <input id="scholarshipPostDate" type="date" class="swal2-input" placeholder="Post Date" value="${scholarship.scholarshipPostDate ? new Date(scholarship.scholarshipPostDate).toISOString().split('T')[0] : ""}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          scholarshipName: document.getElementById("scholarshipName").value,
          universityName: document.getElementById("universityName").value,
          universityCountry: document.getElementById("universityCountry").value,
          universityCity: document.getElementById("universityCity").value,
          universityWorldRank: parseInt(document.getElementById("universityWorldRank").value || 0),
          subjectCategory: document.getElementById("subjectCategory").value,
          scholarshipCategory: document.getElementById("scholarshipCategory").value,
          degree: document.getElementById("degree").value,
          tuitionFees: parseFloat(document.getElementById("tuitionFees").value || 0),
          applicationFees: parseFloat(document.getElementById("applicationFees").value),
          serviceCharge: parseFloat(document.getElementById("serviceCharge").value || 0),
          applicationDeadline: document.getElementById("applicationDeadline").value,
          scholarshipPostDate: document.getElementById("scholarshipPostDate").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await AxiosSecure.patch(`/scholarships/${scholarship._id}`, result.value);
          if (res.data.success) {
            Swal.fire("Updated!", "Scholarship updated successfully", "success");
            fetchScholarships();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update scholarship", "error");
        }
      }
    });
  };

  // Delete Scholarship
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this scholarship?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (confirm.isConfirmed) {
      try {
        await AxiosSecure.delete(`/scholarships/${id}`);
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        fetchScholarships();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete scholarship", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">University</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Degree</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.scholarshipName}</td>
              <td className="border p-2">{s.universityName}</td>
              <td className="border p-2">{s.scholarshipCategory}</td>
              <td className="border p-2">{s.degree}</td>
              <td className="border p-2">${s.applicationFees}</td>
     

<td className="border p-2 space-x-2 flex">
  <button
    onClick={() => handleEdit(s)}
    className="bg-yellow-500 text-white p-2 rounded flex items-center justify-center"
  >
    <MdEdit size={20} />
  </button>
  <button
    onClick={() => handleDelete(s._id)}
    className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
  >
    <MdDelete size={20} />
  </button>
</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
