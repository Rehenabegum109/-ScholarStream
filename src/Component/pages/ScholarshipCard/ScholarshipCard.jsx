import React from "react";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col">
      {/* University Image */}
      <img
        src={scholarship.universityImage}
        alt={scholarship.universityName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{scholarship.universityName}</h2>
          <p>
            <span className="font-medium">Category:</span> {scholarship.scholarshipCategory}
          </p>
             <p>
            <span className="font-medium">Location:</span> {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          {scholarship.applicationFees && (
            <p>
              <span className="font-medium">Application Fees:</span> ${scholarship.applicationFees}
            </p>
          )}
        </div>

        {/* View Details Button */}
        <Link
          to={`/scholarship/${scholarship._id}`}
          className="mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
