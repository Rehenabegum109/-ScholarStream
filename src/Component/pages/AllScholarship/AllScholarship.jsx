import React, { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter/SearchFilter";



import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import AxiosSecure from "../../Hook/AxiosSecore";


const AllScholarship = () => {
  const [allScholarshipsData, setAllScholarshipsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
  const fetchScholarships = async () => {
    try {
      const res = await AxiosSecure.get("/scholarships");
      console.log(res.data); 
      setAllScholarshipsData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  };
  fetchScholarships();
}, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  // Filter + Search logic
  const filteredScholarships = allScholarshipsData.filter((sch) => {
    if (!sch) return false; // safety check
    const matchesSearch =
      sch.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.scholarshipCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory ? sch.scholarshipCategory === filterCategory : true;
    const matchesLocation = filterLocation ? sch.location === filterLocation : true;
    const matchesSubject = filterSubject ? sch.subject === filterSubject : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesSubject;
  });

  // Sorting
  filteredScholarships.sort((a, b) => {
    if (sortOption === "feeLow") return Number(a.fee) - Number(b.fee);
    if (sortOption === "feeHigh") return Number(b.fee) - Number(a.fee);
    if (sortOption === "recent") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filterSubject={filterSubject}
        setFilterSubject={setFilterSubject}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship, index) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} index={index} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No scholarships found.</p>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
