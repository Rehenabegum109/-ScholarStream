import { UseAuth } from "../../../Hook/AuthProvider";
import useRole from "../../Rool/useRole";


const MyProfile = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      <div className="border p-4 rounded w-80">
        <img src={user?.photoURL} className="w-24 h-24 rounded-full mb-3" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  );
};

export default MyProfile;
