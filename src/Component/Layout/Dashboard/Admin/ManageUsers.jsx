

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { FaUserPlus, FaUserMinus, FaUserShield, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [loading, setLoading] = useState(false);
  const AxiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AxiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await AxiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire("Success", "User role updated", "success");
        fetchUsers();
      }
    } catch (err) {
      console.error("Error updating role:", err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await AxiosSecure.delete(`/users/${userId}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  const filteredUsers =
    filterRole === "All" ? users : users.filter((user) => user.role === filterRole);

  return (
   <div className="p-4 sm:p-6 bg-white shadow rounded max-w-6xl mx-auto">
  <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Users</h2>

  {/* Role Filter */}
  <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="font-semibold">Filter by Role:</label>
    <select
      value={filterRole}
      onChange={(e) => setFilterRole(e.target.value)}
      className="border px-2 py-1 rounded w-full sm:w-auto"
    >
      <option value="All">All</option>
      <option value="Student">Student</option>
      <option value="Moderator">Moderator</option>
      <option value="Admin">Admin</option>
    </select>
  </div>

  {loading ? (
    <div>Loading users...</div>
  ) : (
    <>
      {/* Desktop/Laptop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-[600px] border-collapse border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="even:bg-gray-50">
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.role}</td>
                <td className="border px-3 py-2 flex flex-wrap gap-2">
                  {/* Promote/Demote/Delete Buttons */}
                  {user.role === "Student" && (
                    <>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleRoleChange(user._id, "Moderator")}
                        title="Promote to Moderator"
                      >
                        <FaUserPlus />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleRoleChange(user._id, "Admin")}
                        title="Promote to Admin"
                      >
                        <FaUserShield />
                      </button>
                    </>
                  )}
                  {user.role === "Moderator" && (
                    <>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleRoleChange(user._id, "Admin")}
                        title="Promote to Admin"
                      >
                        <FaUserShield />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleRoleChange(user._id, "Student")}
                        title="Demote to Student"
                      >
                        <FaUserMinus />
                      </button>
                    </>
                  )}
                  {user.role === "Admin" && (
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleRoleChange(user._id, "Moderator")}
                      title="Demote to Moderator"
                    >
                      <FaUserMinus />
                    </button>
                  )}
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteUser(user._id)}
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-4">
        {filteredUsers.length === 0 && <div>No users found.</div>}

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="border rounded p-4 flex flex-col gap-2 shadow-sm"
          >
            <div><span className="font-semibold">Name: </span>{user.name}</div>
            <div><span className="font-semibold">Email: </span>{user.email}</div>
            <div><span className="font-semibold">Role: </span>{user.role}</div>

            <div className="flex flex-wrap gap-2 mt-2">
              {/* Promote/Demote/Delete Buttons */}
              {user.role === "Student" && (
                <>
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleRoleChange(user._id, "Moderator")}
                    title="Promote to Moderator"
                  >
                    <FaUserPlus />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleRoleChange(user._id, "Admin")}
                    title="Promote to Admin"
                  >
                    <FaUserShield />
                  </button>
                </>
              )}
              {user.role === "Moderator" && (
                <>
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleRoleChange(user._id, "Admin")}
                    title="Promote to Admin"
                  >
                    <FaUserShield />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleRoleChange(user._id, "Student")}
                    title="Demote to Student"
                  >
                    <FaUserMinus />
                  </button>
                </>
              )}
              {user.role === "Admin" && (
                <button
                  className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => handleRoleChange(user._id, "Moderator")}
                  title="Demote to Moderator"
                >
                  <FaUserMinus />
                </button>
              )}
              <button
                className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteUser(user._id)}
                title="Delete User"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>

  );
};

export default ManageUsers;
