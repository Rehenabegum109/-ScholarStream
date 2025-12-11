// src/pages/PaymentFailure/PaymentFailure.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentFailure = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { scholarship, error } = state;

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-4">Scholarship: {scholarship.scholarshipCategory}</p>
      <p>University: {scholarship.universityName}</p>
      <p>Error: {error}</p>
      <button
        onClick={() => navigate("/dashboard/student/applications")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailure;
