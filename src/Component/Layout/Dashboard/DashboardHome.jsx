import useRole from "../Rool/useRole";
import AdminDashboard from "./Admin/AdminDashboard";
import ModeratorDashboard from "./Moderator/ModeratorDashboard";
import StudentDashboard from "./Student/StudentDashboard";


const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role === "admin") return <AdminDashboard />;
  if (role === "moderator") return <ModeratorDashboard />;
  return <StudentDashboard />; 
};

export default DashboardHome;
