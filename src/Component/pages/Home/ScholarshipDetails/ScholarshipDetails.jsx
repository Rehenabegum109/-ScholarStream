import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AxiosSecure from "../../../Hook/AxiosSecore";


const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await AxiosSecure.get(`/scholarships/${id}`); 
        setScholarship(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!scholarship) return <p className="p-6 text-center text-red-500">Scholarship not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{scholarship.universityName}</h1>
          <p className="text-xl mt-2 font-semibold">{scholarship.scholarshipCategory} Scholarship</p>
          <p className="mt-2 text-gray-600">
            Location: {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          <p className="mt-2 text-gray-600">Deadline: {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-600">Application Fee: ${scholarship.applicationFees || 0}</p>
          <p className="mt-4">{scholarship.description}</p>
          <p className="mt-2 font-semibold">Coverage: {scholarship.benefits}</p>

          <button
            onClick={() => navigate(`/checkout/${id}`)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
