import { Outlet, NavLink, Link } from "react-router";
import { UseAuth } from "../../Hook/AuthProvider";


const DashboardLayout = () => {
  const { user } = UseAuth(); 
  // const role = user?.role; // student | moderator | admin

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4">

        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Common */}
        <NavLink to="/dashboard/profile" className="block">
          My Profile
        </NavLink>

        {/* Student Menu */}
        
          
            <NavLink to="/dashboard/student/applications">My Applications</NavLink>
            <NavLink to="/dashboard/student/reviews">My Reviews</NavLink>
          
      

        {/* Moderator Menu */}
        
          
            <NavLink to="/dashboard/mod/applications">Manage Applications</NavLink>
            <NavLink to="/dashboard/mod/reviews">All Reviews</NavLink>
          
        

        {/* Admin Menu */}
        
          
 <Link to="/dashboard/add-scholarship">Add Scholarship</Link>
<Link to="/dashboard/manage-scholarships">Manage Scholarships</Link>
<Link to="/dashboard/manage-user">Manage user</Link>
{/* <Link to="/dashboard/profile">My Profile</Link> */}
<Link to="/dashboard/analytics">Analytics</Link>

          
        
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
