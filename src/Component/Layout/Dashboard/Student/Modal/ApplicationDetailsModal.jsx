import React from "react";

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 relative">
        <h2 className="text-xl font-bold mb-4">Application Details</h2>

        <p><strong>University Name:</strong> {application.universityName}</p>
        <p><strong>Location:</strong> {application.location}</p>
        <p><strong>Subject:</strong> {application.subject}</p>
        <p><strong>Application Fee:</strong> {application.fee}</p>
        <p><strong>Application Status:</strong> {application.applicationStatus}</p>
        <p><strong>Payment Status:</strong> {application.paymentStatus}</p>
        <p><strong>Feedback:</strong> {application.applicationFeedback || "N/A"}</p>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
