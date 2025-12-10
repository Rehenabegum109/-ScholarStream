import React from "react";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="mb-4">Welcome, student! Here you can see your dashboard information.</p>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">My Scholarships</h2>
          <p className="text-gray-600">View all the scholarships you applied for.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Application Status</h2>
          <p className="text-gray-600">Check the status of your scholarship applications.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-600">Update your profile and personal information.</p>
        </div>
      </div>

      {/* Future sections */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Upcoming Features</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Notifications panel</li>
          <li>Saved scholarships</li>
          <li>Download application reports</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
