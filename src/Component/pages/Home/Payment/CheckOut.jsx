import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../Hook/AxiosSecore";

const CheckOut = () => {
  // const axiosSecure = AxiosSecure();
  const { id } = useParams(); 
  
console.log(id)
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: scholarship, isLoading } = useQuery({
  queryKey: ["scholarship", id],
  queryFn: async () => {
    const res = await AxiosSecure.get(`/scholarships/${id}`); 
    return res.data;
  },
  // enabled: !!id
});

  const handlePayment = async () => {
    if (!scholarship) return;
    setIsProcessing(true);

    try {
      const res = await AxiosSecure.post("/create-checkout-session", {
        scholarshipId: scholarship._id,
        userEmail: "student@example.com",
        amount: scholarship.applicationFees
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!scholarship) return <div>Scholarship not found!</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-center">
      <h2 className="text-xl font-bold mb-4">{scholarship.name}</h2>
      <p>University: {scholarship.universityName}</p>
      <p>Application Fees: ${scholarship.applicationFees}</p>
      <button
        onClick={handlePayment}
        className="btn btn-primary w-full mt-4"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default CheckOut;
