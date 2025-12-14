import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Welcome, admin! Here you can manage your system and monitor all activities.</p>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-600">Add, update, or remove users and assign roles like Admin or Moderator.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Manage Applications</h2>
          <p className="text-gray-600">View all scholarship applications, approve or reject them, and give feedback.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Manage Scholarships</h2>
          <p className="text-gray-600">Add, edit, or remove scholarships and manage their details and categories.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">View Reviews</h2>
          <p className="text-gray-600">Monitor reviews from students and remove any inappropriate content.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-gray-600">Get an overview of users, applications, payments, and popular scholarships.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-gray-600">Configure system settings, notifications, and other admin options.</p>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Upcoming Features</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Advanced user analytics</li>
          <li>Detailed application reports</li>
          <li>Notifications & alerts system</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
