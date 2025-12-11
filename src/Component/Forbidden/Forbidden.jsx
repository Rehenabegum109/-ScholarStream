import React from 'react';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Forbidden;
