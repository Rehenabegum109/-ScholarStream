import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "../../../Hook/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { motion } from "framer-motion";

const CheckOut = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const AxiosSecure = useAxiosSecure();

  const [isProcessing, setIsProcessing] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // Fetch scholarship
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Check if user already applied
  useEffect(() => {
    if (!user || !scholarship) return;

    const checkApplied = async () => {
      try {
        const res = await AxiosSecure.get(`/applications/check`, {
          params: {
            scholarshipId: scholarship._id,
            studentEmail: user.email,
          },
        });
        if (res.data.applied) setAlreadyApplied(true);
      } catch (err) {
        setAlreadyApplied(false);
        console.error(err);
      }
    };

    checkApplied();
  }, [user, scholarship, AxiosSecure]);

  const handleApply = async () => {
    if (!user || !scholarship) return;

    if (alreadyApplied) {
      alert("You have already applied for this scholarship!");
      return;
    }

    setIsProcessing(true);

    try {
      // 1️⃣ Save application (initially unpaid)
      const appRes = await AxiosSecure.post("/applications", {
        scholarshipId: scholarship._id,
        studentEmail: user.email,
        paymentStatus: "unpaid",
      });

      const applicationId = appRes.data.insertedId;
      setAlreadyApplied(true); 

      // 2️⃣ If fee > 0, create Stripe session
      if (scholarship.applicationFees > 0) {
        const stripeRes = await AxiosSecure.post("/create-checkout-session", {
          scholarshipId: scholarship._id,
          applicationId,
          amount: scholarship.applicationFees,
        });

        if (stripeRes.data.url) window.location.href = stripeRes.data.url;
      } else {
        alert("Application submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!scholarship) return <div className="text-center mt-10">Scholarship not found!</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-5xl mx-auto bg-white shadow rounded flex flex-col md:flex-row gap-6"
    >
      {/* Left Side */}
      <div className="flex-1 border p-4 rounded space-y-3">
        <h2 className="text-xl font-bold">{scholarship.scholarshipName}</h2>
        <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
        <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
        <p><strong>Post Date:</strong> {new Date(scholarship.scholarshipPostDate).toLocaleDateString()}</p>
        <p><strong>Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-80 border p-4 rounded space-y-3 text-center">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h3 className="text-lg font-semibold">{scholarship.universityName}</h3>
        <p><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>

        <button
          onClick={handleApply}
          className={`w-full py-2 rounded mt-4 font-bold ${
            alreadyApplied ? "bg-gray-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {alreadyApplied ? "Already Applied" : isProcessing ? "Processing..." : "Apply Now"}
        </button>
      </div>
    </motion.div>
  );
};

export default CheckOut;
