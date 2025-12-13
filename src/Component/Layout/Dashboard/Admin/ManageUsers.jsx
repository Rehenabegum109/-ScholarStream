import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { FaUserPlus, FaUserMinus, FaUserShield, FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [loading, setLoading] = useState(false);
  const AxiosSecure = useAxiosSecure();

  // Fetch users
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

  // Handle role change
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

  // Handle delete user
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

  // Filter users by role
  const filteredUsers =
    filterRole === "All" ? users : users.filter(user => user.role === filterRole);

  return (
    <div className="p-6 bg-white shadow rounded max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Role Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-2 py-1 rounded"
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
        <table className="w-full border-collapse border">
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
              <tr key={user._id}>
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.role}</td>
                <td className="border px-3 py-2 flex gap-2">

                  {/* Promote/Demote */}
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

                  {/* Delete User */}
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

            {filteredUsers.length === 0 && (
              <tr>
                <td className="border px-3 py-2 text-center" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;

// ManageUsers.jsx
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../Hook/UseAxiosSecure';


// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [users, setUsers] = useState([]);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const res = await axiosSecure.get('/users');
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Fetch users error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Role change
//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       const res = await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
//       console.log('Role updated:', res.data);
//       fetchUsers(); // refresh user list
//     } catch (err) {
//       console.error('Role change failed:', err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Manage Users</h2>
//       <table className="min-w-full border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Role</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(u => (
//             <tr key={u._id}>
//               <td className="border px-4 py-2">{u.displayName || u.name}</td>
//               <td className="border px-4 py-2">{u.email}</td>
//               <td className="border px-4 py-2">{u.role}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 {u.role !== 'Admin' && (
//                   <button
//                     className="bg-green-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleRoleChange(u._id, 'Admin')}
//                   >
//                     Make Admin
//                   </button>
//                 )}
//                 {u.role !== 'Moderator' && (
//                   <button
//                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleRoleChange(u._id, 'Moderator')}
//                   >
//                     Make Moderator
//                   </button>
//                 )}
//                 {u.role !== 'Student' && (
//                   <button
//                     className="bg-gray-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleRoleChange(u._id, 'Student')}
//                   >
//                     Demote
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;
