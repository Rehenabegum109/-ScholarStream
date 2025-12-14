// import React from "react";

// const SearchFilter = ({
//   searchTerm,
//   setSearchTerm,
//   filterCategory,
//   setFilterCategory,
//   filterLocation,
//   setFilterLocation,
//   filterSubject,
//   setFilterSubject,
//   sortOption,
//   setSortOption
// }) => {
//   return (
//     <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center flex-wrap">
      
//       {/* Search */}
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search by Scholarship, University, or Degree"
//         className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />

//       {/* Category Filter */}
//       <select
//         value={filterCategory}
//         onChange={(e) => setFilterCategory(e.target.value)}
//         className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         <option value="">All Categories</option>
//                <option value="Full fund">Full fund</option>
//           <option value="Partial">Partial</option>
//           <option value="Self-fund">Self-fund</option>
//       </select>

//       {/* Subject Filter */}
//       <select
//         value={filterSubject}
//         onChange={(e) => setFilterSubject(e.target.value)}
//         className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         <option value="">All Subjects</option>
//      <option value="Computer Science">Computer Science</option>
//           <option value="Engineering">Engineering</option>
//           <option value="Business">Business</option>
//           <option value="Natural Sciences">Natural Sciences</option>
//           <option value="Medicine">Medicine</option>
//           <option value="Law">Law</option>
//       </select>

//       {/* Location Filter */}
//       <select
//         value={filterLocation}
//         onChange={(e) => setFilterLocation(e.target.value)}
//         className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         <option value="">All Locations</option>
//         <option value="USA">USA</option>
//         <option value="UK">UK</option>
//         <option value="Canada">Canada</option>
//         <option value="Australia">Australia</option>
//       </select>

//       {/* Sort Option */}
//       <select
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//         className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         <option value="">Sort By</option>
//         <option value="feeLow">Fee: Low → High</option>
//         <option value="feeHigh">Fee: High → Low</option>
//         <option value="recent">Most Recent</option>
//       </select>

//     </div>
//   );
// };

// export default SearchFilter;


import React from "react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterLocation,
  setFilterLocation,
  filterSubject,
  setFilterSubject,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center flex-wrap">
      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Scholarship, University, or Degree"
        className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Categories</option>
        <option value="Full fund">Full fund</option>
        <option value="Partial">Partial</option>
        <option value="Self-fund">Self-fund</option>
      </select>

      {/* Subject Filter */}
      <select
        value={filterSubject}
        onChange={(e) => setFilterSubject(e.target.value)}
        className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Subjects</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Engineering">Engineering</option>
        <option value="Business">Business</option>
        <option value="Natural Sciences">Natural Sciences</option>
        <option value="Medicine">Medicine</option>
        <option value="Law">Law</option>
      </select>

      {/* Location Filter */}
      <select
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
        className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Locations</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Australia">Australia</option>
      </select>

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border rounded px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Sort By</option>
        <option value="feeLow">Fee: Low → High</option>
        <option value="feeHigh">Fee: High → Low</option>
        <option value="recent">Most Recent</option>
      </select>
    </div>
  );
};

export default SearchFilter;
