import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../pages/Home/ScholarshipDetails/ScholarshipDetails";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import StudentDashboard from "../Layout/Dashboard/Student/StudentDashboard";
import ModeratorDashboard from "../Layout/Dashboard/Moderator/ModeratorDashboard";
import AdminDashboard from "../Layout/Dashboard/Admin/AdminDashboard";
import PrivateRoute from "../PrivetRoute/PrivetRout";
import AddScholarship from "../Layout/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../Layout/Dashboard/Admin/ManageScholarships";
import MyProfile from "../Layout/Dashboard/Admin/MyProfile";
import Analytics from "../Layout/Dashboard/Admin/Analytics";
import ManageUsers from "../Layout/Dashboard/Admin/ManageUsers";
import ManageApplications from "../Layout/Dashboard/Moderator/ManageApplications";
import AllReviews from "../Layout/Dashboard/Moderator/AllReviews";
import MyApplications from "../Layout/Dashboard/Student/MyApplications";
import MyReviews from "../Layout/Dashboard/Student/MyReviews";
import CheckOut from "../pages/Home/Payment/CheckOut";
import Forbidden from "../Forbidden/Forbidden";
import PaymentSuccess from "../pages/Home/Payment/PaymentSuccess";
import PaymentFailure from "../pages/Home/Payment/PaymentFailure";
import DashboardHome from "../Layout/Dashboard/DashboardHome";








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
       path: 'scholarship/:id',
        Component:ScholarshipDetails
      },
      {
     
  path: 'checkout',
  element: <CheckOut/>

      },
      
       {
  path: "checkout/:id",
  element: (
    
      <CheckOut />
  
  )
},
{
      path: "payment-success",
      element: <PaymentSuccess/>
    },
    {
      path: "payment-cancel",
      element: <PaymentFailure />
    },
        
      

    ]
          
    
  },
    {
    path: "dashboard",
    element: <DashboardLayout/>,
     children: [
       { index: true,
         element:<DashboardHome/>
         },
         
    
             // ---- Admin ----
      { path: "admin", element: <AdminDashboard/> },
      { path: "add-scholarship", element: <AddScholarship/> },
      { path: "manage-scholarships", element: <ManageScholarships />
       },
       {path :'manage-user', element:<ManageUsers></ManageUsers>},
      { path: "profile", element: <MyProfile/> },
      { path: "analytics", element: <Analytics /> },
       
      { path: "student",
         element: <StudentDashboard/> },
         {
          path:'student/applications',
          element:<MyApplications/>
         },
      {
        path:'student/reviews',
        element:<MyReviews/>
      },
      { path: "moderator", 
        element:<ModeratorDashboard/>
      },
      {
        
      path:'mod/applications',
      element:<ManageApplications/>
      },
      {
        path:'mod/reviews',
        element:<AllReviews/>
      }

    ],
    
  },

  {
    path:'*',
    element:<Forbidden/>
  }
]);