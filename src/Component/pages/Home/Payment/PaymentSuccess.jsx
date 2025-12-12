// import { useSearchParams, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import AxiosSecure from "../../../Hook/AxiosSecore";

// const PaymentSuccess = () => {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const [scholarship, setScholarship] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const scholarshipId = params.get("scholarshipId");
//   const email = params.get("email");
//   const amount = params.get("amount") || "Paid";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await AxiosSecure.get(`/scholarships/${scholarshipId}`);
//         setScholarship(res.data);

//         // Save application to DB
//         await AxiosSecure.post("/applications", {
//           scholarshipId,
//           userEmail: email,
//           paymentStatus: "paid",
//           paidAmount: amount,
//           applyDate: new Date()
//         });

//       } catch (err) {
//         console.error("Error in PaymentSuccess:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [scholarshipId, email, amount]);

//   if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg text-center">
//       <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
//       <p className="mt-2 text-gray-700">Your scholarship application has been submitted.</p>

//       {/* Scholarship Details */}
//       <div className="mt-6 border p-4 rounded-lg text-left bg-gray-50">
//         <h2 className="text-xl font-semibold">{scholarship.scholarshipName}</h2>
//         <p className="text-gray-600">{scholarship.universityName}</p>
//         <p className="mt-2">Amount Paid: <span className="font-bold">${scholarship.applicationFees}</span></p>
//       </div>

//       {/* Go to Applications Button */}
//       <button
//         onClick={() => navigate("/dashboard/student/applications")}
//         className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         Go to My Applications
//       </button>
//     </div>
//   );
// };

// export default PaymentSuccess;


// উদাহরণ: PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import AxiosSecure from "../../../Hook/AxiosSecore";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const applicationId = searchParams.get("applicationId");

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // STEP 1: Update payment status in backend
  useEffect(() => {
    if (!applicationId) return;

    const updatePayment = async () => {
      try {
        await AxiosSecure.post("/update-payment-status", {
          applicationId,
          paymentStatus: "paid",
        });
      } catch (err) {
        console.error("Payment Update Error:", err);
      }
    };

    updatePayment();
  }, [applicationId]);

  // STEP 2: Fetch updated application info
  useEffect(() => {
    if (!applicationId) return;

    const fetchApplication = async () => {
      try {
        const res = await AxiosSecure.get(`/applications/${applicationId}`);
        setApplication(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!application) return <p className="text-center mt-10">Application not found!</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-green-600">Payment Successful!</h2>

      <p>
        <strong>Scholarship Name:</strong> {application.scholarshipName}
      </p>
      <p>
        <strong>University:</strong> {application.universityName}
      </p>
      <p>
        <strong>Application Status:</strong> {application.applicationStatus}
      </p>
      <p>
        <strong>Payment Status:</strong> {application.paymentStatus}
      </p>

      <button
        onClick={() => navigate("/my-applications")}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
