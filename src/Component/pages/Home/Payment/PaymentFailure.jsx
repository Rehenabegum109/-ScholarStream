// import axios from "axios";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const PaymentFailure = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [updating, setUpdating] = useState(true);
//   const [error, setError] = useState(null);

//   const applicationId = searchParams.get("applicationId");

//   useEffect(() => {
//     const updateStatus = async () => {
//       if (!applicationId) {
//         setError("Invalid Application ID");
//         setUpdating(false);
//         return;
//       }

//       try {
//         await axios.post("http://localhost:3000/update-payment-status", {
//           applicationId,
//           paymentStatus: "unpaid",
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to update payment status.");
//       } finally {
//         setUpdating(false);
//       }
//     };

//     updateStatus();
//   }, [applicationId]);

//   if (updating) return <p className="text-center mt-10">Processing...</p>;

//   return (
//     <div className="container mx-auto mt-10 text-center bg-white shadow p-8 rounded">
//       <h1 className="text-red-600 text-3xl font-bold mb-3">Payment Failed!</h1>

//       <p className="text-gray-700">
//         Your payment was not completed. You can try again anytime.
//       </p>

//       {error && (
//         <p className="text-red-500 mt-2 text-sm">{error}</p>
//       )}

//       <button
//         onClick={() => navigate("/dashboard")}
//         className="btn btn-primary mt-5"
//       >
//         Return to Dashboard
//       </button>
//     </div>
//   );
// };

// export default PaymentFailure;

import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow p-6 rounded text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h2>
        <p>You cancelled the payment.</p>

        <button
          onClick={() => navigate("/dashboard/student/applications")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
