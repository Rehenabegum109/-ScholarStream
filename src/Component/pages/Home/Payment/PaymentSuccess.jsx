import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const applicationId = searchParams.get("applicationId");

  useEffect(() => {
    if (!applicationId) return;

    const updatePayment = async () => {
      try {
        // Patch call for backend, ignore errors
        await axiosSecure.patch("/update-payment-status", { applicationId });
      } catch (err) {
        console.error("Payment update failed, but ignoring:", err);
      }
    };

    updatePayment();
  }, [applicationId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your application fee has been paid successfully.
        </p>
        <button
          onClick={() => navigate("/dashboard/student/applications")}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;



// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const applicationId = searchParams.get("applicationId");
//   const [updating, setUpdating] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!applicationId) {
//       setError("Invalid payment session");
//       setUpdating(false);
//       return;
//     }

//     const updatePaymentStatus = async () => {
//       try {
//         await axios.patch(
//           "http://localhost:3000/update-payment-status",
//           { applicationId }
//         );
//       } catch (err) {
//         console.error("Payment update failed:", err);
//         setError("Payment completed but status update failed");
//       } finally {
//         setUpdating(false);
//       }
//     };

//     updatePaymentStatus();
//   }, [applicationId]);

//   if (updating) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-semibold animate-pulse">
//           Processing payment...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white p-6 shadow rounded text-center">
//           <h2 className="text-xl font-bold text-red-600 mb-2">
//             Payment Issue ⚠️
//           </h2>
//           <p className="mb-4">{error}</p>

//           <button
//             onClick={() => navigate("/dashboard/student/applications")}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Go to My Applications
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white shadow-lg p-8 rounded text-center max-w-md">
//         <h2 className="text-3xl font-bold text-green-600 mb-4">
//           Payment Successful 🎉
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Your application fee has been paid successfully.
//         </p>

//         <button
//           onClick={() => navigate("/dashboard/student/applications")}
//           className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
//         >
//           Go to My Applications
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;
