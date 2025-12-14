import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const AddScholarship = () => {
  const AxiosSecure =useAxiosSecure()
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    userEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosSecure.post("/scholarships", formData);
      if (res.data.success) {
        Swal.fire("Success", "Scholarship added successfully", "success");
        setFormData({
          scholarshipName: "",
          universityName: "",
          universityImage: "",
          universityCountry: "",
          universityCity: "",
          universityWorldRank: "",
          subjectCategory: "",
          scholarshipCategory: "",
          degree: "",
          tuitionFees: "",
          applicationFees: "",
          serviceCharge: "",
          applicationDeadline: "",
          scholarshipPostDate: "",
          userEmail: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add scholarship", "error");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scholarship Name */}
        <div>
          <label className="block mb-1 font-semibold">Scholarship Name</label>
          <input
            type="text"
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* University Name */}
        <div>
          <label className="block mb-1 font-semibold">University Name</label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* University Image */}
        <div>
          <label className="block mb-1 font-semibold">University Image URL</label>
          <input
            type="text"
            name="universityImage"
            value={formData.universityImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-semibold">Country</label>
          <input
            type="text"
            name="universityCountry"
            value={formData.universityCountry}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-semibold">City</label>
          <input
            type="text"
            name="universityCity"
            value={formData.universityCity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* World Rank */}
        <div>
          <label className="block mb-1 font-semibold">World Rank</label>
          <input
            type="number"
            name="universityWorldRank"
            value={formData.universityWorldRank}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Subject Category */}
        <div>
          <label className="block mb-1 font-semibold">Subject Category</label>
          <input
            type="text"
            name="subjectCategory"
            value={formData.subjectCategory}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Scholarship Category Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Scholarship Category</label>
          <select
            name="scholarshipCategory"
            value={formData.scholarshipCategory}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Full Fund">Full Fund</option>
            <option value="Partial">Partial</option>
            <option value="Self Fund">Self Fund</option>
          </select>
        </div>

        {/* Degree Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Degree</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* Tuition Fees (optional) */}
        <div>
          <label className="block mb-1 font-semibold">Tuition Fees (optional)</label>
          <input
            type="number"
            name="tuitionFees"
            value={formData.tuitionFees}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Application Fees */}
        <div>
          <label className="block mb-1 font-semibold">Application Fees</label>
          <input
            type="number"
            name="applicationFees"
            value={formData.applicationFees}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Service Charge */}
        <div>
          <label className="block mb-1 font-semibold">Service Charge</label>
          <input
            type="number"
            name="serviceCharge"
            value={formData.serviceCharge}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block mb-1 font-semibold">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Scholarship Post Date */}
        <div>
          <label className="block mb-1 font-semibold">Post Date</label>
          <input
            type="date"
            name="scholarshipPostDate"
            value={formData.scholarshipPostDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
