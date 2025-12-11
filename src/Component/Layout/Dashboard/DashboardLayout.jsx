import { Outlet, NavLink, Link } from "react-router";
import { UseAuth } from "../../Hook/AuthProvider";

// react-icons
import {
  FaUser,
  FaFileAlt,
  FaStar,
  FaTasks,
  FaList,
  FaPlusCircle,
  FaFolderOpen,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = UseAuth();

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4">

        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Common */}
        <NavLink
          to="/dashboard/profile"
          className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
        >
          <FaUser /> My Profile
        </NavLink>

        {/* Student Menu */}
        <div className="space-y-2 mt-3">
          <NavLink
            to="/dashboard/student/applications"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaFileAlt /> My Applications
          </NavLink>

          <NavLink
            to="/dashboard/student/reviews"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaStar /> My Reviews
          </NavLink>
        </div>

        {/* Moderator Menu */}
        <div className="space-y-2 mt-3">
          <NavLink
            to="/dashboard/mod/applications"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaTasks /> Manage Applications
          </NavLink>

          <NavLink
            to="/dashboard/mod/reviews"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaList /> All Reviews
          </NavLink>
        </div>

        {/* Admin Menu */}
        <div className="space-y-2 mt-3">
          <NavLink
            to="/dashboard/add-scholarship"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaPlusCircle /> Add Scholarship
          </NavLink>

          <NavLink
            to="/dashboard/manage-scholarships"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaFolderOpen /> Manage Scholarships
          </NavLink>

          <Link
            to="/dashboard/manage-user"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaUsers /> Manage Users
          </Link>

          <NavLink
            to="/dashboard/analytics"
            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
          >
            <FaChartBar /> Analytics
          </NavLink>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
