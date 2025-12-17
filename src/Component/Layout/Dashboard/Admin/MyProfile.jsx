

import { UseAuth } from "../../../Hook/AuthProvider";
import useRole from "../../Rool/useRole";

const MyProfile = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 flex justify-center">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-6">

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 md:w-24 md:h-24 rounded-full border"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          My Profile
        </h2>

        {/* Info */}
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <strong>Name:</strong>{" "}
            <span className="break-all">{user?.displayName || "N/A"}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span className="break-all">{user?.email}</span>
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="capitalize">{role}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
