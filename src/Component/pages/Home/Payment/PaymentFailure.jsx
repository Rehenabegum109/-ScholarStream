import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // URL থেকে applicationId নিন
  const applicationId = searchParams.get("applicationId");

  useEffect(() => {
    if (!applicationId) return;

    const updatePaymentCancel = async () => {
      try {
        // Backend patch route call করুন
        await axiosSecure.patch(`/applications/${applicationId}/payment-cancel`);
        console.log("Payment status updated to unpaid");
      } catch (err) {
        console.error("Payment cancel update failed:", err);
      }
    };

    updatePaymentCancel();
  }, [applicationId, axiosSecure]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow p-6 rounded text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h2>
        <p>Your application payment was not completed.</p>

        <button
          onClick={() => navigate("/dashboard/student/applications")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
