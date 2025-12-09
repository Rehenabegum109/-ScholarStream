import React, { useState, useEffect } from "react";
import axios from "axios";

import ScholarshipCard from "../ScholarshipCard/ScholarshiCard";
import SearchFilter from "../SearchFilter/SearchFilter";

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
    axios
      .get("http://localhost:3000/scholarships")
      .then((res) => {
        setAllScholarshipsData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load scholarships");
        setLoading(false);
      });
  }, []);

  // Loading + Error
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  // Filter + Search logic
  let filteredScholarships = allScholarshipsData.filter((sch) => {
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
  if (sortOption === "feeLow") {
    filteredScholarships.sort((a, b) => a.fee - b.fee);
  } else if (sortOption === "feeHigh") {
    filteredScholarships.sort((a, b) => b.fee - a.fee);
  } else if (sortOption === "recent") {
    filteredScholarships.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

      {/* Search + Filter */}
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

      {/* Scholarships Grid */}
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
