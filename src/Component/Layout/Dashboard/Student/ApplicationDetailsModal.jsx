import React from "react";

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Application Details</h2>

        <div className="space-y-2">
          <p><strong>University Name:</strong> {application.universityName}</p>
          <p><strong>Address:</strong> {application.universityCity || application.universityAddress || "N/A"}</p>
          <p><strong>Subject Category:</strong> {application.subjectCategory || "N/A"}</p>
          <p><strong>Application Fees:</strong> {application.applicationFees || 0}</p>
          <p><strong>Application Status:</strong> {application.applicationStatus}</p>
          <p><strong>Payment Status:</strong> {application.paymentStatus}</p>
          <p><strong>Feedback:</strong> {application.applicationFeedback || "N/A"}</p>
          <p><strong>Scholarship ID:</strong> {application.scholarshipId || "N/A"}</p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
