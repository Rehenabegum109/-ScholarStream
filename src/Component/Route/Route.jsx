import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../pages/Home/ScholarshipDetails/ScholarshipDetails";
import MainLayout from "../Layout/MainLayout";



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
]);