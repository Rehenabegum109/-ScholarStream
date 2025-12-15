import useRole from "../Rool/useRole";
import AdminDashboard from "./Admin/AdminDashboard";
import ModeratorDashboard from "./Moderator/ModeratorDashboard";
import StudentDashboard from "./Student/StudentDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  console.log(role)

  // Inline loading display
  if (roleLoading) return <div className="text-center p-4 text-lg font-medium">Loading...</div>;

  if (role === "Admin") return  <AdminDashboard />;
  if (role === "Moderator") return <ModeratorDashboard />;
  if(role === 'Student') return <StudentDashboard />; 
};

export default DashboardHome;
