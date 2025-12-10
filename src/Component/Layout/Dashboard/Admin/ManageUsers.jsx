import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    await axios.patch(`http://localhost:3000/users/${id}/role`, { role });
    setUsers(users.map(u => u._id === id ? { ...u, role } : u));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    }
  };

  const filteredUsers = filterRole === "All" ? users : users.filter(u => u.role === filterRole);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="mb-4">
        <label className="mr-2">Filter by Role:</label>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="All">All</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u._id} className="text-center">
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">
                <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)}>
                  <option value="Student">Student</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr><td colSpan="4" className="text-center py-4">No users found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
