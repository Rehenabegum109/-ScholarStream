// src/pages/PaymentSuccess/PaymentSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { scholarship, amountPaid } = state;

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Scholarship: {scholarship.scholarshipCategory}</p>
      <p>University: {scholarship.universityName}</p>
      <p>Amount Paid: ${amountPaid}</p>
      <button
        onClick={() => navigate("/dashboard/student/applications")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
