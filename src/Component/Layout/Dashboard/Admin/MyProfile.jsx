import { UseAuth } from "../../../Hook/AuthProvider";


const MyProfile = () => {
  const { user } = UseAuth();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      <div className="border p-4 rounded w-80">
        <img src={user?.photoURL} className="w-24 h-24 rounded-full mb-3" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
};

export default MyProfile;
