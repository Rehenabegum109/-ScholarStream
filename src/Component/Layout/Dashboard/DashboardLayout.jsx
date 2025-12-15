
import { Outlet, NavLink } from "react-router";
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

import { UseAuth } from "../../Hook/AuthProvider";
import useRole from "../Rool/useRole";



const DashboardLayout = () => {
  const { user } = UseAuth();
  
  const { role, roleLoading } = useRole();

  // if (roleLoading) return <div>Loading...</div>;
  console.log(role)

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          <NavLink
    to="/"
    className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
  >
    🏠 Home
  </NavLink>
        {/* Common */}
        <NavLink
          to="/dashboard/profile"
          className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
        >
          <FaUser /> My Profile
        </NavLink>

        {/* Role-based Menus */}
        {role === "Student" && (
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
        )}

        {role === "Moderator" && (
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
        )}

        {role === "Admin" && (
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

            <NavLink
              to="/dashboard/manage-user"
              className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
            >
              <FaUsers /> Manage Users
            </NavLink>

            <NavLink
              to="/dashboard/analytics"
              className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded"
            >
              <FaChartBar /> Analytics
            </NavLink>
          </div>
        )}
      </aside>



      {/* Content */}
      <main className="flex-1 p-6 bg-[#E8F1FF]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

