// components/Shared/SkeletonCard.jsx
import React from "react";

const Skeleton = () => {
  return (
    <div className="border rounded shadow p-4 animate-pulse">
      <div className="h-40 w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default Skeleton;
