import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../pages/Home/ScholarshipDetails/ScholarshipDetails";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import StudentDashboard from "../Layout/Dashboard/StudentDashboard";
import ModeratorDashboard from "../Layout/Dashboard/ModeratorDashboard";
import AdminDashboard from "../Layout/Dashboard/Admin/AdminDashboard";
import PrivateRoute from "../PrivetRoute/PrivetRout";
import RoleRedirect from "../Layout/Rool/RoolRedirect";
import AddScholarship from "../Layout/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../Layout/Dashboard/Admin/ManageScholarships";
import MyProfile from "../Layout/Dashboard/Admin/MyProfile";
import Analytics from "../Layout/Dashboard/Admin/Analytics";
import ManageUsers from "../Layout/Dashboard/Admin/ManageUsers";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index: true,
         Component:Home
        },
        {
        path: "login",
        Component: Login, 
      },
      {
        path:'register',
        Component:Register
      }
      ,
      {
        path:'scholarship',
        Component:AllScholarship
      },
      {
       path: '/ScholarShipDetails/:id',
        Component:ScholarshipDetails
      }

    ]
          
    
  },
    {
    path: "dashboard",
    element: <DashboardLayout/>,
     children: [
       { index: true,
         element: <RoleRedirect/>
         },
             // ---- Admin ----
      { path: "admin", Component: AdminDashboard },
      { path: "add-scholarship", element: <AddScholarship/> },
      { path: "manage-scholarships", element: <ManageScholarships />

       },
       {path :'manage-user', element:<ManageUsers></ManageUsers>},
      { path: "profile", element: <MyProfile/> },
      { path: "analytics", element: <Analytics /> },
       
      { path: "student",
         Component: StudentDashboard
       },
      
      { path: "moderator", 
        Component: ModeratorDashboard
      },
    ],
  },
]);