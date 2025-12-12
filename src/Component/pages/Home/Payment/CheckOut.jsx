// import React, { useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../../../Hook/AxiosSecore";

// const CheckOut = () => {
//   // const axiosSecure = AxiosSecure();
//   const { id } = useParams(); 
  
// console.log(id)
//   const [isProcessing, setIsProcessing] = useState(false);

//   const { data: scholarship, isLoading } = useQuery({
//   queryKey: ["scholarship", id],
//   queryFn: async () => {
//     const res = await AxiosSecure.get(`/scholarships/${id}`); 
//     return res.data;
//   },
//   // enabled: !!id
// });

//   const handlePayment = async () => {
//     if (!scholarship) return;
//     setIsProcessing(true);

//     try {
//       const res = await AxiosSecure.post("/create-checkout-session", {
//         scholarshipId: scholarship._id,
//         userEmail: "student@example.com",
//         amount: scholarship.applicationFees
//       });

//       if (res.data.url) {
//         window.location.href = res.data.url;
//       }
//     } catch (err) {
//       console.error(err);
//       setIsProcessing(false);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (!scholarship) return <div>Scholarship not found!</div>;

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-center">
//       <h2 className="text-xl font-bold mb-4">{scholarship.name}</h2>
//       <p>University: {scholarship.universityName}</p>
//       <p>Application Fees: ${scholarship.applicationFees}</p>
//       <button
//         onClick={handlePayment}
//         className="btn btn-primary w-full mt-4"
//         disabled={isProcessing}
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// };

// export default CheckOut;


// import React, { useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../../../Hook/AxiosSecore";
// import { UseAuth } from "../../../Hook/AuthProvider";



// const CheckOut = () => {
//   const { id } = useParams();
//     const { user } = UseAuth(); 
    
//   const [isProcessing, setIsProcessing] = useState(false);

//   const { data: scholarship, isLoading } = useQuery({
//     queryKey: ["scholarship", id],
//     queryFn: async () => {
//       const res = await AxiosSecure.get(`/scholarships/${id}`);
//       return res.data;
//     },
//   });

//   // CheckOut.jsx
// const handleApply = async () => {
//   if (!scholarship) return;
//   setIsProcessing(true);

//   try {
//     // 1️⃣ প্রথমে application save করো
//     const appRes = await AxiosSecure.post('/applications', {
//       scholarshipId: scholarship._id,
//       scholarshipName: scholarship.scholarshipName,
//       studentEmail: user.email,   
//       applicationStatus: 'pending',
//       paymentStatus: 'unpaid'
//     });

//     const applicationId = appRes.data.insertedId; // save হলে ID পাওয়া যাবে

//     // 2️⃣ Stripe session create করো
//     const stripeRes = await AxiosSecure.post('/create-checkout-session', {
//       scholarshipId: scholarship._id,
//       studentEmail: user.email,
//       applicationId,
//       amount: scholarship.applicationFees
//     });

//     if (stripeRes.data.url) {
//       window.location.href = stripeRes.data.url; // stripe payment page
//     }

//   } catch (err) {
//     console.error(err);
//     setIsProcessing(false);
//   }
// };


//   if (isLoading) return <div>Loading...</div>;
//   if (!scholarship) return <div>Scholarship not found!</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded flex flex-col md:flex-row gap-6">
//       {/* Left Side: Scholarship Details */}
//       <div className="flex-1 border p-4 rounded space-y-3">
//         <h2 className="text-xl font-bold">{scholarship.scholarshipName}</h2>
//         <p><strong>Category:</strong> {scholarship.scholarshipCategory || "N/A"}</p>
//         <p><strong>Subject:</strong> {scholarship.subjectCategory || "N/A"}</p>
//         <p>
//           <strong>Post Date:</strong>{" "}
//           {scholarship.scholarshipPostDate ? new Date(scholarship.scholarshipPostDate).toLocaleDateString() : "N/A"}
//         </p>
//         <p>
//           <strong>Deadline:</strong>{" "}
//           {scholarship.applicationDeadline ? new Date(scholarship.applicationDeadline).toLocaleDateString() : "N/A"}
//         </p>
//         <p><strong>About:</strong> No description available.</p>
//       </div>

//       {/* Right Side: University Info + Apply */}
//       <div className="w-full md:w-80 border p-4 rounded space-y-3 text-center">
//         <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-full h-40 object-cover rounded mb-3" />
//         <h3 className="text-lg font-semibold">{scholarship.universityName}</h3>
//         <p><strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}</p>
//         <p><strong>Degree:</strong> {scholarship.degree}</p>
//         <p><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>
//         <p><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
//         <p><strong>Applicants:</strong> 0</p>
//         <button
//           onClick={handleApply}
//           className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
//           disabled={isProcessing}
//         >
//           {isProcessing ? "Processing..." : "Apply Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;

import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../../Hook/AxiosSecore";
import { UseAuth } from "../../../Hook/AuthProvider";

const CheckOut = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch scholarship
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Apply + Payment
  const handleApply = async () => {
    if (!scholarship || !user) return;
    setIsProcessing(true);

    try {
      // 1️⃣ Save application
      const appRes = await AxiosSecure.post("/applications", {
        scholarshipId: scholarship._id,
        email: user.email,
        paymentStatus: "unpaid",
      });

      const applicationId = appRes.data.insertedId;

      // 2️⃣ Create Stripe session
      const stripeRes = await AxiosSecure.post("/create-checkout-session", {
        scholarshipId: scholarship._id,
        studentEmail: user.email,
        applicationId,
        amount: scholarship.applicationFees,
      });

      if (stripeRes.data.url) {
        window.location.href = stripeRes.data.url;
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!scholarship) return <div>Scholarship not found!</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded flex flex-col md:flex-row gap-6">
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
        <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-full h-40 object-cover rounded mb-3" />
        <h3 className="text-lg font-semibold">{scholarship.universityName}</h3>
        <p><strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}</p>
        <p><strong>Degree:</strong> {scholarship.degree}</p>
        <p><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>
        <p><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
        <p><strong>Applicants:</strong> 0</p>
        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
