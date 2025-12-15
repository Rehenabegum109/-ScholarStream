
import React, { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter/SearchFilter";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import AxiosSecure from "../../Hook/AxiosSecore";
import Skeleton from "../../Skeleton/Skeleton";


const AllScholarship = () => {
  const AxiosSecureInstance = AxiosSecure; 
  const [allScholarshipsData, setAllScholarshipsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6; 

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await AxiosSecureInstance.get(
        `/scholarships?page=${page}&limit=${limit}`
      );

      const data = Array.isArray(res.data.scholarships)
        ? res.data.scholarships
        : [];

      setAllScholarshipsData(data);
      setTotal(res.data.total ?? 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [page]);

  // Filter + Search
  const filteredScholarships = allScholarshipsData.filter((sch) => {
    if (!sch) return false;

    const matchesSearch =
      sch.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sch.degree?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesCategory = filterCategory
      ? sch.scholarshipCategory === filterCategory
      : true;
    const matchesLocation = filterLocation
      ? sch.universityCountry === filterLocation
      : true;
    const matchesSubject = filterSubject ? sch.subject === filterSubject : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesSubject;
  });

  // Sorting
  filteredScholarships.sort((a, b) => {
    if (sortOption === "feeLow")
      return Number(a.applicationFees || 0) - Number(b.applicationFees || 0);
    if (sortOption === "feeHigh")
      return Number(b.applicationFees || 0) - Number(a.applicationFees || 0);
    if (sortOption === "recent")
      return new Date(b.postDate) - new Date(a.postDate);
    return 0;
  });

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} />
          ))}
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

      {/* Search + Filters */}
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

      {/* Scholarship Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No scholarships found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarship;
