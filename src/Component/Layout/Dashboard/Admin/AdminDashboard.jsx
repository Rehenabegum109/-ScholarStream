import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then(res => setUsers(res.data));
  }, []);

  const changeRole = (id, role) => {
    axios.put(`http://localhost:3000/users/${id}/role`, { role })
      .then(res => {
        alert("Role updated");
        setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "moderator" && (
                  <button onClick={() => changeRole(u._id, "moderator")}>Make Moderator</button>
                )}
                {u.role !== "admin" && (
                  <button onClick={() => changeRole(u._id, "admin")}>Make Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
