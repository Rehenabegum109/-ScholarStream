import { useState } from "react";
import axios from "axios";

const AddScholarship = () => {
  const [form, setForm] = useState({
    name: "",
    university: "",
    image: "",
    country: "",
    city: "",
    worldRank: "",
    subjectCategory: "",
    category: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
    postDate: "",
    userEmail: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/scholarships", form);
      alert("Scholarship Added Successfully");
      setForm({
        name: "",
        university: "",
        image: "",
        country: "",
        city: "",
        worldRank: "",
        subjectCategory: "",
        category: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        deadline: "",
        postDate: "",
        userEmail: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add scholarship");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Scholarship Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded"
          name="university"
          placeholder="University Name"
          value={form.university}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        {/* Country Dropdown */}
        <select
          className="border p-2 rounded"
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <input
          className="border p-2 rounded"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded"
          name="worldRank"
          placeholder="World Rank"
          value={form.worldRank}
          onChange={handleChange}
        />

        {/* Subject Category Dropdown */}
        <select
          className="border p-2 rounded"
          name="subjectCategory"
          value={form.subjectCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Subject Category</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
        </select>

        {/* Scholarship Category Dropdown */}
        <select
          className="border p-2 rounded"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Scholarship Category</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Need-Based">Need-Based</option>
          <option value="Athletic">Athletic</option>
          <option value="Research">Research</option>
        </select>

        {/* Degree Dropdown */}
        <select
          className="border p-2 rounded"
          name="degree"
          value={form.degree}
          onChange={handleChange}
          required
        >
          <option value="">Select Degree</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
          <option value="Diploma">Diploma</option>
        </select>

        <input
          className="border p-2 rounded"
          name="tuitionFees"
          placeholder="Tuition Fees (optional)"
          value={form.tuitionFees}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="applicationFees"
          placeholder="Application Fees"
          value={form.applicationFees}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded"
          name="serviceCharge"
          placeholder="Service Charge"
          value={form.serviceCharge}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          className="border p-2 rounded"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          className="border p-2 rounded"
          name="postDate"
          value={form.postDate}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          className="border p-2 rounded"
          name="userEmail"
          placeholder="User Email"
          value={form.userEmail}
          onChange={handleChange}
          required
        />

        <button className="col-span-2 bg-blue-600 text-white p-3 rounded mt-2 hover:bg-blue-700">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
